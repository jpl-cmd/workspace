<template>
    <div id="main">
        <div>
            {{message}}
            <div id="buttonGrid">
                <button @click="draw">New</button>
                <button @click="loadGallery">Gallery</button>
            </div>
        </div>
        <div id="drawPanel" v-if="drawMode">
            <canvas id="canvas">

            </canvas>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drawing-panel",
        data(){
          return {
              message : "Drawing panel activated",
              drawMode : false,
          }
        },
        methods:{
            draw(){
                this.drawMode = true;
            },
            loadGallery(){
                this.drawMode = false;
                //Load objects
            },
        }

    }
</script>

<style scoped>

    #main{
        text-align:center;
    }

    #canvas{
        border:4px solid black;
        width: 60%;
        height: 20%;
    }

</style>