import tkinter as tk
from tkinter import ttk
import certifi
import pandas as pd
import requests
from io import StringIO

def main():
    # Fetch NSE symbols dynamically

    url = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, verify=certifi.where(), timeout=20)

    # Convert to DataFrame
    data = StringIO(response.text)
    df = pd.read_csv(data)

    # Extract symbols
    symbols = df["SYMBOL"].dropna().tolist()

    print("Total symbols:", len(symbols))
    print("First 10 symbols:", symbols[:10])
    # Check if request succeeded
    print(df["SYMBOL"])  # Print first 10 symbols for

    # Extract SYMBOL column
    symbols = df["SYMBOL"].dropna().tolist()

    def search_symbol():
        symbol = symbol_dropdown.get()
        period = period_dropdown.get()
        interval = interval_dropdown.get()
        result_table.delete(*result_table.get_children())
        result_table.insert("", "end", values=(symbol, period, interval, "Sample Data"))

    root = tk.Tk()
    root.title("Stock Exchange UI")
    root.geometry("800x500")

    # Panel 1
    panel1 = ttk.LabelFrame(root, text="Indian Stock Exchange")
    panel1.pack(fill="x", padx=10, pady=5)
    exchange_label = tk.Label(panel1, text="Exchange: NSE/BSE")
    exchange_label.pack(padx=5, pady=5)

    # Panel 2
    panel2 = ttk.LabelFrame(root, text="Search Options")
    panel2.pack(fill="x", padx=10, pady=5)

    symbol_label = tk.Label(panel2, text="Symbol:")
    symbol_label.grid(row=0, column=0, padx=5, pady=5)
    symbol_dropdown = ttk.Combobox(panel2, values=symbols)
    symbol_dropdown.grid(row=0, column=1, padx=5, pady=5)

    period_label = tk.Label(panel2, text="Period:")
    period_label.grid(row=1, column=0, padx=5, pady=5)
    period_dropdown = ttk.Combobox(panel2, values=["1d", "5d", "1mo", "3mo", "6mo", "1y"])
    period_dropdown.grid(row=1, column=1, padx=5, pady=5)

    interval_label = tk.Label(panel2, text="Interval:")
    interval_label.grid(row=2, column=0, padx=5, pady=5)
    interval_dropdown = ttk.Combobox(panel2, values=["1m", "5m", "15m", "30m", "1h", "1d"])
    interval_dropdown.grid(row=2, column=1, padx=5, pady=5)

    search_button = tk.Button(panel2, text="Search", command=search_symbol)
    search_button.grid(row=3, column=0, columnspan=2, pady=10)

    # Panel 3
    panel3 = ttk.LabelFrame(root, text="Results")
    panel3.pack(fill="both", expand=True, padx=10, pady=5)

    columns = ("Symbol", "Period", "Interval", "Data")
    result_table = ttk.Treeview(panel3, columns=columns, show="headings")
    for col in columns:
        result_table.heading(col, text=col)
        result_table.column(col, width=150)
    result_table.pack(fill="both", expand=True)

    root.mainloop()


if __name__ == "__main__":
    print("Starting Stock Exchange UI...")
    main()