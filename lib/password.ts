import { randomInt } from 'crypto';

// Server par temporary password banata hai.
export function makePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 12; i++) out += chars[randomInt(chars.length)];
  return out + '7';
}