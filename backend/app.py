from flask import Flask
from flask_cors import CORS
from src.stocks.dataFetch import fetch_nse_symbols, get_stock_data_by_symbol, nifty50_dashboard_card, nifty50_detailed_view
from src.users.signup import signup
from src.users.login import login

app = Flask(__name__)
CORS(app)

app.add_url_rule("/api/stocks/nse-symbols", view_func=fetch_nse_symbols) 
app.add_url_rule("/api/stocks/get_stock_data_by_symbol", view_func=get_stock_data_by_symbol)
app.add_url_rule("/api/stocks/nifty50_dashboard_card", view_func=nifty50_dashboard_card)
app.add_url_rule("/api/stocks/nifty50_detailed_view", view_func=nifty50_detailed_view)
app.add_url_rule("/api/users/signup", view_func=signup, methods=["POST"])
app.add_url_rule("/api/users/login", view_func=login, methods=["POST"])

if __name__ == "__main__":
    app.run(debug=True)