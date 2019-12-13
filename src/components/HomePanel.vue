<template>
    <div id="homePanelMain">

     <div class="alert alert-success alert-dismissible fade show" role="alert">
         <p id="welcomeMessage">
             Welcome to Workspace!
         </p>
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
         </button>
     </div>

    </div>
</template>

<script>
    export default {
        name: "home-panel",
        data(){
            return{
                lastLoginDate: "(Placeholder)",
            }
        },
    }
</script>

<style scoped>
    #homePanelMain{
        text-align:center;
    }
    #welcomeMessage{
        margin:0;

    }
</style>