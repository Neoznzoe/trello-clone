<!-- src/App.vue -->
<template>
    <div id="app">
      <h1>Hello Trello Clone 🚀</h1>
      <Board />
    </div>
  </template>
  
  <script setup lang="ts">
  import Board from './components/Board.vue';
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100vh;
  }

  h1 {
    padding: 2rem;
    margin: 0;
  }
  </style>
  