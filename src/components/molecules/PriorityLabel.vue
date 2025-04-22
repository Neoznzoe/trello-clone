<template>
    <span :class="priorityClass" class="priority-label">{{ label }}</span>
  </template>
  <script setup lang="ts">
  const props = defineProps<{ priority: string }>();
  const priorityClass = computed(() => {
    const p = props.priority.toLowerCase();
    return {
      'priority-faible': p === 'faible' || p === 'basse',
      'priority-moyenne': p === 'moyenne',
      'priority-eleve': p === 'eleve' || p === 'élevé' || p === 'élevée'
    };
  });
  const label = computed(() => props.priority.charAt(0).toUpperCase() + props.priority.slice(1));
  
import { computed } from 'vue';
</script>
  <style scoped>
  .priority-label { font-size: 0.75rem; padding: 0.2rem 0.4rem; border-radius: 3px; }
  .priority-faible { background-color: #d4edda; color: #155724; }
  .priority-moyenne { background-color: #fff3cd; color: #856404; }
  .priority-eleve { background-color: #f8d7da; color: #721c24; }
  </style>