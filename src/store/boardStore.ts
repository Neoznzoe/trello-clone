import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => ({
    lists: [
      { id: 1, name: 'À faire', cards: [{ id: 1, text: 'Tâche 1' }] },
      { id: 2, name: 'En cours', cards: [{ id: 2, text: 'Tâche 2' }] }
    ]
  }),
  actions: {
    updateList(updatedList: any) {
      const index = this.lists.findIndex((list: any) => list.id === updatedList.id);
      if (index !== -1) {
        this.lists[index] = updatedList;
      }
    },
    addCardToList(listId: number, card: any) {
      const list = this.lists.find((l: any) => l.id === listId);
      if (list) {
        list.cards.push(card);
      }
    }
  }
});
