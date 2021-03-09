from flask import Flask, render_template, redirect, jsonify, request
import json
from run_model import *

#Creating an instance
app = Flask(__name__)

#app.config whatever our connection is

@app.route("/")
def index():
    return render_template("HomePage.html")

@app.route("/facebook_model/<symbol>")
def run_facebook_model(symbol):
    print(symbol)
    #change back to input
    stock_df = get_stock_data('JNJ')
    return run_facebook_prophet_model(stock_df)

@app.route("/arima_model/<symbol>")
def run_arima_model(symbol):
    print(symbol)
    stock_df2 = get_stock_data(symbol)
    return run_arima_model(stock_df2)


if __name__ == "__main__":
    app.run(debug=True)
