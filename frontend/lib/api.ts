// Native fetch wrapper - replaces axios (~15KB savings)
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444') + '/api/v1';

interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  responseType?: 'json' | 'blob' | 'text';
}

interface ApiError {
  response?: {
    data: unknown;
    status: number;
  };
  message: string;
}

// Prevent multiple simultaneous refresh attempts
let refreshPromise: Promise<string | null> | null = null;

async function tryRefreshToken(): Promise<string | null> {
  // Deduplicate concurrent refresh calls
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch('/api/auth/refresh-token', { method: 'POST' });
      if (!res.ok) return null;
      const { accessToken } = await res.json();
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        return accessToken;
      }
      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(
  method: string,
  endpoint: string,
  data?: unknown,
  config: RequestConfig = {},
  isRetry = false
): Promise<{ data: T }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle query params
  let url = `${API_BASE}${endpoint}`;
  if (config.params) {
    const searchParams = new URLSearchParams(config.params);
    url += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined,
    });

    // Handle blob responses (for PDF/DOCX downloads)
    if (config.responseType === 'blob') {
      if (!response.ok) {
        // On 401 blob request, try refresh then retry once
        if (response.status === 401 && !isRetry && typeof window !== 'undefined') {
          const newToken = await tryRefreshToken();
          if (newToken) return request<T>(method, endpoint, data, config, true);
        }
        // Try to parse error as JSON for blob requests
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `Request failed with status ${response.status}` };
        }
        const error: ApiError = {
          response: { data: errorData, status: response.status },
          message: errorData?.message || errorData?.error || `Request failed with status ${response.status}`,
        };
        throw error;
      }
      const blob = await response.blob();
      return { data: blob as T };
    }

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      // On 401: try refresh once, then retry the original request
      if (response.status === 401 && !isRetry && typeof window !== 'undefined') {
        const newToken = await tryRefreshToken();
        if (newToken) return request<T>(method, endpoint, data, config, true);

        // Refresh failed — clear token and redirect admin users
        localStorage.removeItem('token');
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
          return { data: {} as T };
        }
      }

      const error: ApiError = {
        response: {
          data: responseData,
          status: response.status,
        },
        message: responseData?.message || responseData?.error || responseData?.detail || `Request failed with status ${response.status}`,
      };
      throw error;
    }

    return { data: responseData as T };
  } catch (err) {
    // Re-throw if it's already our error format
    if ((err as ApiError).response) {
      throw err;
    }
    // Network or other errors
    throw {
      message: err instanceof Error ? err.message : 'Network error',
    };
  }
}

// Axios-compatible interface
const api = {
  get: <T>(url: string, config?: RequestConfig) => request<T>('GET', url, undefined, config),
  post: <T>(url: string, data?: unknown, config?: RequestConfig) => request<T>('POST', url, data, config),
  put: <T>(url: string, data?: unknown, config?: RequestConfig) => request<T>('PUT', url, data, config),
  patch: <T>(url: string, data?: unknown, config?: RequestConfig) => request<T>('PATCH', url, data, config),
  delete: <T>(url: string, config?: RequestConfig) => request<T>('DELETE', url, undefined, config),
};

export default api;
