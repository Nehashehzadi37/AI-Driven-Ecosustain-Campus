'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

type Role = 'sweeper' | 'incharge';
type Staff = { id: number; name: string; email: string; role: Role; active: boolean };
type Mode = 'add' | 'edit';
type Form = { name: string; email: string; role: Role; password: string };

const ROLE_LABEL: Record<Role, string> = { sweeper: 'Sweeper', incharge: 'Waste In-Charge' };
const EMPTY_FORM: Form = { name: '', email: '', role: 'sweeper', password: '' };

// Demo data: database lagne par yeh list Supabase se aayegi.
const INITIAL: Staff[] = [
  { id: 1, name: 'Ali Raza', email: 'ali.raza@ecosustain.org', role: 'sweeper', active: true },
  { id: 2, name: 'Bilal Ahmad', email: 'bilal.ahmad@ecosustain.org', role: 'sweeper', active: true },
  { id: 3, name: 'Sana Tariq', email: 'sana.tariq@ecosustain.org', role: 'incharge', active: true },
  { id: 4, name: 'Usman Khan', email: 'usman.khan@ecosustain.org', role: 'sweeper', active: false },
];

const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

// Demo temporary password. Asal project mein yeh server par banega.
function makePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const bytes = new Uint32Array(10);
  crypto.getRandomValues(bytes);
  let out = '';
  bytes.forEach((b) => { out += chars[b % chars.length]; });
  return out + '7';
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(INITIAL);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [mode, setMode] = useState<Mode | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState<{ name: string; password: string } | null>(null);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return staff.filter((s) => {
      const okRole = roleFilter === 'all' || s.role === roleFilter;
      const okSearch = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      return okRole && okSearch;
    });
  }, [staff, search, roleFilter]);

  function openAdd() {
    setForm({ ...EMPTY_FORM, password: makePassword() });
    setFormError('');
    setEditId(null);
    setMode('add');
  }

  function openEdit(s: Staff) {
    setForm({ name: s.name, email: s.email, role: s.role, password: '' });
    setFormError('');
    setEditId(s.id);
    setMode('edit');
  }

  function closeModal() {
    setMode(null);
    setEditId(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (name.length < 3) return setFormError('Please enter the full name (at least 3 characters).');

    if (mode === 'add') {
      if (!validEmail(email)) return setFormError('Please enter a valid email.');
      if (staff.some((s) => s.email.toLowerCase() === email)) return setFormError('An account with this email already exists.');
      if (form.password.length < 8) return setFormError('Temporary password must be at least 8 characters.');

      const nextId = staff.reduce((m, s) => Math.max(m, s.id), 0) + 1;
      setStaff((list) => [...list, { id: nextId, name, email, role: form.role, active: true }]);
      setNotice({ name, password: form.password });
    } else {
      setStaff((list) => list.map((s) => (s.id === editId ? { ...s, name, role: form.role } : s)));
    }
    closeModal();
  }

  function toggleActive(s: Staff) {
    const word = s.active ? 'deactivate' : 'activate';
    if (!window.confirm(`Do you want to ${word} ${s.name}'s account?`)) return;
    setStaff((list) => list.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x)));
  }

  function resetPassword(s: Staff) {
    if (!window.confirm(`Generate a new temporary password for ${s.name}?`)) return;
    setNotice({ name: s.name, password: makePassword() });
  }

  return (
    <>
      <div className="dash-head">
        <div>
          <h1 className="dash-title">Staff accounts</h1>
          <p className="dash-lead">Create and manage accounts for sweepers and waste in-charge. Staff cannot register themselves.</p>
        </div>
        <button type="button" className="dash-btn" onClick={openAdd}>+ Add staff</button>
      </div>

      {notice && (
        <div className="dash-notice" role="status">
          <div>
            Temporary password for <strong>{notice.name}</strong>: <code>{notice.password}</code>
            <br />
            Share it securely. The staff member should change it after the first sign in.
          </div>
          <button type="button" onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      <div className="dash-toolbar">
        <div className="dash-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D5B52" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            className="dash-input"
            type="search"
            placeholder="Search by name or email"
            aria-label="Search staff"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="dash-select"
          aria-label="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | Role)}
        >
          <option value="all">All roles</option>
          <option value="sweeper">Sweeper</option>
          <option value="incharge">Waste In-Charge</option>
        </select>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="dash-person">
                    <div className="dash-person-avatar">{s.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="dash-person-name">{s.name}</div>
                      <div className="dash-person-mail">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`dash-pill dash-pill-${s.role}`}>{ROLE_LABEL[s.role]}</span></td>
                <td><span className={`dash-pill ${s.active ? 'dash-pill-on' : 'dash-pill-off'}`}>{s.active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div className="dash-actions">
                    <button type="button" className="dash-mini" onClick={() => openEdit(s)}>Edit</button>
                    <button type="button" className="dash-mini" onClick={() => resetPassword(s)}>Reset password</button>
                    <button type="button" className={`dash-mini${s.active ? ' dash-mini-danger' : ''}`} onClick={() => toggleActive(s)}>
                      {s.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <div className="dash-empty">No staff found. Try another search or filter.</div>}
      </div>
      <p className="dash-count">Showing {visible.length} of {staff.length} staff accounts</p>

      {mode && (
        <div className="dash-overlay" onClick={closeModal}>
          <div className="dash-modal" role="dialog" aria-modal="true" aria-label={mode === 'add' ? 'Add staff' : 'Edit staff'} onClick={(e) => e.stopPropagation()}>
            <h2>{mode === 'add' ? 'Add staff account' : 'Edit staff account'}</h2>
            <p className="dash-lead">
              {mode === 'add'
                ? 'The staff member signs in with this email and the temporary password.'
                : 'Email cannot be changed. You can update the name and role.'}
            </p>

            <form onSubmit={handleSubmit} noValidate className="dash-form">
              <div className="dash-field">
                <label htmlFor="staff-name" className="dash-label">Full name</label>
                <input
                  id="staff-name"
                  className="dash-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ali Raza"
                />
              </div>

              <div className="dash-field">
                <label htmlFor="staff-email" className="dash-label">Email</label>
                <input
                  id="staff-email"
                  type="email"
                  className="dash-input"
                  value={form.email}
                  readOnly={mode === 'edit'}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@ecosustain.org"
                />
              </div>

              <div className="dash-field">
                <label htmlFor="staff-role" className="dash-label">Role</label>
                <select
                  id="staff-role"
                  className="dash-select"
                  style={{ width: '100%' }}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                >
                  <option value="sweeper">Sweeper</option>
                  <option value="incharge">Waste In-Charge</option>
                </select>
              </div>

              {mode === 'add' && (
                <div className="dash-field">
                  <label htmlFor="staff-pw" className="dash-label">Temporary password</label>
                  <div className="dash-pw-row">
                    <input
                      id="staff-pw"
                      className="dash-input"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button type="button" className="dash-btn dash-btn-ghost" onClick={() => setForm({ ...form, password: makePassword() })}>
                      Generate
                    </button>
                  </div>
                  <p className="dash-hint">At least 8 characters. Share it with the staff member securely.</p>
                </div>
              )}

              <p className="dash-error" role="alert" aria-live="polite">{formError}</p>

              <div className="dash-modal-actions">
                <button type="button" className="dash-btn dash-btn-ghost" onClick={closeModal}>Cancel</button>
                <button type="submit" className="dash-btn">{mode === 'add' ? 'Create account' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}