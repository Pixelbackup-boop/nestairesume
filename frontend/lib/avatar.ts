/**
 * Avatar utility functions for user avatars
 * Provides consistent avatar selection and display
 */

const AVATAR_COUNT = 5;

/**
 * Get avatar ID from user ID or stored image override
 * If user has selected an avatar (stored as "avatar-N"), use that
 * Otherwise, derive a consistent avatar from user ID hash
 */
export function getAvatarId(userId: string, imageOverride?: string | null): number {
  // If user has custom avatar stored (format: "avatar-N")
  if (imageOverride?.startsWith('avatar-')) {
    const parsed = parseInt(imageOverride.split('-')[1], 10);
    if (parsed >= 1 && parsed <= AVATAR_COUNT) {
      return parsed;
    }
  }

  // Derive from user ID hash for consistency
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return (Math.abs(hash) % AVATAR_COUNT) + 1;
}

/**
 * Get avatar image source path
 */
export function getAvatarSrc(avatarId: number): string {
  return `/avatars/avatar-${avatarId}.svg`;
}

/**
 * Get user initials as fallback
 */
export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
