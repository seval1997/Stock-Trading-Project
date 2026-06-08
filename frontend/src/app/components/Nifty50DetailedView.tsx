import { TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface HistoricalDataRow {
    Close: number;
    Date: string;
    Dividends: number;
    High: number;
    Low: number;
    Open: number;
    StockSplit: number;
    Volume: number;
}

interface TableDataRow extends HistoricalDataRow {
    closeDiff: number;
    closeDiffPercent: number;
}

export default function Nifty50DetailedView() {
    const [selectedPeriod, setSelectedPeriod] = useState("2mo");
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [historicalData, setHistoricalData] = useState<HistoricalDataRow[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/stocks/nifty50_detailed_view?period=" + selectedPeriod)
            .then(response => {
                const reversedData = [...response.data.data].reverse();
                setHistoricalData(reversedData);
            })
            .catch(error => {
                console.error("Error fetching Nifty50 detailed view data:", error);
            });
    }, [selectedPeriod]);

    // Calculate Close Diff and Close Diff Percentage
    const tableData: TableDataRow[] = historicalData && historicalData.length > 0
        ? historicalData.map((row, index) => {
            const nextRow = historicalData[index + 1];
            const prevClose = nextRow ? nextRow.Close : row.Close;
            const closeDiff = row.Close - prevClose;
            const closeDiffPercent = ((closeDiff / prevClose) * 100);

            return {
                ...row,
                closeDiff,
                closeDiffPercent
            };
        })
        : [];

    const periods = ['7d', '15d', '1mo', '3mo'];
    const rowsOptions = [15, 30];

    // Pagination calculations
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = tableData.slice(startIndex, endIndex);

    // Reset to page 1 when rows per page changes
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
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
                            <th className="text-right p-4 text-sm font-semibold">Close Diff</th>
                            <th className="text-right p-4 text-sm font-semibold">Close Diff %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => {
                            const isPositive = row.closeDiff >= 0;
                            const isHighest = row.Close === row.High;
                            const isLowest = row.Close === row.Low;

                            return (
                                <tr
                                    key={row.Date}
                                    className={`border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors ${startIndex + index === 0 ? 'bg-blue-500/5' : ''
                                        }`}
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{row.Date}</span>
                                            {startIndex + index === 0 && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-600 rounded">
                                                    Latest
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                        {row.Open.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right font-medium text-green-600">
                                        {row.High.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right font-medium text-red-600">
                                        {row.Low.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <span className="font-semibold">
                                                {row.Close.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            {isHighest && <TrendingUp className="w-3 h-3 text-green-500" />}
                                            {isLowest && <TrendingDown className="w-3 h-3 text-red-500" />}
                                        </div>
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
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-sm text-center">
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Period High</div>
                        <div className="font-semibold text-green-600">
                            {Math.max(...tableData.map(d => d.High)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div>
                        <div className="text-[var(--color-text-secondary)] mb-1">Period Low</div>
                        <div className="font-semibold text-red-600">
                            {Math.min(...tableData.map(d => d.Low)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
