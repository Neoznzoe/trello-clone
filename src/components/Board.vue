<template>
  <!-- Conteneur pleine page (facultatif, si vous avez déjà un #app en 100% par exemple) -->
  <div class="board-page">
    <!-- Conteneur qui gère la hauteur totale et l'overflow horizontal -->
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
  height: calc(100vh - 130px);
}

.board-page {
  /* Occupe tout l'espace vertical */
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.board {
  display: flex;
  gap: 1rem;
  padding: 1px 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 2rem;
  scroll-padding-right: 1rem;
  height: 100%;
}


.list {
  width: 272px;
  flex-shrink: 0;
  scroll-snap-align: start;
  height: fit-content;
}

</style>
