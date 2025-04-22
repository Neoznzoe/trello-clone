<template>
    <div class="new-card-form">
      <Textarea v-model="text" placeholder="Saisissez le titre de la carte..." />
      <select v-model="priority" class="new-card-priority">
        <option disabled value="">Choisissez une priorité</option>
        <option value="faible">Faible</option>
        <option value="moyenne">Moyenne</option>
        <option value="eleve">Élevée</option>
      </select>
      <div class="new-card-actions">
        <Button type="primary" @click="$emit('add')">Ajouter</Button>
        <Button type="cancel" @click="$emit('cancel')">Annuler</Button>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import Button from '../atoms/Button.vue';
  import Textarea from '../atoms/Textarea.vue';
  
  defineProps<{ text: string; priority: string }>();
  defineEmits(['add', 'cancel', 'update:text', 'update:priority']);
  </script>