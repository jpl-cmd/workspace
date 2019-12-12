var express = require('express');
var mysql = require('mysql');
var router = express.Router();


//Configure a connection to the database, including options
var connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "mysqlroot",
   database: "projectdb"
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
--- REST API CONFIGURATION ---

DEFINE CRUD (Create, Read, Update, Delete) -methods

BEST PRACTISES FOR API DESIGN:
https://oma.metropolia.fi/delegate/download_workspace_attachment/6768511/10%20REST%20API%20Design%20Best%20Practices.pdf


- URL: /api/notes
    -POST = CREATE NEW NOTE
    -GET = READ NOTES
    -PUT = UPDATE AN EXISTING NOTE
    -DELETE = DELETE AN EXISTING NOTE
- URL: /api/user
    -POST = CREATE A NEW USER
    -GET = READ AND COMPARE LOGIN INFORMATION
    -PUT = CHANGE USERNAME OR PASSWORD
    -DELETE = DELETE USER INFORMATION

 */


// eslint-disable-next-line no-unused-vars
router.get("/api/notes",function (request,response) {
    //return all notes from database
    var sql = "SELECT notes.note_id,notes.title,notes.content, DATE_FORMAT(create_date,'%W %D %M %Y') create_date FROM notes ORDER BY notes.create_date";
    // eslint-disable-next-line no-unused-vars
    connection.query(sql,function (error,result,fields) {
        response.json(result);
    });
});

// eslint-disable-next-line no-unused-vars
router.post("/api/notes",function(request,response){
    //post a new note to the database
    var noteTitle = request.body.title;
    var noteContent = request.body.content;
    var dateCreated = request.body.dateCreated;
    var sql = "INSERT INTO notes (title,content,create_date) VALUES (?,?,?)";
    var inserts = [noteTitle,noteContent,dateCreated];
    var query = mysql.format(sql,inserts);
    console.log("Sending this query: " + query);
    // eslint-disable-next-line no-unused-vars
    connection.query(query,function (error,result) {
        response.send("OK");
    });
});

// eslint-disable-next-line no-unused-vars
router.put("/api/notes",function (request,response) {
    var noteID = request.body.note_id;
    var noteTitle = request.body.title;
    var noteContent = request.body.content;
    var dateCreated = request.body.dateCreated;
    var sql ="UPDATE notes SET title= ?, content= ?, create_date= ? WHERE notes.note_id = ?";
    var inserts = [noteTitle,noteContent,dateCreated,noteID];
    var query = mysql.format(sql,inserts);
    console.log("Sending this query: " + query);
    // eslint-disable-next-line no-unused-vars
    connection.query(query,function (error,result) {
        response.send("OK");
    });
});

// eslint-disable-next-line no-unused-vars
router.delete("/api/notes",function (request,response) {
    var noteID = request.body.note_id;
    console.log("Deleting note with an id of " + noteID);
    var sql = "DELETE FROM notes WHERE notes.note_id = ?";
    var query = mysql.format(sql,noteID);
    // eslint-disable-next-line no-unused-vars
    connection.query(query,function (error,result) {
        response.json(result);
    });
});

module.exports = router;