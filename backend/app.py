from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))
columns = pickle.load(open("columns.pkl", "rb"))

@app.route("/")
def home():
    return "Car Price Prediction API is running"
@app.route("/options", methods=["GET"])
def options():
    return jsonify({
        "Company": ["BMW", "Toyota", "Ford", "Chevrolet"],
        "Transmission": ["Auto", "Manual"],
        "Body Style": ["SUV", "Sedan", "Hatchback"],
        "Dealer_Region": ["Austin", "Middletown", "Scottsdale"]
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    df = pd.get_dummies(df)
    df = df.reindex(columns=columns, fill_value=0)
    price = model.predict(df)[0]
    return jsonify({"predicted_price": round(price, 2)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

