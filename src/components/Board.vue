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
import { defineComponent, ref } from 'vue';
import List from './List.vue';

export interface Card {
  id: number;
  text: string;
}

export interface ListData {
  id: number;
  name: string;
  cards: Card[];
}

export default defineComponent({
  name: 'Board',
  components: { List },
  setup() {
    // Exemple de données initiales
    const lists = ref<ListData[]>([
      {
        id: 1,
        name: 'À faire',
        cards: [
          { id: 1, text: 'Tâche 1' },
          { id: 2, text: 'Tâche 2' }
        ]
      },
      {
        id: 2,
        name: 'En cours',
        cards: [{ id: 3, text: 'Tâche 3' }]
      }
    ]);

    // Fonction pour mettre à jour une liste lorsqu'une modification est effectuée
    const updateList = (updatedList: ListData) => {
      const index = lists.value.findIndex((list: { id: number; }) => list.id === updatedList.id);
      if (index !== -1) {
        lists.value[index] = updatedList;
      }
    };

    return { lists, updateList };
  }
});
</script>

<style scoped>
.board {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f0f0f0;
  min-height: 100vh;
  overflow-x: auto;
}
</style>
