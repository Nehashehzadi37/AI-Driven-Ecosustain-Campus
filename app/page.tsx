import Link from 'next/link';

const pages = [
  { name: 'Staff Login', href: '/login' },
  { name: 'Admin Registration', href: '/register' },
  { name: 'Report Waste (QR demo)', href: '/report?bin=BIN-014' },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#faf7ee',
        color: '#0b2418',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ margin: '0 0 28px', fontSize: 32 }}>EcoSustain Campus</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            style={{
              padding: '16px 20px',
              background: '#0a4228',
              color: '#fff',
              borderRadius: 16,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            {p.name}
          </Link>
        ))}
      </div>
    </main>
  );
}