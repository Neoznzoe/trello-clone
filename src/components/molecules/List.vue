<template>
    <div class="list">
      <h2 class="list-title">{{ list.name }}</h2>
      <div class="cards-container">
        <draggable v-model="localCards" group="cards" @end="onDragEnd">
          <template #item="{ element }">
            <Card :card="element" @updateCard="handleUpdateCard" @deleteCard="handleDeleteCard" />
          </template>
        </draggable>
      </div>
      <div class="add-card-section">
        <div v-if="!showNewCardForm" class="add-card-placeholder" @click="showNewCardForm = true">
          <Icon :src="plusIcon" alt="Add" customClass="add-icon" /> Ajouter une carte
        </div>
        <div v-else class="new-card-form">
          <textarea v-model="newCardText" placeholder="Saisissez le titre de la carte..." class="new-card-textarea"></textarea>
          <div class="new-card-actions">
            <Button customClass="confirm-btn" @click="addCard">Ajouter</Button>
            <Button customClass="cancel-btn" @click="cancelAddCard">Annuler</Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import draggable from 'vuedraggable';
  import Card from '../molecules/Card.vue';
  import Icon from '../atoms/Icon.vue';
  import Button from '../atoms/Button.vue';
  import type { ListData, Card as CardInterface } from '../../store/boardStore';
  import plusIcon from '../../assets/plus.svg';
  
  export default defineComponent({
    name: 'List',
    components: { Card, draggable, Icon, Button },
    props: {
      list: { type: Object as () => ListData, required: true }
    },
    emits: ['updateList'],
    setup(props, { emit }) {
      const localCards = ref<CardInterface[]>([...props.list.cards]);
      watch(localCards, (newCards) => {
        emit('updateList', { ...props.list, cards: newCards });
      });
  
      const showNewCardForm = ref(false);
      const newCardText = ref('');
  
      const addCard = () => {
        const text = newCardText.value.trim();
        if (text) {
          const newCard: CardInterface = {
            id: Date.now(),
            text,
            priority: 'Basse',
            checked: false
          };
          localCards.value.push(newCard);
        }
        newCardText.value = '';
        showNewCardForm.value = false;
      };
  
      const cancelAddCard = () => {
        newCardText.value = '';
        showNewCardForm.value = false;
      };
  
      const onDragEnd = () => { /* actions supplémentaires */ };
  
      const handleUpdateCard = (updatedCard: CardInterface) => {
        const index = localCards.value.findIndex(card => card.id === updatedCard.id);
        if (index !== -1) localCards.value[index] = updatedCard;
      };
  
      const handleDeleteCard = (cardId: number) => {
        localCards.value = localCards.value.filter(card => card.id !== cardId);
      };
  
      return {
        localCards,
        showNewCardForm,
        newCardText,
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
    background: #fff;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
  }
  .list-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .cards-container {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 0;
  }
  .add-card-placeholder {
    margin-top: 1rem;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    padding: 0.5rem;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .new-card-actions {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }
  </style>
  