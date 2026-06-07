import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Nifty50Widget() {
  const [nifty50Data, setNifty50Data] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/stocks/nifty50_dashboard_card")
      .then((response) => {
        const records = response.data;
        const data = response.data.data;
        console.log("Nifty50 API response:", records);
        setNifty50Data({
          index: records.symbol,
          change: records.closingDiff,
          changePercent: records.closingPercentageChange,
          open: data.Open,
          high: data.High,
          low: data.Low,
          close: data.Close,
          lastUpdated: records.date,
          previousClose: records.closingDiff < 0 ? data.Close - records.closingDiff : data.Close - records.closingDiff 
        });
      })
      .catch((error) => {
        console.error("Error fetching Nifty50 data:", error);
      });
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!nifty50Data) {
    return (
      <div className="p-5 text-sm text-gray-500">
        Loading NIFTY 50 data…
      </div>
    );
  } else {
    console.log("Nifty50 Data:", nifty50Data);
  }

  const isPositive = nifty50Data.change >= 0;

  return (
    <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[var(--color-border)] bg-gradient-to-r from-orange-500/10 to-green-500/10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{nifty50Data.index}</h2>
              <span className="px-2 py-0.5 text-xs font-medium bg-orange-500/20 text-orange-600 rounded">
                NSE
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Last updated: {nifty50Data.lastUpdated} IST
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold">
            {nifty50Data.close.toFixed(2)}
          </div>
          <div
            className={`flex items-center gap-1.5 text-lg font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span>{isPositive ? "+" : ""}{nifty50Data.change.toFixed(2)}</span>
            <span className="text-sm">
              ({isPositive ? "+" : ""}{nifty50Data.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-4 divide-x divide-[var(--color-border)] border-b border-[var(--color-border)]">
        <div className="p-3">
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Open</div>
          <div className="font-semibold">
            {nifty50Data.open.toFixed(2)}
          </div>
        </div>
        <div className="p-3">
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">High</div>
          <div className="font-semibold text-green-500">
            {nifty50Data.high.toFixed(2)}
          </div>
        </div>
        <div className="p-3">
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Low</div>
          <div className="font-semibold text-red-500">
            {nifty50Data.low.toFixed(2)}
          </div>
        </div>
        <div className="p-3">
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Prev Close</div>
          <div className="font-semibold">
            {nifty50Data.previousClose.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
