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
        <!-- Label de priorité -->
        <div v-if="card.priority" class="priority-label" :class="priorityClass">
          {{ capitalizedPriority }}
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

    let clickTimer: ReturnType<typeof setTimeout> | null = null;

    const handleClick = () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
      } else {
        clickTimer = setTimeout(() => {
          if (!editing.value) {
            toggleChecked();
          }
          clickTimer = null;
        }, 250);
      }
    };

    const handleDblClick = () => {
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

    // Détermine la classe CSS en fonction de la priorité (couleur associée)
    const priorityClass = computed(() => {
      const p = (props.card.priority || '').toLowerCase();
      if (p === 'faible' || p === 'basse') {
        return 'priority-faible';
      } else if (p === 'moyenne') {
        return 'priority-moyenne';
      } else if (p === 'eleve' || p === 'élevé' || p === 'élevée') {
        return 'priority-eleve';
      }
      return '';
    });

    // Capitalise la première lettre de la priorité
    const capitalizedPriority = computed(() => {
      if (!props.card.priority) return '';
      // on normalise la priorité en minuscules, puis on met la 1ère lettre en majuscule
      const p = props.card.priority.toLowerCase();
      return p.charAt(0).toUpperCase() + p.slice(1);
    });

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
      checkboxVisible,
      priorityClass,
      capitalizedPriority
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
  align-items: center;
  position: relative;
  cursor: pointer;
}

/* Checkbox */
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

.card-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}
.card-content.with-checkbox {
  margin-left: 0.5rem;
}

/* Label de priorité */
.priority-label {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
  margin-bottom: 0.3rem;
}

/* Couleurs sobres associées aux priorités */
.priority-faible {
  background-color: #d4edda; /* vert pâle */
  color: #155724;
}
.priority-moyenne {
  background-color: #fff3cd; /* jaune pâle */
  color: #856404;
}
.priority-eleve {
  background-color: #f8d7da; /* rouge pâle */
  color: #721c24;
}

.card-text {
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.edit-textarea {
  width: 100%;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0.3rem;
  font-family: inherit;
}

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
