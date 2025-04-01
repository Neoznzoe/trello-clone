<template>
  <div class="card"
       @mouseenter="hovered = true"
       @mouseleave="hovered = false"
       @click="handleClick"
       @dblclick.stop="handleDblClick">
    <div
      class="checkbox-container"
      :class="{ 'show-checkbox': checkboxVisible }">
      <img
        v-if="isChecked"
        src="../assets/check-circle-fill.svg"
        alt="Checked"
        class="checkbox-icon" />
      <img
        v-else
        src="../assets/circle.svg"
        alt="Unchecked"
        class="checkbox-icon" />
    </div>

    <div class="card-content" :class="{ 'with-checkbox': checkboxVisible }">
      <template v-if="editing">
        <textarea
          v-model="editedText"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          class="edit-textarea">
        </textarea>
      </template>
      <template v-else>
        <div class="card-text">
          {{ card.text }}
        </div>
      </template>
    </div>

    <button class="delete-btn" @click.stop="deleteCard">
      <img src="../assets/trash.svg" alt="Delete" class="delete-icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import type { Card } from '../store/boardStore';

export default defineComponent({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  emits: ['deleteCard', 'updateCard'],
  setup(props, { emit }) {
    const hovered = ref(false);
    const isChecked = ref<boolean>(!!props.card.checked);
    const editing = ref(false);
    const editedText = ref(props.card.text);

    // Timer pour différencier clic simple / double-clic
    let clickTimer: ReturnType<typeof setTimeout> | null = null;

    const handleClick = () => {
      // Si un clic est déjà en attente, on le nettoie
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
      } else {
        // Délai pour différencier du double-clic (ici 250 ms)
        clickTimer = setTimeout(() => {
          if (!editing.value) {
            toggleChecked();
          }
          clickTimer = null;
        }, 250);
      }
    };

    const handleDblClick = () => {
      // Annule le clic simple
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
      }
      enableEditing();
    };

    const toggleChecked = () => {
      isChecked.value = !isChecked.value;
      emit('updateCard', { ...props.card, checked: isChecked.value });
    };

    const enableEditing = () => {
      editing.value = true;
      // Vous pouvez ajouter une logique pour donner le focus au textarea ici
    };

    const saveEdit = () => {
      editing.value = false;
      const newText = editedText.value.trim();
      if (newText && newText !== props.card.text) {
        emit('updateCard', { ...props.card, text: newText });
      }
    };

    const deleteCard = () => {
      emit('deleteCard', props.card.id);
    };

    // La checkbox est visible si on survole la carte ou si la carte est cochée
    const checkboxVisible = computed(() => hovered.value || isChecked.value);

    return {
      hovered,
      isChecked,
      editing,
      editedText,
      handleClick,
      handleDblClick,
      toggleChecked,
      enableEditing,
      saveEdit,
      deleteCard,
      checkboxVisible
    };
  }
});
</script>

<style scoped>
.card {
  width: auto;
  background: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center; /* Tous les éléments sur une même ligne */
  position: relative;
  cursor: pointer;
}

/* Conteneur de la checkbox */
.checkbox-container {
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
}
.show-checkbox {
  width: 1rem;
}
.checkbox-icon {
  width: 1rem;
  height: 1rem;
}

/* Contenu principal de la carte */
.card-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}
.card-content.with-checkbox {
  margin-left: 0.5rem;
}

/* Texte de la carte */
.card-text {
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

/* Textarea pour l'édition du texte */
.edit-textarea {
  width: 100%;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0.3rem;
  font-family: inherit;
}

/* Bouton de suppression */
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
}
.delete-icon {
  width: 1rem;
  height: 1rem;
}
</style>
