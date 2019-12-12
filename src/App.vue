<template>
  <div id="app">
    <main-frame></main-frame>
  </div>
</template>

<script>
import MainFrame from "@/components/MainFrame.vue";

export default {
  name: 'app',
  components: {
    MainFrame,
  },
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
  #app .customButton{
    background-color: #5EA1FF;
    border:none;
    display:inline-block;
    border-radius:8px;
    padding: 5px 5px;
    width: 15rem;
    margin: 10px;
    color:black;
    font-weight: bold;
    box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
  }

  #app #colorButton{
    width: 5rem;
  }
  #app .customButton:hover{
    background-color: #416FB0;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
  }

</style>
