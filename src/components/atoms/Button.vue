<template>
    <button :class="customClass" @click="handleClick">
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    customClass: { type: String, default: '' }
  });
  const emit = defineEmits(['click']);
  const handleClick = () => emit('click');
  </script>
  
  <style scoped>
  button {
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    border-radius: 3px;
  }
  </style>
  