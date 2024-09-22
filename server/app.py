from flask import Flask           # import flask
app = Flask(__name__)             # create an app instance
from propelauth_flask import init_auth

auth = init_auth(
    "https://369213104.propelauthtest.com",
    "79dc182195a9aef882029e018f48f5fe41a6cf1f4cd7244ca8576df072a4db13b52d5ce6150d0c985e573f7f57ac587c",
)      

@app.route("/")                   
def hello():                      
    return "Hello World!"         
    