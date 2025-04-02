<template>
    <div class="checkbox" @click="toggle">
      <Icon
        :src="checked ? '../assets/check-circle-fill.svg' : '../assets/circle.svg'"
        :alt="checked ? 'Checked' : 'Unchecked'"
        customClass="checkbox-icon"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import Icon from './Icon.vue';
  const props = defineProps({
    checked: { type: Boolean, default: false }
  });
  const emit = defineEmits(['update:checked']);
  const toggle = () => emit('update:checked', !props.checked);
  </script>
  
  <style scoped>
  .checkbox {
    width: 1rem;
    cursor: pointer;
  }
  .checkbox-icon {
    width: 1rem;
    height: 1rem;
  }
  </style>
  