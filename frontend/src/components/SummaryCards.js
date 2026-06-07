import React from "react";
import "./SummaryCards.css";

const styles = {
  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    height: "180px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  title: {
    margin: "0 0 10px 0",
    fontWeight: "bold",
    fontSize: "18px",
  },
  columns: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
};

export default function SummaryCards() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div className="card">
        <div style={styles.card}>
      <h3 style={styles.title}>Nifty50</h3>
      <div style={styles.columns}>
        {/* First Column */}
        <div style={styles.column}>
          <p>High: 22,345</p>
          <p>Low: 21,876</p>
          <p>Open: 22,100</p>
          <p>Volume: 1.2M</p>
        </div>

        {/* Second Column */}
        <div style={styles.column}>
          <p>Close: 22,050</p>
          <p>
            Trend:{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              ↑ Up
            </span>
            {/* For downtrend, use ↓ Down with red color */}
          </p>
        </div>
        </div>
        </div>
      </div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
      <div className="card">Card 4</div>
    </div>
  );
}
