import Link from 'next/link';
import '../(Admin Dashboard)/dashboard/dashboard.css';

export default function UnauthorizedPage() {
  return (
    <main className="dash-center">
      <div className="dash-denied">
        <div className="dash-denied-ic">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b3261e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <h1>Access denied</h1>
        <p>Your account does not have permission to open this page. Please sign in with the correct role or contact the admin.</p>
        <div className="dash-denied-actions">
          <Link href="/login" className="dash-btn">Go to sign in</Link>
          <Link href="/" className="dash-btn dash-btn-ghost">Home</Link>
        </div>
      </div>
    </main>
  );
}