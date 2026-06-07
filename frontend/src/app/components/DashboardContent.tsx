import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Nifty50Widget from './Nifty50Widget';

export default function DashboardContent() {
  const stats = [
    {
      label: 'Total Portfolio Value',
      value: '$124,563.89',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign
    },
    {
      label: "Today's P&L",
      value: '+$3,247.52',
      change: '+2.68%',
      isPositive: true,
      icon: TrendingUp
    },
    {
      label: 'Active Positions',
      value: '14',
      change: '+2 today',
      isPositive: true,
      icon: Activity
    },
    {
      label: 'Win Rate',
      value: '68.4%',
      change: '+3.2%',
      isPositive: true,
      icon: TrendingUp
    }
  ];

  const positions = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.33, shares: 50, value: 8922.50 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.89, change: -1.23, changePercent: -0.85, shares: 30, value: 4286.70 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.34, change: 5.67, changePercent: 1.39, shares: 25, value: 10308.50 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.91, change: -3.45, changePercent: -1.37, shares: 40, value: 9956.40 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 892.34, change: 12.45, changePercent: 1.41, shares: 15, value: 13385.10 }
  ];

  const watchlist = [
    { symbol: 'AMD', price: 168.23, change: 3.45, changePercent: 2.09 },
    { symbol: 'AMZN', price: 178.56, change: -2.34, changePercent: -1.29 },
    { symbol: 'META', price: 512.89, change: 8.92, changePercent: 1.77 },
    { symbol: 'NFLX', price: 623.45, change: -5.67, changePercent: -0.90 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[var(--color-text-secondary)]">Welcome back, track your portfolio performance</p>
      </div>

      {/* Nifty50 Widget */}
      <Nifty50Widget />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--color-text-secondary)]">{stat.label}</span>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Icon className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-sm flex items-center gap-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Positions Table */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
          <div className="p-5 border-b border-[var(--color-border)]">
            <h2 className="font-semibold">Active Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-secondary)]">Symbol</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-secondary)]">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-secondary)]">Change</th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--color-text-secondary)]">Shares</th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--color-text-secondary)]">Value</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.symbol} className="border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-semibold">{position.symbol}</div>
                        <div className="text-xs text-[var(--color-text-secondary)]">{position.name}</div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">${position.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className={`flex items-center gap-1 ${position.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {position.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-medium">{position.changePercent >= 0 ? '+' : ''}{position.changePercent.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">{position.shares}</td>
                    <td className="p-4 text-right font-medium">${position.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
          <div className="p-5 border-b border-[var(--color-border)]">
            <h2 className="font-semibold">Watchlist</h2>
          </div>
          <div className="p-4 space-y-3">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-muted)] transition-colors cursor-pointer">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm font-medium">${stock.price.toFixed(2)}</div>
                </div>
                <div className={`text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="text-sm font-medium">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</div>
                  <div className="text-xs">{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--color-border)]">
            <button className="w-full py-2 text-sm text-blue-500 font-medium hover:bg-blue-500/10 rounded-lg transition-colors">
              View All Stocks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
