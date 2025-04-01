import { defineStore } from 'pinia';

export interface Card {
  id: number;
  text: string;
  priority?: string;
  checked?: boolean;
}

export interface ListData {
  id: number;
  name: string;
  cards: Card[];
}

export const useBoardStore = defineStore('board', {
  state: (): { lists: ListData[] } => ({
    lists: [
      { id: 1, name: 'À faire', cards: [] },
      { id: 2, name: 'En cours', cards: [] },
      { id: 3, name: "Ah gars la c'est chaud", cards: [] },
      { id: 4, name: "T'es mort", cards: [] },
      { id: 5, name: "Finis ? c'est pas trop tôt", cards: [] }
    ]
  }),
  actions: {
    updateList(updatedList: ListData) {
      const index = this.lists.findIndex((list: ListData) => list.id === updatedList.id);
      if (index !== -1) {
        this.lists[index] = updatedList;
      }
    },
    addCardToList(listId: number, card: Card) {
      const list = this.lists.find((l: ListData) => l.id === listId);
      if (list) {
        list.cards.push(card);
      }
    }
  }
});
