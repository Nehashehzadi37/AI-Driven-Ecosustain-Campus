import { NextResponse } from 'next/server';
import { createClient } from './supabase/server';
import { supabaseAdmin } from './supabase/admin';

export type Role = 'admin' | 'sweeper' | 'incharge';
export type Profile = { id: string; full_name: string; email: string; role: Role; active: boolean };

export const toStaff = (p: Profile) => ({
  id: p.id,
  name: p.full_name,
  email: p.email,
  role: p.role,
  active: p.active,
});

// Cookie se user nikalo, phir DATABASE se uska role dekho. Inactive account null deta hai.
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email, role, active')
    .eq('id', data.user.id)
    .single();

  if (!profile || !profile.active) return null;
  return profile as Profile;
}

// API routes mein: const me = await requireRole(['admin']); if (me instanceof NextResponse) return me;
export async function requireRole(roles: Role[]): Promise<Profile | NextResponse> {
  const profile = await getProfile();
  if (!profile) return NextResponse.json({ message: 'Please sign in.' }, { status: 401 });
  if (!roles.includes(profile.role)) {
    return NextResponse.json({ message: 'You do not have permission.' }, { status: 403 });
  }
  return profile;
}