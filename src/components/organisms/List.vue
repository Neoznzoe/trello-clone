<template>
    <div class="list">
      <h2 class="list-title">{{ list.name }}</h2>
      <draggable v-model="localCards" group="cards" @end="onDragEnd" ghost-class="drag-ghost" chosen-class="drag-chosen" animation="200">
        <template #item="{ element }">
          <Card :card="element" @updateCard="handleUpdateCard" @deleteCard="handleDeleteCard" />
        </template>
        <template #placeholder>
          <div class="placeholder-card"></div>
        </template>
        <template #clone="{ element }">
          <div class="my-drag-clone">{{ element.text }}</div>
        </template>
      </draggable>
      <AddCardForm v-if="showNewCardForm" :text="newCardText" :priority="newCardPriority" @add="addCard" @cancel="cancelAddCard" />
      <div v-else class="add-card-placeholder" @click="showNewCardForm = true">
        <Icon :src="plusIcon" alt="Add" /> Ajouter une carte
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import draggable from 'vuedraggable';
  import Card from './Card.vue';
  import AddCardForm from '../molecules/AddCardForm.vue';
  import Icon from '../atoms/Icon.vue';
  import type { ListData, Card as CardType } from '../../store/boardStore';
  import plusIcon from '../assets/plus.svg';

  const props = defineProps<{ list: ListData }>();
  const emit = defineEmits(['updateList']);
  
  const localCards = ref<CardType[]>([...props.list.cards]);
  watch(localCards, newCards => emit('updateList', { ...list, cards: newCards }));
  
  const showNewCardForm = ref(false);
  const newCardText = ref('');
  const newCardPriority = ref('');
  
  const addCard = () => {
    if (newCardText.value.trim() && newCardPriority.value) {
      localCards.value.push({ id: Date.now(), text: newCardText.value, priority: newCardPriority.value, checked: false });
      newCardText.value = '';
      newCardPriority.value = '';
      showNewCardForm.value = false;
    }
  };
  
  const cancelAddCard = () => {
    newCardText.value = '';
    newCardPriority.value = '';
    showNewCardForm.value = false;
  };
  
  const handleUpdateCard = (updatedCard: CardType) => {
    const index = localCards.value.findIndex((c: CardType) => c.id === updatedCard.id);
    if (index !== -1) localCards.value[index] = updatedCard;
  };
  
  const handleDeleteCard = (cardId: number) => {
    localCards.value = localCards.value.filter((card: CardType) => card.id !== cardId);
  };
  </script>