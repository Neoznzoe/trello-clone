<template>
    <div class="new-list-form">
      <Input v-model="modelValue" placeholder="Titre de la liste" />
      <div class="new-list-actions">
        <Button type="primary" @click="$emit('add')">Ajouter</Button>
        <Icon src="../assets/x.svg" alt="Annuler" @click="$emit('cancel')" />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import Button from '../atoms/Button.vue';
  import Input from '../atoms/Input.vue';
  import Icon from '../atoms/Icon.vue';
  
  defineProps<{ modelValue: string }>();
  defineEmits(['add', 'cancel', 'update:modelValue']);
  </script>