<!-- src/components/Card.vue -->
<template>
  <div class="card" @dblclick="enableEditing">
    <template v-if="editing">
      <input
        type="text"
        v-model="editedText"
        @blur="save"
        @keyup.enter="save"
        class="card-input"
      />
    </template>
    <template v-else>
      <span>{{ card.text }}</span>
      <button class="delete-btn" @click.stop="deleteCard">
        <img :src="trashIcon" alt="Delete" class="trash-icon" />
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import type { Card } from '../store/boardStore';
import trashIcon from '../assets/trash.svg';

export default defineComponent({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  emits: ['updateCard', 'deleteCard'],
  setup(props, { emit }) {
    const editing = ref(false);
    const editedText = ref(props.card.text);

    const enableEditing = () => {
      editing.value = true;
      editedText.value = props.card.text;
    };

    const save = () => {
      editing.value = false;
      const newText = editedText.value.trim();
      if (newText !== '' && newText !== props.card.text) {
        emit('updateCard', { ...props.card, text: newText });
      }
    };

    const deleteCard = () => {
      emit('deleteCard', props.card.id);
    };

    return { editing, editedText, enableEditing, save, deleteCard, trashIcon };
  }
});
</script>

<style scoped>
.card {
  background: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-input {
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
}

.trash-icon {
  width: 1rem;
  height: 1rem;
}
</style>
