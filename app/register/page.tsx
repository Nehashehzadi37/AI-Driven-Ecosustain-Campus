'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './register.css';
import '../auth-layout.css';

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
};

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
};

function TextField({ id, label, value, onChange, placeholder, autoComplete }: TextFieldProps) {
  return (
    <div className="eco-field">
      <label htmlFor={id} className="eco-label">{label}</label>
      <div className="eco-input-wrap">
        <svg className="eco-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D5B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        <input
          id={id}
          type="text"
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="eco-input"
        />
      </div>
    </div>
  );
}

function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div className="eco-field">
      <label htmlFor="email" className="eco-label">Work email</label>
      <div className="eco-input-wrap">
        <svg className="eco-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D5B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        <input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="admin@ecosustain.org"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="eco-input"
        />
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange, autoComplete, placeholder, show, onToggle }: PasswordFieldProps) {
  return (
    <div className="eco-field">
      <label htmlFor={id} className="eco-label">{label}</label>
      <div className="eco-input-wrap">
        <svg className="eco-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D5B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="eco-input eco-input-pw"
        />
        <button type="button" className="eco-eye" aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} onClick={onToggle}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4D5B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
            {show && <path d="M4 4l16 16" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simple page: koi backend/Supabase nahi. Register dabane par seedha /login khulta hai.
  function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    router.push('/login');
  }

  return (
    <div className="eco-root">
      {/* ---------- Top header: logo + title ---------- */}
      <header className="eco-header">
        <img className="eco-logo" src="/logo.jpeg" width="52" height="52" alt="EcoSustain Campus logo" />
        <div className="eco-brand">
          <span className="eco-brand-top">AI-Driven</span>
          <span className="eco-brand-name">EcoSustain Campus</span>
        </div>
      </header>

      <main className="eco-page">
        {/* ---------- Left: door + boy animation ---------- */}
        <section className="eco-scene">
          <svg viewBox="0 0 560 420" role="img" aria-label="A person walking into an open green door" className="eco-svg">
            <rect x="10" y="392" width="540" height="10" rx="5" fill="#E6EAD5" />
            <path d="M40 392C32 330 62 272 112 270 168 272 184 340 176 392Z" fill="#E6EAD5" />
            <path d="M84 300L150 392" stroke="#FDFCF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M232 392V190a70 70 0 0 1 140 0V392Z" fill="#E6EAD5" />
            <path d="M395 392C392 350 415 322 445 324 485 326 505 360 500 392Z" fill="#E6EAD5" />
            <path d="M430 392L470 340" stroke="#FDFCF8" strokeWidth="3" strokeLinecap="round" />

            <path d="M190 392V217a55 55 0 0 1 110 0V392Z" fill="#F4F7D0" />

            <g className="eco-door">
              <path d="M190 392V217a55 55 0 0 1 110 0V392Z" fill="#0A4228" />
              <rect x="205" y="215" width="80" height="80" rx="6" fill="#FDFCF8" />
              <path d="M231.7 215V295M258.3 215V295M205 241.7H285M205 268.3H285" stroke="#0A4228" strokeWidth="4" />
              <rect x="276" y="305" width="7" height="24" rx="3.5" fill="#B7E33A" />
            </g>

            <g className="eco-boy">
              <path d="M432 300H442L440 392H428Z M460 300H470L474 392H462Z" fill="#0B2418" />
              <path d="M428 240H476L482 300H424Z" fill="#0A4228" />
              <path d="M430 250L414 292" stroke="#E8AFA0" strokeWidth="7" strokeLinecap="round" />
              <circle cx="452" cy="212" r="14" fill="#0B2418" />
              <circle cx="449" cy="216" r="11" fill="#E8AFA0" />
            </g>
          </svg>
        </section>

        {/* ---------- Right: registration card ---------- */}
        <section className="eco-panel">
          <div className="eco-card">
            <span className="eco-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A4228" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Admin registration
            </span>
            <h1 className="eco-title">Create admin account</h1>
            <p className="eco-lead">Register as a Waste Supervisor to manage reports, collection and sustainability analytics.</p>

            <form onSubmit={handleRegister} noValidate className="eco-form">
              <TextField
                id="full-name"
                label="Full name"
                value={fullName}
                onChange={setFullName}
                placeholder="e.g. Ayesha Khan"
                autoComplete="name"
              />
              <EmailField value={email} onChange={setEmail} />
              <PasswordField
                id="password"
                label="Password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
                placeholder="Password"
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
              <PasswordField
                id="confirm-password"
                label="Confirm password"
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
                placeholder="Type it again"
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
              <button type="submit" className="eco-submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create admin account'}
              </button>
            </form>

            <p className="eco-switch">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}