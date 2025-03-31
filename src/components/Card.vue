<template>
  <div class="card">
    {{ card.text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Card as CardInterface } from './Board.vue';

export default defineComponent({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<CardInterface>,
      required: true
    }
  }
});
</script>

<style scoped>
.card {
  background: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>