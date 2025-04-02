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
    // Met à jour une liste (modif de cartes ou du nom)
    updateList(updatedList: ListData) {
      const index = this.lists.findIndex((list) => list.id === updatedList.id);
      if (index !== -1) {
        this.lists[index] = updatedList;
      }
    },

    // Ajoute une carte à une liste spécifique
    addCardToList(listId: number, card: Card) {
      const list = this.lists.find((l) => l.id === listId);
      if (list) {
        list.cards.push(card);
      }
    },

    // Supprime une carte d'une liste spécifique
    deleteCardFromList(listId: number, cardId: number) {
      const list = this.lists.find((l) => l.id === listId);
      if (list) {
        list.cards = list.cards.filter((card) => card.id !== cardId);
      }
    },

    // Ajoute une nouvelle liste
    addList(name: string) {
      const newList: ListData = {
        id: Date.now(),
        name,
        cards: []
      };
      this.lists.push(newList);
    },
  }
});
