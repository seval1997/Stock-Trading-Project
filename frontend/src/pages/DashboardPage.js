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

  // Define a reusable style object outside return
const buttonStyle = {
  padding: "20px 40px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
};

  return (
  <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    {/* Pane 1 */}
    <div
      style={{
        flex: 1,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h2>Pane-1</h2>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          style={buttonStyle}
          onClick={() => console.log("Nifty50 clicked")}
        >
          Nifty50
        </button>
        <button
          style={buttonStyle}
          onClick={() => console.log("Nifty100 clicked")}
        >
          Nifty100
        </button>
        <button
          style={buttonStyle}
          onClick={() => console.log("Nifty150 clicked")}
        >
          Nifty150
        </button>
        <button
          style={buttonStyle}
          onClick={() => console.log("Nifty200 clicked")}
        >
          Nifty200
        </button>
        <button
          style={buttonStyle}
          onClick={() => console.log("Custom Index clicked")}
        >
          Custom Index
        </button>
      </div>
    </div>
    <div style={{ flex: 1, border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h2>Pane-2</h2>
    </div>
  </div>
);

}

export default DashboardPage;
