<!-- src/App.vue -->
<template>
    <div id="app">
      <h1>Hello Trello Clone 🚀</h1>
      <!-- On affiche le Board juste en dessous du titre -->
      <Board />
    </div>
  </template>
  
  <script setup lang="ts">
  import Board from './components/Board.vue';
  </script>
  
  <style scoped>
  #app {
    padding: 2rem;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  </style>
  