<template>
    <div class="board-page">
      <div class="board-wrapper">
        <div class="board">
          <List
            v-for="list in lists"
            :key="list.id"
            :list="list"
            @updateList="updateList"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import List from '../molecules/List.vue';
  import { useBoardStore } from '../../store/boardStore';
  
  export default defineComponent({
    name: 'Board',
    components: { List },
    setup() {
      const boardStore = useBoardStore();
      return {
        lists: boardStore.lists,
        updateList: boardStore.updateList
      };
    }
  });
  </script>
  
  <style scoped>
  .board-wrapper {
    height: calc(100vh - 130px);
    overflow: hidden;
  }
  .board {
    display: flex;
    gap: 1rem;
    padding: 1px 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    height: 100%;
  }
  </style>
  