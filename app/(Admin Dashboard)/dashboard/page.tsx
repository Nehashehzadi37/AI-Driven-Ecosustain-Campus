import Link from 'next/link';

const STATS = [
  { label: 'Total reports', value: '--' },
  { label: 'Pending verification', value: '--' },
  { label: 'Active sweepers', value: '--' },
  { label: 'Batches', value: '--' },
];

export default function DashboardPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-lead">Overview of campus waste reports, collection and sustainability.</p>
        </div>
      </div>

      <div className="dash-stats">
        {STATS.map((s) => (
          <div key={s.label} className="dash-stat">
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="dash-panel">
        <h2>Get started</h2>
        <p>Live numbers will appear here once the database is connected. First, create accounts for your sweepers and waste in-charge.</p>
        <Link href="/dashboard/staff" className="dash-btn">Manage staff accounts</Link>
      </div>
    </>
  );
}