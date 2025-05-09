<template>
  <div class="list">
    <h2 class="list-title">{{ list.name }}</h2>

    <!-- Affichage des cartes avec drag & drop -->
    <draggable
      v-model="localCards"
      group="cards"
      @end="onDragEnd"
      ghost-class="drag-ghost"
      chosen-class="drag-chosen"
      animation="200"
    >
      <!-- Affichage des cartes -->
      <template #item="{ element }">
        <Card
          :card="element"
          @updateCard="handleUpdateCard"
          @deleteCard="handleDeleteCard"
        />
      </template>

      <!-- Placeholder affiché dans la liste lors du déplacement -->
      <template #placeholder>
        <div class="placeholder-card"></div>
      </template>

      <!-- Optionnel : clone personnalisé lors du drag -->
      <template #clone="{ element }">
        <div class="my-drag-clone">
          {{ element.text }}
        </div>
      </template>
    </draggable>

    <!-- Bouton d'ajout de carte inline -->
    <div v-if="!showNewCardForm" class="add-card-placeholder" @click="showNewCardForm = true">
      <img :src="plusIcon" alt="Add" class="add-icon" /> Ajouter une carte
    </div>

    <!-- Formulaire d'ajout -->
    <div v-else class="new-card-form">
      <textarea
        v-model="newCardText"
        placeholder="Saisissez le titre de la carte..."
        class="new-card-textarea">
      </textarea>

      <!-- Champ pour choisir la priorité -->
      <select v-model="newCardPriority" class="new-card-priority">
        <option disabled value="">Choisissez une priorité</option>
        <option value="faible">Faible</option>
        <option value="moyenne">Moyenne</option>
        <option value="eleve">Élevée</option>
      </select>

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
    // Copie locale des cartes pour gérer le drag & drop
    const localCards = ref<CardInterface[]>([...props.list.cards]);
    watch(localCards, (newCards) => {
      emit('updateList', { ...props.list, cards: newCards });
    });

    // Gestion du formulaire d'ajout de carte
    const showNewCardForm = ref(false);
    const newCardText = ref('');
    const newCardPriority = ref('');

    const addCard = () => {
      const text = newCardText.value.trim();
      if (text && newCardPriority.value) {
        const newCard: CardInterface = {
          id: Date.now(),
          text,
          priority: newCardPriority.value,
          checked: false
        };
        localCards.value.push(newCard);
      }
      newCardText.value = '';
      newCardPriority.value = '';
      showNewCardForm.value = false;
    };

    const cancelAddCard = () => {
      newCardText.value = '';
      newCardPriority.value = '';
      showNewCardForm.value = false;
    };

    const onDragEnd = () => {
      // Actions supplémentaires une fois le drag terminé (si nécessaire)
    };

    const handleUpdateCard = (updatedCard: CardInterface) => {
      const index = localCards.value.findIndex(card => card.id === updatedCard.id);
      if (index !== -1) {
        localCards.value[index] = updatedCard;
      }
    };

    const handleDeleteCard = (cardId: number) => {
      localCards.value = localCards.value.filter(card => card.id !== cardId);
    };

    return {
      localCards,
      showNewCardForm,
      newCardText,
      newCardPriority,
      addCard,
      cancelAddCard,
      onDragEnd,
      handleUpdateCard,
      handleDeleteCard,
      plusIcon
    };
  }
});
</script>

<style scoped>
.list {
  width: 272px;
  flex-shrink: 0;
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.list-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

/* Effets de drag & drop */

/* Classe appliquée à l'élément choisi (celui resté dans la liste) */
.drag-chosen {
  transform: rotate(3deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Classe appliquée au ghost (élément qui suit la souris) */
.drag-ghost {
  transform: rotate(5deg);
  opacity: 0.9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  cursor: grabbing;
}

/* Style du placeholder (emplacement skeleton) */
.placeholder-card {
  min-height: 60px;
  margin: 0.5rem 0;
  background-color: #f8f8f8;
  border: 2px dashed #ccc;
  border-radius: 3px;
}

/* Style optionnel du clone lors du drag */
.my-drag-clone {
  transform: rotate(5deg);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  opacity: 0.9;
  background: #fff;
  padding: 0.5rem;
  border-radius: 3px;
}

/* Bouton "Ajouter une carte" */
.add-card-placeholder {
  margin-top: 1rem;
  color: #666;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0.5rem;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.add-card-placeholder:hover {
  background-color: #f5f5f5;
}
.add-icon {
  width: 1rem;
  height: 1rem;
}

/* Formulaire d'ajout */
.new-card-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
.new-card-textarea {
  width: auto;
  padding: 0.5rem;
  resize: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.8rem;
  font-family: unset;
}
.new-card-priority {
  margin-top: 0.5rem;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 0.8rem;
  background: #fff;
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
