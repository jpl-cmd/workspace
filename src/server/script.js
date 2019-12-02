var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var database = require("./database");
var app = express();

app.use(cors());


app.use(function (request,response,next) {
    response.header("Access-Control-Allow-Origin","http://localhost:8080");
    response.header("Access-Control-Allow-Credentials",true);
    next();
});


app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.use(database);

var script = app.listen(8081,function () {
    var host = script.address().address;
    var port = script.address().port;
    console.log("Server running at http://" + host + ":" + port);
});
