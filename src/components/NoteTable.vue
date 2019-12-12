<template>
        <div id="note-table">
            <p v-if="noteList.length < 1" id="emptyListMessage">
                No notes
            </p>
            <div v-else>
                <p id="resultMessage">You have {{noteList.length}} saved {{checker}}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="note in noteList" :key="note.id">
                        <td>{{note.title}}</td>
                        <td>{{note.content}}</td>
                        <td>{{note.create_date}}</td>
                        <button id="editButton" @click="$emit('edit:note',note)">&#128394;</button>
                        <button id="deleteButton" @click="$emit('delete:note',note)">&#10006;</button>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>
    export default {
        name: "note-table",
        props:{
          noteList:Array,
        },
        computed: {
            checker: function () {
                if (this.noteList.length === 1) return "note";
                return "notes";
            },
        },
    }
</script>

<style scoped>

    #note-table{
        text-align : center;
        border: 1px solid black;
        padding:1rem;
        margin: 1rem;
    }

    #resultMessage{
        text-align: left;
        font-weight: bold;
    }

    #emptyListMessage{
        font-weight: bold;
        color:black;
        border-radius: 10px;
        background-color: #5EA1FF;
        display:block;
    }

    #editButton{
        width: 3rem;
        background-color: #5EA1FF;
        border:none;
        display:inline-block;
        border-radius:8px;
        padding: 5px 5px;
        margin: 10px;
        color:black;
        font-weight: bold;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
    }
    #editButton:hover{
        background-color: #416FB0;
        color: white;
        transition: all 0.3s;
    }
    #deleteButton{
        background-color: #5EA1FF;
        border:none;
        display:inline-block;
        border-radius:8px;
        padding: 5px 5px;
        width: 3rem;
        margin: 10px;
        color:black;
        font-weight: bold;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
    }
    #deleteButton:hover{
        background-color: #416FB0;
        color: white;
        transition: all 0.3s;
    }

    thead{
        background-color: #5EA1FF;
    }
    table{
        width:100%;
    }
    td{
        border: 1px solid black;
    }
    th{
        border: 1px solid black;
    }
</style>