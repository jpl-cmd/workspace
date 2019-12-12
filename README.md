# Workspace-projekti

This project is created as a part of the Web-development course TX00CD82-3009 of Software Engineering Major at Metropolia University of Applied Sciences.

## Rest-API

###Run server
```
node script.js
```

###Run client
```
npm run serve
```

### API Calls

####URL: http://localHost:8081/api/notes
The project has only been executed locally so far, hence the correct url contains the localHost tag with the port that the application is deployed in.

####METHODS
CRUD (Create,Read,Update,Delete)-methods are defined as different http request methods for the API.
These methods are listed below as crud / http request method pairs.

#####CREATE / POST
-Use POST-method to send a note object to the server in json format and insert that object into the SQL-database.
#####READ / GET
-Use GET-method to send a request to the server and retrieve all items in notes-table.
#####UPDATE / PUT
-Use PUT-method to send an note object with an existing entry into the database. The note is uniquely identified by the 'note_id' property.
#####DELETE / DELETE
-Use DELETE-method to send an object into the server. The database query uses the unique key 'note_id' to identify the correct note to be deleted.

