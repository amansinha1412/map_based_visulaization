import pandas as pd
from flask import Flask
from flask import render_template
from flask_script import Manager
import json

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def getData():  
    df = pd.read_csv("data2.csv");
    df = df[['latitude','longitude']]
    df_json = df.to_json()
    with open('data.json','w') as outfile:
    	json.dump(df_json,outfile)
    return df.to_json();

#manager = Manager(app)
#manager.run
if __name__=='__main__':
   app.run(use_reloader=True, debug=True)
