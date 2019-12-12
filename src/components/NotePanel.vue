<template>
    <div id="main">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <p id="welcomeMessage">
                {{message}}
            </p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="note-form">
            <div v-if="editMode">
                <h1>Editing Note</h1>
                <h3>Title</h3>
                <input type="text" v-model="cachedNote.title">
                <h3>Content</h3>
                <textarea type="text" v-model="cachedNote.content"/>
            </div>
            <div v-else>
                <h1>Add Note</h1>
                <h3>Title</h3>
                <input type="text" v-model="note.title" placeholder="Insert a clever title...">
                <h3>Content</h3>
                <textarea type="text" v-model="note.content" placeholder="...and some memorable content"/>
            </div>
            <div v-if="editMode">
                <button class="customButton" @click="saveEdit">Save</button>
                <button class="customButton" @click="cancelEdit">Cancel</button>
            </div>
            <div v-else>
                <button class="customButton" @click="addNote">Add</button>
                <button class="customButton" @click="emptyFields">Cancel</button>
            </div>

        </div>
        <note-table v-bind:note-list="noteList" @delete:note="deleteNote" @edit:note="editNote"></note-table>
    </div>
</template>

<script>
    import NoteTable from "@/components/NoteTable";
    export default {
        name: "note-panel",
        data(){
          return{
              message : "Here you can add new notes and edit or delete existing ones",
              noteList:[],
              note:{
                  note_id: '',
                  title: '',
                  content :'',
                  dateCreated: '',
              },
              parameters: {
                  title:'',
                  content: '',
              },
              editMode: false,
              cachedNote: null,
          }
        },
        components:{
            NoteTable,
        },
        methods: {
            emptyFields() {
                this.note.title = '';
                this.note.content = '';
            },
            addNote() {
                if (this.note.title === '' || this.note.content === '') alert("Please add a title and some text");
                else {
                    var that = this;
                    var newDate = new Date();
                    var day = String(newDate.getDate()).padStart(2, '0');
                    var month = String(newDate.getMonth() + 1).padStart(2, '0');
                    var year = newDate.getFullYear();
                    this.note.dateCreated = year + "-" + month + "-" + day;

                    var httpRequest = new XMLHttpRequest();
                    var url = "http://localHost:8081/api/notes";
                    //httpRequest.withCredentials = true;
                    httpRequest.onreadystatechange = function () {
                        callback(httpRequest);
                    };
                    httpRequest.open('POST', url, true);
                    httpRequest.setRequestHeader('Content-Type', 'application/json');
                    httpRequest.send(JSON.stringify(this.note));
                }

                function callback(httpRequest) {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            console.log("callback");
                            that.getNotes();
                            that.emptyFields();
                        }
                    }
                }
            },
            getNotes() {
                var that = this;
                var httpRequest = new XMLHttpRequest();
                var url = "http://localHost:8081/api/notes";
                httpRequest.withCredentials = true;
                httpRequest.onreadystatechange = function () {
                    callback(httpRequest);
                };
                httpRequest.open('GET', url, true);
                httpRequest.send();

                function callback(httpRequest) {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            console.log("Get notes completed");
                            that.noteList = JSON.parse(httpRequest.responseText);
                        }
                    }
                }
            },

            deleteNote(note) {
                console.log("The to-be deleted note has the following information " + JSON.stringify(note));
                var that = this;
                var httpRequest = new XMLHttpRequest();
                var url = "http://localHost:8081/api/notes";
                //httpRequest.withCredentials = true;
                httpRequest.onreadystatechange = function () {
                    callback(httpRequest);
                };
                httpRequest.open('DELETE', url, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send(JSON.stringify(note));

                function callback(httpRequest) {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            console.log("callback");
                            that.getNotes();
                        }
                    }
                }
            },
            editNote(note) {
                //Change form
                this.editMode = true;
                //Copy note into another variable
                this.cachedNote = note;

            },
            saveEdit(){
                var that = this;
                var newDate = new Date();
                var day = String(newDate.getDate()).padStart(2, '0');
                var month = String(newDate.getMonth() + 1).padStart(2, '0');
                var year = newDate.getFullYear();
                this.cachedNote.dateCreated = year + "-" + month + "-" + day;

                var httpRequest = new XMLHttpRequest();
                var url = "http://localHost:8081/api/notes";
                //httpRequest.withCredentials = true;
                httpRequest.onreadystatechange = function () {
                    callback(httpRequest);
                };
                httpRequest.open('PUT', url, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send(JSON.stringify(this.cachedNote));

                function callback(httpRequest) {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        console.log("callback");
                        that.cachedNote = null;
                        that.editMode = false;
                        that.getNotes();

                    }
                    }
                }
            },
            cancelEdit() {
                this.editMode = false;
                this.cachedNote = null;
                this.emptyFields();
            },

        },
        mounted(){
            this.getNotes();
        },
    }
</script>

<style scoped>
    #note-form{
        text-align:left;
        border: 1px solid black;
        padding: 1rem;
        margin: 1rem;
    }

    input{
        border-radius:5px;
        width:50%;
        display:block;
    }
    textarea{
        border-radius: 5px;
        width: 50%;
        height: 7rem;
        display:block;
    }





</style>