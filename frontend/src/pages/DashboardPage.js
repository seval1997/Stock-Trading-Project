import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function DashboardPage() {
  const [symbols, setSymbols] = useState([]);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/stocks/nse-symbols")
      .then(res => {
        const dataWithId = res.data.map((s, i) => ({ id: i + 1, symbol: s }));
        setSymbols(dataWithId);
      })
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "symbol", headerName: "Symbol", flex: 1 }
  ];

  // Handle row click
  const handleRowClick = (params) => {
    const selectedSymbol = params.row.symbol;
    axios.get(`http://127.0.0.1:5000/api/stocks/get_stock_data_by_symbol?symbol=${selectedSymbol}`)
      .then(res => setStockData(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>All NSE Symbols</h2>
      <DataGrid
        rows={symbols}
        columns={columns}
        pageSize={20}
        onRowClick={handleRowClick}
      />

      {stockData && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Data for {stockData.symbol}</h3>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
