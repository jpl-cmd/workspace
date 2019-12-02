<template>
  <div class="main">
      <div id="navigationBar">
          <span id="showMenu" style="font-size:30px;cursor:pointer" @click="openNav">&#9776; Menu</span>
      </div>
      <div class="jumbotron text-center">
          <img alt="Vue logo" src="../assets/logo.png">
      </div>
    <h1>{{ mainTitle }}</h1>
      <div id="sideNav" class="sidenav">
          <span href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</span>
          <span @click="activateNoteScreen">Notes</span>
          <span @click="activateDrawScreen">Drawings</span>
          <span @click="activateAccountScreen">Account</span>
          <span @click="activateLogout">Logout</span>
      </div>
      <!--
      <div class="alert alert-success alert-dismissible fade show" role="alert">Welcome to Workspace!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      -->
      <drawing-panel v-if="mode ==='draw'"></drawing-panel>
      <note-panel v-if="mode === 'note'"></note-panel>
      <account-panel v-if="mode === 'account'"></account-panel>
  </div>
</template>

<script>

    import DrawingPanel from "@/components/DrawingPanel";
    import NotePanel from "@/components/NotePanel";
    import AccountPanel from "@/components/AccountPanel";

export default {
  name: 'home-screen',
  props: {

  },
    components:{
        DrawingPanel,
        NotePanel,
        AccountPanel
    },
  methods:{
          openNav() {
        document.getElementById("sideNav").style.width = "250px";
    },
        closeNav() {
        document.getElementById("sideNav").style.width = "0";
    },
        activateDrawScreen() {
            this.mode = "draw";
        },
        activateNoteScreen(){
            this.mode = "note";
        },
        activateAccountScreen(){
            this.mode = "account";
        },
        activateLogout(){
          this.mode = "logout";
          //Initiate logout procedure
        }

  },
    data(){
      return {
          mainTitle : "Workspace",
          mode : "home",
      }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav span {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #5EA1FF;
    display: block;
    transition: 0.2s;
    cursor : pointer;
}

.sidenav span:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}


#navigationBar{
    text-align: left;
    background-color: black;
    padding: 5px 20px 5px 20px;
}

#showMenu{
    color: #5EA1FF;
}

h1 {
    color: #5EA1FF;
    background-color: black;
}

.jumbotron {
    background-image: url("../assets/stars.jpg");
    background-size:cover;
    margin: 0;
}



@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
}
</style>
