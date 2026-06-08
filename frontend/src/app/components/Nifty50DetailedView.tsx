import { TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Nifty50DetailedView() {
    const [selectedPeriod, setSelectedPeriod] = useState('1M');
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);

    // Mock historical Nifty50 data
    const historicalData = [
        { date: '2026-06-08', open: 22301.80, high: 22498.55, low: 22287.40, close: 22447.10, volume: 245678900 },
        { date: '2026-06-07', open: 22256.45, high: 22345.80, low: 22198.30, close: 22301.80, volume: 238945600 },
        { date: '2026-06-06', open: 22189.20, high: 22298.75, low: 22134.60, close: 22256.45, volume: 241234500 },
        { date: '2026-06-05', open: 22045.35, high: 22234.90, low: 22001.25, close: 22189.20, volume: 252341200 },
        { date: '2026-06-04', open: 21998.60, high: 22089.40, low: 21945.80, close: 22045.35, volume: 228567800 },
        { date: '2026-06-03', open: 22123.75, high: 22156.30, low: 21967.50, close: 21998.60, volume: 235678400 },
        { date: '2026-06-02', open: 22087.90, high: 22198.45, low: 22034.20, close: 22123.75, volume: 242156700 },
        { date: '2026-06-01', open: 21934.25, high: 22134.80, low: 21889.60, close: 22087.90, volume: 248923100 },
        { date: '2026-05-31', open: 21856.40, high: 21989.55, low: 21823.70, close: 21934.25, volume: 239845600 },
        { date: '2026-05-30', open: 21789.65, high: 21901.20, low: 21734.80, close: 21856.40, volume: 233567200 },
        { date: '2026-05-29', open: 21845.30, high: 21878.90, low: 21756.40, close: 21789.65, volume: 227891300 },
        { date: '2026-05-28', open: 21756.80, high: 21898.60, low: 21712.30, close: 21845.30, volume: 245123800 },
        { date: '2026-05-27', open: 21698.45, high: 21812.70, low: 21645.90, close: 21756.80, volume: 238456900 },
        { date: '2026-05-26', open: 21623.90, high: 21734.50, low: 21587.20, close: 21698.45, volume: 231789400 },
        { date: '2026-06-09', open: 22301.80, high: 22498.55, low: 22287.40, close: 22447.10, volume: 245678900 },
        { date: '2026-06-10', open: 22256.45, high: 22345.80, low: 22198.30, close: 22301.80, volume: 238945600 },
        { date: '2026-06-11', open: 22189.20, high: 22298.75, low: 22134.60, close: 22256.45, volume: 241234500 },
        { date: '2026-06-12', open: 22045.35, high: 22234.90, low: 22001.25, close: 22189.20, volume: 252341200 },
        { date: '2026-06-13', open: 21998.60, high: 22089.40, low: 21945.80, close: 22045.35, volume: 228567800 },
        { date: '2026-06-14', open: 22123.75, high: 22156.30, low: 21967.50, close: 21998.60, volume: 235678400 },
        { date: '2026-06-15', open: 22087.90, high: 22198.45, low: 22034.20, close: 22123.75, volume: 242156700 },
        { date: '2026-06-16', open: 21934.25, high: 22134.80, low: 21889.60, close: 22087.90, volume: 248923100 },
        { date: '2026-05-17', open: 21856.40, high: 21989.55, low: 21823.70, close: 21934.25, volume: 239845600 },
        { date: '2026-05-18', open: 21789.65, high: 21901.20, low: 21734.80, close: 21856.40, volume: 233567200 },
        { date: '2026-05-10', open: 21845.30, high: 21878.90, low: 21756.40, close: 21789.65, volume: 227891300 },
        { date: '2026-05-20', open: 21756.80, high: 21898.60, low: 21712.30, close: 21845.30, volume: 245123800 },
        { date: '2026-05-27', open: 21698.45, high: 21812.70, low: 21645.90, close: 21756.80, volume: 238456900 },
        { date: '2026-05-26', open: 21623.90, high: 21734.50, low: 21587.20, close: 21698.45, volume: 231789400 },
        { date: '2026-05-25', open: 21567.20, high: 21678.80, low: 21523.40, close: 21623.90, volume: 226543700 }
    ];

    // Calculate Close Diff and Close Diff Percentage
    const tableData = historicalData.map((row, index) => {
        const prevClose = index < historicalData.length - 1 ? historicalData[index + 1].close : row.close;
        const closeDiff = row.close - prevClose;
        const closeDiffPercent = ((closeDiff / prevClose) * 100);

        return {
            ...row,
            closeDiff,
            closeDiffPercent
        };
    });

    const periods = ['1W', '1M', '3M', '6M', '1Y'];
    const rowsOptions = [15, 30, 50, 100];

    // Pagination calculations
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = tableData.slice(startIndex, endIndex);

    // Reset to page 1 when rows per page changes
    const handleRowsPerPageChange = (rows) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatVolume = (volume) => {
        return (volume / 10000000).toFixed(2);
    };

    const handleExport = () => {
        // Simulate export functionality
        console.log('Exporting data...');
    };

    return (
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
            {/* Header */}
            <div className="p-5 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold mb-1">NIFTY 50 - Detailed View</h2>
                        <p className="text-sm text-[var(--color-text-secondary)]">Historical market data</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    <div className="flex gap-1">
                        {periods.map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedPeriod === period
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-[var(--color-muted)] hover:bg-[var(--color-border)]'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[var(--color-muted)]">
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold">Date</th>
                            <th className="text-right p-4 text-sm font-semibold">Open</th>
                            <th className="text-right p-4 text-sm font-semibold">High</th>
                            <th className="text-right p-4 text-sm font-semibold">Low</th>
                            <th className="text-right p-4 text-sm font-semibold">Close</th>
                            <th className="text-right p-4 text-sm font-semibold">Volume (Cr)</th>
                            <th className="text-right p-4 text-sm font-semibold">Close Diff</th>
                            <th className="text-right p-4 text-sm font-semibold">Close Diff %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => {
                            const isPositive = row.closeDiff >= 0;
                            const isHighest = row.close === row.high;
                            const isLowest = row.close === row.low;

                            return (
                                <tr
                                    key={row.date}
                                    className={`border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors ${startIndex + index === 0 ? 'bg-blue-500/5' : ''
                                        }`}
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{formatDate(row.date)}</span>
                                            {startIndex + index === 0 && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-600 rounded">
                                                    Latest
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                        {row.open.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right font-medium text-green-600">
                                        {row.high.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right font-medium text-red-600">
                                        {row.low.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <span className="font-semibold">
                                                {row.close.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            {isHighest && <TrendingUp className="w-3 h-3 text-green-500" />}
                                            {isLowest && <TrendingDown className="w-3 h-3 text-red-500" />}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                        {formatVolume(row.volume)}
                                    </td>
                                    <td className={`p-4 text-right font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {isPositive ? '+' : ''}{row.closeDiff.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded font-semibold text-sm ${isPositive
                                            ? 'bg-green-500/10 text-green-600'
                                            : 'bg-red-500/10 text-red-600'
                                            }`}>
                                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                            {isPositive ? '+' : ''}{row.closeDiffPercent.toFixed(2)}%
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--color-text-secondary)]">Rows per page:</span>
                    <div className="flex gap-1">
                        {rowsOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleRowsPerPageChange(option)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${rowsPerPage === option
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-[var(--color-muted)] hover:bg-[var(--color-border)]'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                        Showing {startIndex + 1}-{Math.min(endIndex, tableData.length)} of {tableData.length}
                    </span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-[var(--color-muted)] hover:bg-[var(--color-border)]'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-muted)]/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Period High</div>
                        <div className="font-semibold text-green-600">
                            {Math.max(...tableData.map(d => d.high)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Period Low</div>
                        <div className="font-semibold text-red-600">
                            {Math.min(...tableData.map(d => d.low)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Avg Volume</div>
                        <div className="font-semibold">
                            {(tableData.reduce((acc, d) => acc + d.volume, 0) / tableData.length / 10000000).toFixed(2)} Cr
                        </div>
                    </div>
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Total Change</div>
                        <div className={`font-semibold ${tableData[0].close >= tableData[tableData.length - 1].close ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {((tableData[0].close - tableData[tableData.length - 1].close) / tableData[tableData.length - 1].close * 100).toFixed(2)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
