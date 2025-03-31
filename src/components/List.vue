<template>
  <div class="list">
    <h2 class="list-title">{{ list.name }}</h2>
    <!-- Utilisation de draggable pour gérer le drag and drop -->
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
import Card from './Card.vue';
import type { ListData, Card as CardInterface } from './Board.vue';

export default defineComponent({
  name: 'List',
  components: { Card },
  props: {
    list: {
      type: Object as PropType<ListData>,
      required: true
    }
  },
  emits: ['updateList'],
  setup(props, { emit }) {
    // Copie locale des cartes pour faciliter les interactions (ex. drag & drop)
    const localCards = ref<CardInterface[]>([...props.list.cards]);

    // Surveiller les changements et notifier le composant parent
    watch(localCards, (newCards) => {
      emit('updateList', { ...props.list, cards: newCards });
    });

    // Fonction pour ajouter une nouvelle carte à la liste
    const addCard = () => {
      const newCard: CardInterface = {
        id: Date.now(), // Utilisation du timestamp comme identifiant unique
        text: 'Nouvelle carte'
      };
      localCards.value.push(newCard);
    };

    // Fonction déclenchée après un drag & drop
    const onDragEnd = () => {
      // Vous pouvez ajouter ici des actions supplémentaires (ex. sauvegarde de l'ordre)
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
