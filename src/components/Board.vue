<template>
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
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import List from './List.vue';
import { useBoardStore } from '../store/boardStore';

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
  position: relative;
  overflow: hidden;
}

.board {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  min-height: 70vh;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 1rem;
  scroll-padding-right: 1rem;
}


.list {
  width: 272px;
  flex-shrink: 0;
  scroll-snap-align: start;
}

</style>
