<template>
    <textarea v-model="modelValue" :placeholder="placeholder" class="textarea" />
  </template>
  <script setup lang="ts">
  defineProps<{ modelValue: string; placeholder?: string }>();
  defineEmits(['update:modelValue']);
  </script>
  <style scoped>
  .textarea {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: none;
    font-size: 0.8rem;
    font-family: inherit;
  }
  </style>