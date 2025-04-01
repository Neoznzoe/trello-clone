<template>
  <div class="card" @dblclick="enableEditing">
    <template v-if="editing">
      <!-- On remplace l'input par un textarea -->
      <textarea
        v-model="editedText"
        @blur="save"
        @keyup.enter="save"
        class="card-textarea"
      ></textarea>
    </template>
    <template v-else>
      <span class="card-text">{{ card.text }}</span>
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

    // On valide l'édition au blur ou sur la touche Entrée
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
  flex-direction: row;
  align-items: flex-start; /* Important pour que le texte puisse grandir vers le bas */
  justify-content: space-between;
  max-width: 100%; 
}

.card-text {
  /* Pour que le texte occupe la place disponible et se renvoie à la ligne */
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: calc(100% - 2rem); /* Laisser de la place au bouton si besoin */
}

.delete-btn {
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.trash-icon {
  width: 1rem;
  height: 1rem;  
  filter: invert(22%) sepia(96%) saturate(748%) hue-rotate(340deg) brightness(91%) contrast(92%);
}

</style>
