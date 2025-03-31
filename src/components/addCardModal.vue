<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h3>Ajouter une nouvelle tâche</h3>
        <input type="text" v-model="cardText" placeholder="Nom de la tâche" />
        <div class="modal-actions">
          <button @click="confirm" :disabled="!cardText.trim()">Ajouter</button>
          <button @click="close">Annuler</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  
  const emits = defineEmits(['confirm', 'cancel']);
  const cardText = ref('');
  
  const confirm = () => {
    emits('confirm', cardText.value.trim());
    cardText.value = '';
  };
  
  const close = () => {
    emits('cancel');
    cardText.value = '';
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 1rem;
    border-radius: 5px;
    width: 300px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  </style>
  