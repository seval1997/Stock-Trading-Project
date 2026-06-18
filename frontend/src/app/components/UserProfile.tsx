import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    Award,
    Clock,
    Edit2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

const user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra, India',
    joined: 'January 15, 2022',
    avatar: 'JD',
    plan: 'Pro Trader',
    kycStatus: 'verified',
    accountId: 'TRD-2024-00142',
    broker: 'Zerodha',
    segment: 'NSE / BSE / F&O',
};

const tradingStats = [
    { label: 'Total Portfolio Value', value: '₹1,04,23,456', sub: '+12.5% all-time', positive: true, icon: DollarSign },
    { label: "Today's P&L", value: '+₹27,342', sub: '+2.68% today', positive: true, icon: TrendingUp },
    { label: 'Win Rate', value: '68.4%', sub: '+3.2% this month', positive: true, icon: Award },
    { label: 'Active Positions', value: '14', sub: '+2 opened today', positive: true, icon: Activity },
    { label: 'Total Trades', value: '1,284', sub: 'Since account opening', positive: null, icon: Clock },
    { label: 'Avg. Return / Trade', value: '₹812', sub: 'Last 90 days', positive: true, icon: TrendingUp },
];

const holdings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 120, avgCost: 2410.5, ltp: 2645.3, pnl: 28176, pnlPct: 9.74 },
    { symbol: 'INFY', name: 'Infosys Ltd.', qty: 200, avgCost: 1520.0, ltp: 1487.6, pnl: -6480, pnlPct: -2.13 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', qty: 80, avgCost: 1610.0, ltp: 1724.5, pnl: 9160, pnlPct: 7.11 },
    { symbol: 'TCS', name: 'Tata Consultancy', qty: 50, avgCost: 3780.0, ltp: 3912.4, pnl: 6620, pnlPct: 3.50 },
    { symbol: 'SBIN', name: 'State Bank of India', qty: 300, avgCost: 548.0, ltp: 521.3, pnl: -8010, pnlPct: -4.87 },
];

const recentActivity = [
    { type: 'BUY', symbol: 'NIFTY 50 JUN FUT', qty: 2, price: '₹22,345.00', date: '13 Jun 2026, 10:14 AM', status: 'executed' },
    { type: 'SELL', symbol: 'RELIANCE', qty: 30, price: '₹2,641.50', date: '12 Jun 2026, 02:47 PM', status: 'executed' },
    { type: 'BUY', symbol: 'HDFCBANK', qty: 20, price: '₹1,718.30', date: '11 Jun 2026, 11:02 AM', status: 'executed' },
    { type: 'SELL', symbol: 'INFY', qty: 50, price: '₹1,491.80', date: '10 Jun 2026, 03:15 PM', status: 'executed' },
    { type: 'BUY', symbol: 'TCS', qty: 10, price: '₹3,905.00', date: '09 Jun 2026, 09:52 AM', status: 'executed' },
];

export default function UserProfilePage() {
    const totalPnl = holdings.reduce((s, h) => s + h.pnl, 0);

    return (
        <div className="flex-1 overflow-auto p-6 space-y-6 bg-[var(--color-background)]">
            {/* ── Header ── */}
            <div>
                <h1 className="text-[var(--color-text-primary)] mb-1" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    My Profile
                </h1>
                <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.875rem' }}>
                    Manage your account details and review trading performance
                </p>
            </div>

            {/* ── Identity card ── */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#3b82f6)', fontSize: '1.75rem', fontWeight: 700 }}
                >
                    {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-[var(--color-text-primary)]" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                            {user.name}
                        </span>
                        <span
                            className="px-2.5 py-0.5 rounded-full text-white"
                            style={{ background: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 600 }}
                        >
                            {user.plan}
                        </span>
                        {user.kycStatus === 'verified' ? (
                            <span className="flex items-center gap-1 text-green-500" style={{ fontSize: '0.78rem', fontWeight: 500 }}>
                                <CheckCircle className="w-3.5 h-3.5" /> KYC Verified
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-yellow-500" style={{ fontSize: '0.78rem', fontWeight: 500 }}>
                                <AlertCircle className="w-3.5 h-3.5" /> KYC Pending
                            </span>
                        )}
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-3" style={{ fontSize: '0.85rem' }}>
                        @{user.username} · Account ID: {user.accountId}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                        <InfoChip icon={Mail} text={user.email} />
                        <InfoChip icon={Phone} text={user.phone} />
                        <InfoChip icon={MapPin} text={user.location} />
                        <InfoChip icon={Calendar} text={`Joined ${user.joined}`} />
                    </div>
                </div>

                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] transition-colors flex-shrink-0"
                    style={{ fontSize: '0.85rem', fontWeight: 500 }}
                >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                </button>
            </div>

            {/* ── Account details ── */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                <h2 className="text-[var(--color-text-primary)] mb-4" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Account Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailRow icon={Shield} label="Broker" value={user.broker} />
                    <DetailRow icon={Activity} label="Segment" value={user.segment} />
                    <DetailRow icon={User} label="Account" value={user.accountId} />
                </div>
            </div>

            {/* ── Trading stats ── */}
            <div>
                <h2 className="text-[var(--color-text-primary)] mb-4" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Trading Statistics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tradingStats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.label}
                                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-start gap-4"
                            >
                                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                    <Icon className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-[var(--color-text-secondary)] mb-0.5" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                                    <p className="text-[var(--color-text-primary)]" style={{ fontSize: '1.15rem', fontWeight: 700 }}>{s.value}</p>
                                    {s.positive !== null && (
                                        <p className={s.positive ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '0.75rem' }}>
                                            {s.sub}
                                        </p>
                                    )}
                                    {s.positive === null && (
                                        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.75rem' }}>{s.sub}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Holdings & Recent Activity ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Holdings */}
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
                        <h2 className="text-[var(--color-text-primary)]" style={{ fontSize: '1rem', fontWeight: 600 }}>
                            Holdings
                        </h2>
                        <span
                            className={totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}
                            style={{ fontSize: '0.85rem', fontWeight: 600 }}
                        >
                            Total P&L: {totalPnl >= 0 ? '+' : ''}₹{Math.abs(totalPnl).toLocaleString('en-IN')}
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    {['Symbol', 'Qty', 'Avg Cost', 'LTP', 'P&L'].map((h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-3 text-left text-[var(--color-text-secondary)]"
                                            style={{ fontSize: '0.75rem', fontWeight: 500 }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((h) => (
                                    <tr key={h.symbol} className="border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors">
                                        <td className="px-4 py-3">
                                            <p className="text-[var(--color-text-primary)]" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{h.symbol}</p>
                                            <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.72rem' }}>{h.name}</p>
                                        </td>
                                        <td className="px-4 py-3 text-[var(--color-text-primary)]" style={{ fontSize: '0.85rem' }}>{h.qty}</td>
                                        <td className="px-4 py-3 text-[var(--color-text-primary)]" style={{ fontSize: '0.85rem' }}>₹{h.avgCost.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-[var(--color-text-primary)]" style={{ fontSize: '0.85rem' }}>₹{h.ltp.toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <p className={h.pnl >= 0 ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                                {h.pnl >= 0 ? '+' : ''}₹{Math.abs(h.pnl).toLocaleString('en-IN')}
                                            </p>
                                            <p className={h.pnlPct >= 0 ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '0.72rem' }}>
                                                {h.pnlPct >= 0 ? '+' : ''}{h.pnlPct.toFixed(2)}%
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-[var(--color-border)]">
                        <h2 className="text-[var(--color-text-primary)]" style={{ fontSize: '1rem', fontWeight: 600 }}>
                            Recent Activity
                        </h2>
                    </div>
                    <div className="divide-y divide-[var(--color-border)]">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-muted)] transition-colors">
                                {/* Buy / Sell badge */}
                                <div
                                    className="w-14 text-center rounded-md py-0.5 flex-shrink-0"
                                    style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        background: a.type === 'BUY' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                                        color: a.type === 'BUY' ? '#22c55e' : '#ef4444',
                                    }}
                                >
                                    {a.type}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[var(--color-text-primary)] truncate" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                        {a.symbol}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.72rem' }}>
                                        {a.qty} units · {a.price}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.72rem' }}>{a.date}</p>
                                    <p className="text-green-500" style={{ fontSize: '0.72rem', fontWeight: 500 }}>
                                        {a.status}
                                    </p>
                                </div>
                                {a.type === 'BUY' ? (
                                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoChip({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
    return (
        <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]" style={{ fontSize: '0.8rem' }}>
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            {text}
        </span>
    );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
            <div className="p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Icon className="w-4 h-4 text-blue-500" />
            </div>
            <div>
                <p className="text-[var(--color-text-secondary)]" style={{ fontSize: '0.72rem' }}>{label}</p>
                <p className="text-[var(--color-text-primary)]" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{value}</p>
            </div>
        </div>
    );
}
