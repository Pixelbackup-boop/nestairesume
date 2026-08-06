/**
 * PATCH /api/v1/auth/profile — update name and/or avatar.
 * Ported from backend updateProfile() (name and avatarId only).
 */
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { jsonResponse, validationErrorResponse, authenticateRequest } from '@/lib/server/apiUtils';

export { OPTIONS } from '@/lib/server/apiUtils';

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  avatarId: z.number().int().positive().optional(),
});

export async function PATCH(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');

  const tokenUser = await authenticateRequest(request);
  if (!tokenUser) {
    return jsonResponse({ detail: 'Not authenticated' }, 401, origin);
  }

  const body: unknown = await request.json().catch(() => ({}));
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error, origin);
  }

  try {
    const updateData: { name?: string; image?: string } = {};
    if (parsed.data.name) updateData.name = parsed.data.name;
    if (parsed.data.avatarId) updateData.image = `avatar-${parsed.data.avatarId}`;

    const user = await getDb().user.update({
      where: { id: tokenUser.id },
      data: updateData,
      select: { id: true, email: true, name: true, image: true, role: true },
    });

    return jsonResponse(user, 200, origin);
  } catch (error) {
    console.error('Profile update error', error);
    return jsonResponse({ detail: 'Profile update failed' }, 400, origin);
  }
}
