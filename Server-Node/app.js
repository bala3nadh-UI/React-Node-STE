// Include Express
var express = require('express');

// Create a new Express application
var app = express();
var fs = require("fs");
let bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json({
  limit: '10mb'
})); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
})); // support encoded bodies

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-sid, station, console, Content-Type, Accept");
    if (req.method == 'OPTIONS')
        return res.status(200).end();
    else
        next();
});

app.post('/login', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    var foundValidUser = false;
    obj.forEach((elem) => {
        if(elem.email == req.body.email && elem.password == req.body.password){
            foundValidUser = true;
            const JWTToken = jwt.sign({
                email: req.body.email,
                password: req.body.password
            },
            'secret',
            {
                expiresIn: '2h'
            });
            return res.status(200).json({
                success: 'JWT Auth success',
                username: elem.username,
                zip: elem.zip,
                email: elem.email,
                token: JWTToken
            });
        }
    });
    if (!foundValidUser) {
        return res.status(401).json({
            success: 'User is not Authorised',
            token: undefined
        });    
    }
});

// Bind to a port
app.listen(3100);
console.log('App runs at 3100');

