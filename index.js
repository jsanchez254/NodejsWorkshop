const express = require('express');
const app = express();
const path = require ("path");

//IMPORT DATABASE STUFF
var sqlite3 = require('sqlite3').verbose();
var db  = new sqlite3.Database("test.db");

app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);


//ROUTES
app.get('/', (req, res) =>{
    res.render("homePage.html", {COOL: "<h1>COOL BEANS BOIII</h1>"});
});

app.get('/animals', (req,res) =>{
    res.render("animals.html");
});

app.get('/facts' , (req, res) =>{
    res.render("animalFacts.html");
});

//CREATE DATABASE INFO
app.get('/createTable', (req, res) => {
    query = " CREATE TABLE ANIMALS(\
        id INTEGER PRIMARY KEY,\
        name varchar(50),\
        sciName varchar(60),\
        facts varchar(1000));"
    db.run(query);
});

//CREATE SOME INFO  
app.get('/createRepeatedInfo', (req, res) =>{
    query = "INSERT INTO ANIMALS(name, sciName, facts)\
    VALUES ('Hedgehog', 'Erinaceinae' , 'A hedgehog is any of the spiny mammals of the subfamily Erinaceinae, in the eulipotyphlan family Erinaceidae. There are seventeen species of hedgehog in five genera found through parts of Europe, Asia, and Africa, and in New Zealand by introduction.' )"
    db.run(query);
    res.send("HEDHOG CREATED");
});

//DELETE IT ALL
app.get("/deleteRepeatedInfo", (req, res) =>{
    query = "DELETE FROM ANIMALS WHERE name = 'Hedgehog'";
    db.run(query);
    res.send("ALL DEATH NOW");
});

app.listen(3000, () => console.log("COOL 3000 PORT!!"))

