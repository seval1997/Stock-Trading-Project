import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function StocksPage() {
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [interval, setInterval] = useState("1d"); // default daily

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/stocks/nse-symbols")
      .then(res => {
        const dataWithId = res.data.map((s, i) => ({ id: i + 1, symbol: s }));
        setSymbols(dataWithId);
      })
      .catch(err => console.error(err));
  }, []);

  const fetchStockData = (symbol, interval) => {
    axios.get(`http://127.0.0.1:5000/api/stocks/get_stock_data_by_symbol?symbol=${symbol}.NS&interval=${interval}`)
      .then(res => setStockData(res.data))
      .catch(err => console.error(err));
  };

  const handleDropdownChange = (event) => {
    const symbol = event.target.value;
    setSelectedSymbol(symbol);
    fetchStockData(symbol, interval);
  };

  const handleRowClick = (params) => {
    const symbol = params.row.symbol;
    setSelectedSymbol(symbol);
    fetchStockData(symbol, interval);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    if (selectedSymbol) {
      fetchStockData(selectedSymbol, newInterval);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "symbol", headerName: "Symbol", flex: 1 }
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Select NSE Symbol</h2>
      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel id="symbol-label">Symbol</InputLabel>
        <Select
          labelId="symbol-label"
          value={selectedSymbol}
          onChange={handleDropdownChange}
        >
          {symbols.map((s) => (
            <MenuItem key={s.id} value={s.symbol}>{s.symbol}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedSymbol && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Data for {selectedSymbol} ({interval})</h3>

          {/* Interval Buttons */}
          <ButtonGroup variant="outlined" style={{ marginBottom: "1rem" }}>
            {["5m","15m","30m","60m","240m","1d","1wk","1mo"].map((intv) => (
              <Button key={intv} onClick={() => handleIntervalChange(intv)}>
                {intv}
              </Button>
            ))}
          </ButtonGroup>

          {/* Stock Data Table */}
          {stockData && stockData.data && (
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {stockData.data.slice(0, 20).map((row, i) => (
                  <tr key={i}>
                    <td>{row.Date || row.Datetime}</td>
                    <td>{row.Open}</td>
                    <td>{row.High}</td>
                    <td>{row.Low}</td>
                    <td>{row.Close}</td>
                    <td>{row.Volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default StocksPage;
