from flask import Flask, render_template, redirect, request, make_response
import psycopg2
import secrets
from datetime import timedelta
import time
app = Flask(__name__)
# I know these credentials are in the code, the server is only accessible to my internal network
connection = psycopg2.connect(
    database="ProtestGame", user="postgres", password="Yel1owRhin01545", host="127.0.0.1", port="5432"
)
db = connection.cursor()

@app.route("/")
def homemenu():
    return render_template("index.html")

@app.route("/tutorial")
def tutorial():
    return render_template("tutorial.html")

@app.route("/game")
def game():
    if (request.cookies.get("sessionID") == None):
        return redirect("/login")
    return render_template("game.html")

@app.route("/createacct", methods=['POST'])
def createaccount():
    db.execute("SELECT username FROM gamedata WHERE username='" + request.form["username"] + "';")
    if (db.fetchone() != None):
        return "Username taken"
    elif (db.fetchone() == None):
        db.execute("INSERT INTO gamedata VALUES ('" + request.form["username"] + "', '" + request.form["password"] + "',0,0);")
        connection.commit()
        return "User added successfully"

@app.route("/login", methods=['POST','GET'])
def login():
    if (request.method == "GET"):
        return render_template("login.html")
    elif (request.method == "POST"):
        db.execute("SELECT username,userpassword FROM gamedata WHERE username='" + request.form["loginusername"] + "';")
        dbresponse = db.fetchone()
        if (dbresponse == None):
            return "Username is incorrect"
        elif (dbresponse != None):
            if (request.form['loginpassword'] in dbresponse):
                response = make_response(redirect("/game"))
                sessionID = secrets.token_urlsafe(32)
                db.execute("SELECT userid FROM sessionid")
                while (sessionID in db.fetchall()):
                    sessionID = secrets.token_urlsafe(32)
                db.execute("INSERT INTO sessionid VALUES('" + sessionID + "');")
                connection.commit()
                response.set_cookie("sessionID",sessionID,max_age=timedelta(hours=1),samesite="Lax")
                return response
            return "Password is incorrect"
@app.route("/gameLog", methods=['POST','GET'])
def gameLog():
    if (request.method == 'GET'):
        db.execute("SELECT money,protesters from GameData WHERE userpassword='" + request.cookies.get("sessionID") + "';")
        return str(db.fetchone())
    elif (request.method == 'POST'):
        db.execute("UPDATE GameData SET money=" + request.form['money'] + ", ProtestSize = " + request.form['size'] + " WHERE username='" + request.form['username'] + "';")
        connection.commit()
    else:
        return "This page only accepts POST and GET requests"
if (__name__ == "__main__"):
    app.run(host="localhost",port=5000)
