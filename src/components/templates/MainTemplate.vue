<template>
    <div>
      <header>
        <h1>Hello Trello Clone 🚀</h1>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <!-- Contenu du pied de page éventuel -->
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  // Logique globale du template, si nécessaire
  </script>
  
  <style scoped>
  header {
    padding: 2rem;
    background: #f5f5f5;
  }
  main {
    padding: 1rem;
  }
  </style>
  