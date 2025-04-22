<template>
    <input v-model="modelValue" :placeholder="placeholder" class="input" />
  </template>
  <script setup lang="ts">
  defineProps<{ modelValue: string; placeholder?: string }>();
  defineEmits(['update:modelValue']);
  </script>
  <style scoped>
  .input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 0.8rem;
  }
  </style>