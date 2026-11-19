// Temporary: backend/Supabase aane tak accounts browser ke localStorage mein save honge.
export type LocalUser = { fullName: string; email: string; password: string };

const KEY = 'eco_users';

export function getUsers(): LocalUser[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function registerLocal(fullName: string, email: string, password: string) {
  const mail = email.trim().toLowerCase();
  const users = getUsers().filter((u) => u.email !== mail);
  users.push({ fullName: fullName.trim(), email: mail, password });
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function loginLocal(email: string, password: string) {
  const mail = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === mail && u.password === password);
  if (!user) throw new Error('Incorrect email or password.');
  localStorage.setItem('eco_session', JSON.stringify({ fullName: user.fullName, email: user.email }));
  return user;
}