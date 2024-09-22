from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NESSIE_BASE_URL = "http://api.nessieisreal.com"
API_KEY = "09596467fbd10624fb1b890788dd3024"

@app.route('/')
def index():
    return "Flask app is running!"

@app.route('/customers')
def get_customers():
    url = f"{NESSIE_BASE_URL}/customers?key={API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        customers = response.json()
        return jsonify(customers)
    else:
        return jsonify({'error': 'Failed to fetch customers'}), response.status_code
    
@app.route('/accounts')
def get_accounts():
    url = f"{NESSIE_BASE_URL}/accounts?key={API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        accounts = response.json()
        return jsonify(accounts)
    else:
        return jsonify({'error': 'Failed to fetch accounts'}), response.status_code
        
@app.route('/create_customer', methods=['POST'])
def create_customer():
    # Extract customer data from the incoming POST request
    customer_data = request.json
    # print(customer_data) 

    # API endpoint for creating a customer
    url = f"{NESSIE_BASE_URL}/customers?key={API_KEY}"

    # Make the POST request to Nessie API
    response = requests.post(url, json=customer_data)

    # Check if the request was successful
    if response.status_code == 201:
        return jsonify({"message": "Customer created successfully", "data": response.json()}), 201
    else:
        return jsonify({"error": "Failed to create customer", "details": response.json()}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/create_account/<customer_id>', methods=['POST'])
def create_account(customer_id):

    # Extract account data from the incoming POST request
    customer_data = request.json

    # API endpoint for creating an account
    url = f"{NESSIE_BASE_URL}/customers/{customer_id}/accounts?key={API_KEY}"

    # Make the POST request to Nessie API
    response = requests.post(url, json=customer_data)

    # Check if the request was successful
    if response.status_code == 201:
        return jsonify({"message": "Account created successfully", "data": response.json()}), 201
    else:
        return jsonify({"error": "Failed to create account", "details": response.json()}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/transfer_money/<sender_id>', methods=['POST'])
def transfer_money(sender_id):

    transaction_data = request.json

    url = f"{NESSIE_BASE_URL}/accounts/{sender_id}/transfers?key={API_KEY}"

    response = requests.post(url, json=transaction_data)

    if response.status_code == 201:
        return jsonify({"message": "Money transferred successfully", "data": response.json()}), 201
    else:
        return jsonify({"error": "Failed to create transaction", "details": response.json()}), response.status_code
           
           

