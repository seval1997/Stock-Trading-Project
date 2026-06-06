import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState([
    { symbol: "TCS", price: 3450 },
    { symbol: "INFY", price: 1520 },
    { symbol: "HDFCBANK", price: 1650 }
  ]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/hello")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + Flask Dashboard</h1>
      <p>{message}</p>

      {/* Table */}
      <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.symbol}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
