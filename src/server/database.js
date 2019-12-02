var express = require('express');
var mysql = require('mysql');
var router = express.Router();


//Configure a connection to the database, including options
var connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "mysqlroot",
    /*---------DATABASE NOT YET CONFIGURED--------------
        USING PLACEHOLDER DATABASE
     */
   database: "mydb"
});

//Establish a connection to the database
connection.connect(function (error) {
    if(error){
        console.log("Error while connecting to database");
    } else {
        console.log("Server successfully connected to database");
    }
});

/*
--- CONFIGURE REST API ---

DEFINE CRUD (Create, Read, Update, Delete) -methods

BEST PRACTISES FOR API DESIGN:
https://oma.metropolia.fi/delegate/download_workspace_attachment/6768511/10%20REST%20API%20Design%20Best%20Practices.pdf


- URL: /api/notes
    -POST = CREATE NEW NOTE
    -GET = READ NOTES
    -PUT = UPDATE AN EXISTING NOTE
    -DELETE = DELETE AN EXISTING NOTE
- URL: /api/drawings
    -POST = CREATE A NEW DRAWING
    -GET = SHOW DRAWINGS
    -PUT = UPDATE AN EXISTING DRAWING --- IS THIS A FEATURE? ---
    -DELETE = DELETE AN EXISTING DRAWING
- URL: /api/user
    -POST = CREATE A NEW USER
    -GET = READ AND COMPARE LOGIN INFORMATION
    -PUT = CHANGE USERNAME OR PASSWORD
    -DELETE = DELETE USER INFORMATION

 */

// eslint-disable-next-line no-unused-vars
router.get("/api/",function (request,response) {
    response.send("Hello");
});

module.exports = router;