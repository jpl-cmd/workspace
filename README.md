# Workspace-projekti

This project is created as a part of the Web-development course TX00CD82-3009 of Software Engineering Major at Metropolia University of Applied Sciences.


##Run server

```
nodemon script.js
```

##Run client

```
npm run serve
```

## Rest API

###URL: http://localHost:8081/api/notes

The project has only been executed locally so far, hence the correct url contains the "localHost" tag with the port that the application is deployed in.
This same URL is used across all methods.

###METHODS

CRUD (Create,Read,Update,Delete)-methods are defined as different http request methods for the API.
These methods are listed below as crud / http request method pairs.

Note object and its properties:
````
note:{
      note_id: '',
      title: '',
      content :'',
      dateCreated: '',
     }
````
Most methods (create,update and delete) use this note object as a tool to manipulate the database correctly, using the properties listed to identify the correct notes in the database. The read-method (http GET) does not need any parameters as it will always return all data from the notes-table.

####CREATE / POST

Use POST-method to send a note object (described above) to the server in json format and insert that object into the SQL-database.

Syntax
````
httpRequest.open('POST', url, true);
httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.send(JSON.stringify(this.note));
````
####READ / GET

Use GET-method to send a request to the server and retrieve all items in notes-table. The GET-methods needs no parameters and will return a collection of data in JSON-format. 

Syntax
````
httpRequest.open('GET', url, true);
httpRequest.send();
````
Example of a JSON response:
```
    [
        {
            "note_id": 3,
            "title": "Placeholder Title",
            "content": "Placeholder Main Text",
            "create_date": "Saturday 3rd August 2019"
        },
        {
            "note_id": 1,
            "title": "testi",
            "content": "muutettu",
            "create_date": "Thursday 12th December 2019"
        },
        {
            "note_id": 2,
            "title": "Placeholder Title",
            "content": "Muutettu",
            "create_date": "Thursday 12th December 2019"
        }
    ]
```

This data can then be assigned into an array variable using the JSON.parse()-method as follows:
```
//Array variable in a correct scope
var listOfNotes = [];
//Handling the server response by assigning the received JSON-data into the array
listOfNotes = JSON.parse(httpRequest.responseText);
```


####UPDATE / PUT

Use PUT-method to send a note object (described above) to the server to update an existing note in the database. The to-be updated note is uniquely identified by the 'note_id' property.

Syntax
````
httpRequest.open('PUT', url, true);
httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.send(JSON.stringify(this.cachedNote));
````
####DELETE / DELETE

Use DELETE-method to send a note object (described above) into the server. The database query uses the unique key 'note_id' to identify the correct note to be deleted.

Syntax
````
httpRequest.open('DELETE', url, true);
httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.send(JSON.stringify(note));
````
