<template>
    <div id="main">
        {{message}}
    </div>
</template>

<script>
    export default {
        name: "note-panel",
        data(){
          return{
              message : "Note panel activated",
          }
        },
    }
</script>

<style scoped>

</style>