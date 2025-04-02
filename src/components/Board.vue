<template>
  <div class="board-page">
    <div class="board-wrapper">
      <div class="add-list">
        <div v-if="!showNewListForm" @click="showNewListForm = true" class="add-list-placeholder">
          <button><i class="add-icon"></i> Ajouter une liste</button>
        </div>
        <div v-else class="new-list-form">
          <input
            v-model="newListName"
            type="text"
            placeholder="Titre de la liste"
            class="new-list-input"
          />
          <div class="new-list-actions">
            <button @click="addList" class="confirm-btn">Ajouter</button>
            <a class="cancel-x" @click="cancelAddList"><img src="../assets/x.svg"/></a>
          </div>
        </div>
        </div>
        
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
import { defineComponent, ref } from 'vue';
import List from './List.vue';
import { useBoardStore } from '../store/boardStore';

export default defineComponent({
  name: 'Board',
  components: { List },
  setup() {
    const boardStore = useBoardStore();

    const showNewListForm = ref(false);
    const newListName = ref('');

    const addList = () => {
      const name = newListName.value.trim();
      if (name) {
        boardStore.addList(name);
        newListName.value = '';
        showNewListForm.value = false;
      }
    };

    const cancelAddList = () => {
      newListName.value = '';
      showNewListForm.value = false;
    };

    return {
      lists: boardStore.lists,
      updateList: boardStore.updateList,
      showNewListForm,
      newListName,
      addList,
      cancelAddList
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

.add-list {
  width: 272px;
  flex-shrink: 0;
  scroll-snap-align: start;
  padding: 0 2rem;
}

.add-list-placeholder {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  cursor: pointer;
  border-radius: 5px;
}

.add-list button {
  background: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 6px 18px;
  font-size: 1rem;
  cursor: pointer;
}

.new-list-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 5px;
}

.new-list-input {
  padding: 0.5rem;
  resize: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.8rem;
  font-family: sans-serif;
}

.new-list-actions {
  display: flex;
  gap: 0.5rem;
}

.confirm-btn,
.cancel-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: white;
}

.confirm-btn {
  background-color: #007bff;
  animation: background-color 0.3s ease-in;
}

.confirm-btn:hover {
  background-color: #006CE0;
}

.cancel-btn {
  background-color: #999;
}

.cancel-x {
  cursor: pointer;
  display: flex;
  width: 100%;
}

.cancel-x img {
  animation: background-color 0.3s ease-in;
}

.cancel-x img:hover {
  background-color: #EBEBEB;
  border-radius: 5px;
}
</style>
