<template>
    <div class="card" @mouseenter="hovered = true" @mouseleave="hovered = false" @click="handleClick" @dblclick.stop="handleDblClick">
      <div class="checkbox-container" :class="{ 'show-checkbox': checkboxVisible }">
        <Icon :src="isChecked ? checkedIcon : uncheckedIcon" :alt="isChecked ? 'Checked' : 'Unchecked'" />
      </div>
      <div class="card-content" :class="{ 'with-checkbox': checkboxVisible }">
        <template v-if="editing">
          <Textarea v-model="editedText" @blur="saveEdit" @keyup.enter="saveEdit" />
        </template>
        <template v-else>
          <div class="card-text">{{ card.text }}</div>
          <PriorityLabel v-if="card.priority" :priority="card.priority" />
        </template>
      </div>
      <button class="delete-btn" @click.stop="deleteCard">
        <Icon src="../assets/trash.svg" alt="Delete" />
      </button>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import Icon from '../atoms/Icon.vue';
  import Textarea from '../atoms/Textarea.vue';
  import PriorityLabel from '../molecules/PriorityLabel.vue';
  import type { Card as CardType } from '../../store/boardStore';
  
  const props = defineProps<{ card: CardType }>();
  const emit = defineEmits(['deleteCard', 'updateCard']);
  
  const hovered = ref(false);
  const isChecked = ref<boolean>(!!props.card.checked);
  const editing = ref(false);
  const editedText = ref(props.card.text);
  let clickTimer: ReturnType<typeof setTimeout> | null = null;
  
  const checkedIcon = '../assets/check-circle-fill.svg';
  const uncheckedIcon = '../assets/circle.svg';
  
  const handleClick = () => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    } else {
      clickTimer = setTimeout(() => {
        if (!editing.value) toggleChecked();
        clickTimer = null;
      }, 250);
    }
  };
  
  const handleDblClick = () => {
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = null;
    editing.value = true;
  };
  
  const toggleChecked = () => {
    isChecked.value = !isChecked.value;
    emit('updateCard', { ...props.card, checked: isChecked.value });
  };
  
  const saveEdit = () => {
    editing.value = false;
    const newText = editedText.value.trim();
    if (newText && newText !== props.card.text) {
      emit('updateCard', { ...props.card, text: newText });
    }
  };
  
  const deleteCard = () => emit('deleteCard', props.card.id);
  const checkboxVisible = computed(() => hovered.value || isChecked.value);
  </script>