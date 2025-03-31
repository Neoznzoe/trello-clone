<template>
  <div class="list">
    <h2 class="list-title">{{ list.name }}</h2>
    <!-- Utilisation de draggable pour gérer le drag & drop -->
    <draggable v-model="localCards" group="cards" @end="onDragEnd">
      <template #item="{ element }">
        <Card :card="element" />
      </template>
    </draggable>
    <!-- Bouton pour ajouter une nouvelle carte -->
    <button class="add-card-btn" @click="addCard">Ajouter une carte</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import Card from './Card.vue';
import type { ListData, Card as CardInterface } from '../store/boardStore';

export default defineComponent({
  name: 'List',
  components: { Card, draggable },
  props: {
    list: {
      type: Object as PropType<ListData>,
      required: true
    }
  },
  emits: ['updateList'],
  setup(props, { emit }) {
    const localCards = ref<CardInterface[]>([...props.list.cards]);

    watch(localCards, (newCards) => {
      emit('updateList', { ...props.list, cards: newCards });
    });

    // Modification de la fonction d'ajout de carte pour demander un nom
    const addCard = () => {
      const cardName = window.prompt('Veuillez saisir le nom de la nouvelle tâche :');
      if (cardName && cardName.trim() !== '') {
        const newCard: CardInterface = {
          id: Date.now(), // Utilisation d'un timestamp pour un ID unique
          text: cardName.trim()
        };
        localCards.value.push(newCard);
      }
    };

    const onDragEnd = () => {
      // Actions supplémentaires après un drag & drop (si besoin)
    };

    return { localCards, addCard, onDragEnd };
  }
});
</script>

<style scoped>
.list {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  width: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.list-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.add-card-btn {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.add-card-btn:hover {
  background: #0056b3;
}
</style>
