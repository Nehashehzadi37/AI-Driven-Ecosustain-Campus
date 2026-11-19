import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

export async function POST(req: Request) {
  let body: { fullName?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const fullName = String(body.fullName ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (fullName.length < 3) {
    return NextResponse.json({ message: 'Please enter your full name.' }, { status: 400 });
  }
  if (!validEmail(email)) {
    return NextResponse.json({ message: 'Please enter a valid email.' }, { status: 400 });
  }
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return NextResponse.json(
      { message: 'Password must be 8+ characters with at least one letter and one number.' },
      { status: 400 }
    );
  }

  // Sirf pehla admin register ho sakta hai. Admin pehle se ho to registration band.
  const { count, error: countError } = await supabaseAdmin
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'admin');

  if (countError) {
    return NextResponse.json({ message: countError.message }, { status: 500 });
  }
  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { message: 'An admin account already exists. Please sign in instead.' },
      { status: 403 }
    );
  }

  // Auth user banao (email confirm already true, to mail ka intezar nahi)
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    const msg = error?.message ?? 'Could not create the account.';
    const exists = /already|registered|exists/i.test(msg);
    return NextResponse.json(
      { message: exists ? 'This email is already registered.' : msg },
      { status: exists ? 409 : 500 }
    );
  }

  // Profile row (role admin)
  const { error: profileError } = await supabaseAdmin.from('profiles').insert({
    id: data.user.id,
    full_name: fullName,
    email,
    role: 'admin',
    active: true,
  });

  if (profileError) {
    // Adhoora account na rahe
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    return NextResponse.json({ message: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}