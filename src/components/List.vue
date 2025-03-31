<template>
  <div class="list">
    <h2 class="list-title">{{ list.name }}</h2>

    <draggable v-model="localCards" group="cards" @end="onDragEnd">
      <template #item="{ element }">
        <Card
          :card="element"
          @deleteCard="handleDeleteCard"
          @updateCard="handleUpdateCard"
        />
      </template>
    </draggable>

    <div v-if="!showNewCardForm" class="add-card-placeholder" @click="showNewCardForm = true">
      <img :src="plusIcon" alt="Add" class="add-icon" /> Ajouter une carte
    </div>

    <div v-else class="new-card-form">
      <textarea
        v-model="newCardText"
        placeholder="Saisissez le titre de la carte..."
        class="new-card-textarea"
      ></textarea>
      <div class="new-card-actions">
        <button class="confirm-btn" @click="addCard">Ajouter</button>
        <button class="cancel-btn" @click="cancelAddCard">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import Card from './Card.vue';
import type { ListData, Card as CardInterface } from '../store/boardStore';
import plusIcon from '../assets/plus.svg';

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
    // Copie locale des cartes pour le drag & drop
    const localCards = ref<CardInterface[]>([...props.list.cards]);
    watch(localCards, (newCards) => {
      emit('updateList', { ...props.list, cards: newCards });
    });

    // Gestion de l'ajout de carte
    const showNewCardForm = ref(false);
    const newCardText = ref('');

    // Fonction déclenchée lorsque l'utilisateur clique sur "Ajouter" dans le formulaire
    const addCard = () => {
      const text = newCardText.value.trim();
      if (text) {
        const newCard: CardInterface = {
          id: Date.now(),
          text
        };
        localCards.value.push(newCard);
      }
      newCardText.value = '';
      showNewCardForm.value = false;
    };

    // Fonction déclenchée lorsque l'utilisateur clique sur "Annuler"
    const cancelAddCard = () => {
      newCardText.value = '';
      showNewCardForm.value = false;
    };

    // Fonction déclenchée après un drag & drop
    const onDragEnd = () => {
      // Actions supplémentaires si nécessaire
    };

    const handleDeleteCard = (id: number) => {
      localCards.value = localCards.value.filter(card => card.id !== id);
    };

    const handleUpdateCard = (updatedCard: CardInterface) => {
      const index = localCards.value.findIndex(card => card.id === updatedCard.id);
      if (index !== -1) {
        localCards.value[index] = updatedCard;
      }
    };

    return {
      localCards,
      showNewCardForm,
      newCardText,
      addCard,
      cancelAddCard,
      onDragEnd,
      handleDeleteCard,
      handleUpdateCard,
      plusIcon
    };
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
  position: relative;
}

.list-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

/* Bouton + "Ajouter une carte" */
.add-card-placeholder {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: #666;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.add-card-placeholder:hover {
  background-color: #f5f5f5;
}
.add-icon {
  width: 1rem;
  height: 1rem;
}

.new-card-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.new-card-textarea {
  width: auto;
  padding: 0.5rem;
  resize: none;
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 10px;
  font-family: system-ui;
}

.new-card-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.confirm-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  cursor: pointer;
}
.confirm-btn:hover {
  background: #0056b3;
}

.cancel-btn {
  background: #999;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  cursor: pointer;
}
.cancel-btn:hover {
  background: #777;
}
</style>
