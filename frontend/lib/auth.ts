import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import AzureADProvider from "next-auth/providers/azure-ad";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";

// Build providers array dynamically based on available credentials
const providers: NextAuthOptions["providers"] = [];

// Google
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// GitHub
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

// LinkedIn - Fixed for OIDC issuer validation and profile mapping
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      issuer: "https://www.linkedin.com/oauth",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      // Map LinkedIn's OIDC profile to NextAuth expected format
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    })
  );
}

// Azure AD (Microsoft)
if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
    })
  );
}

// Apple
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
  providers.push(
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    })
  );
}

// Credentials provider for email/password auth
providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      try {
        // Call existing backend login endpoint
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `username=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`,
        });

        if (!response.ok) return null;

        const { access_token } = await response.json();

        // Get user profile
        const userResponse = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!userResponse.ok) return null;

        const user = await userResponse.json();

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken: access_token,
        };
      } catch {
        return null;
      }
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,

  callbacks: {
    async signIn({ user, account }) {
      // For credentials provider, we already have the user
      if (account?.provider === "credentials") {
        return true;
      }

      // OAuth sign-in: sync with backend
      if (account && user.email) {
        try {
          console.log("🔐 [NextAuth] OAuth signIn callback:", account.provider, user.email);
          console.log("🔐 [NextAuth] providerAccountId:", account.providerAccountId);
          console.log("🔐 [NextAuth] Calling backend:", BACKEND_URL);
          const response = await fetch(`${BACKEND_URL}/api/v1/auth/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              email: user.email,
              name: user.name || user.email.split("@")[0],
              image: user.image,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
            }),
          });

          if (!response.ok) {
            console.error("OAuth backend sync failed:", await response.text());
            return false;
          }

          const data = await response.json();
          // Attach backend user ID and JWT to user object — NextAuth user type extension requires any
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any).backendId = data.user.id;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any).accessToken = data.access_token;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any).role = data.user.role;

          return true;
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.id = (user as any).backendId || user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role || "user";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.accessToken = (user as any).accessToken || "";
        return token;
      }

      // Proactive refresh: check if backend JWT is expiring within 5 minutes
      if (token.accessToken && typeof token.accessToken === "string") {
        try {
          const payload = JSON.parse(
            Buffer.from(token.accessToken.split(".")[1], "base64").toString()
          );
          const expiresAt = payload.exp * 1000;
          const FIVE_MINUTES = 5 * 60 * 1000;

          if (Date.now() > expiresAt - FIVE_MINUTES) {
            const res = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: token.accessToken }),
            });

            if (res.ok) {
              const { access_token } = await res.json();
              token.accessToken = access_token;
            }
          }
        } catch {
          // If refresh fails, keep existing token — will fail on next API call
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  // Cookie domain covers both bestairesumes.com and www.bestairesumes.com
  // Without this, OAuth state cookies set on www. are invisible when the callback
  // arrives on the root domain (or vice versa), causing "State cookie was missing"
  cookies: process.env.NODE_ENV === "production"
    ? {
        sessionToken: {
          name: "next-auth.session-token",
          options: { httpOnly: true, sameSite: "lax", path: "/", secure: true, domain: ".bestairesumes.com" },
        },
        callbackUrl: {
          name: "next-auth.callback-url",
          options: { sameSite: "lax", path: "/", secure: true, domain: ".bestairesumes.com" },
        },
        csrfToken: {
          name: "next-auth.csrf-token",
          options: { httpOnly: true, sameSite: "lax", path: "/", secure: true, domain: ".bestairesumes.com" },
        },
      }
    : undefined,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
