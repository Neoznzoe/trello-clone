<template>
  <div class="board">
    <List
      v-for="list in lists"
      :key="list.id"
      :list="list"
      @updateList="updateList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import List from './List.vue';
import { useBoardStore } from '../store/boardStore'; // Chemin vers votre store

export default defineComponent({
  name: 'Board',
  components: { List },
  setup() {
    const boardStore = useBoardStore();
    // Les données et actions proviennent directement du store
    return {
      lists: boardStore.lists,
      updateList: boardStore.updateList
    };
  }
});
</script>

<style scoped>
.board {
  display: flex;
  gap: 1rem;
}
</style>
