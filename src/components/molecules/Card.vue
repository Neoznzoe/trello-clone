<template>
    <div class="card" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <Checkbox :checked="card.checked" @update:checked="updateChecked" />
      <div class="card-content" @dblclick.stop="enableEditing">
        <template v-if="editing">
          <textarea v-model="editedText" @blur="saveEdit" @keyup.enter="saveEdit" class="edit-textarea"></textarea>
        </template>
        <template v-else>
          <div class="card-text">{{ card.text }}</div>
        </template>
      </div>
      <Button customClass="delete-btn" @click.stop="deleteCard">
        <Icon src="../assets/trash.svg" alt="Delete" customClass="delete-icon" />
      </Button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Checkbox from '../atoms/Checkbox.vue';
  import Button from '../atoms/Button.vue';
  import Icon from '../atoms/Icon.vue';
  import type { Card } from '../../store/boardStore';
  
  export default defineComponent({
    name: 'Card',
    components: { Checkbox, Button, Icon },
    props: {
      card: { type: Object as () => Card, required: true }
    },
    emits: ['deleteCard', 'updateCard'],
    setup(props, { emit }) {
      const hovered = ref(false);
      const editing = ref(false);
      const editedText = ref(props.card.text);
  
      const updateChecked = (newValue: boolean) => {
        emit('updateCard', { ...props.card, checked: newValue });
      };
  
      const enableEditing = () => { editing.value = true; };
  
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
  
      return { hovered, editing, editedText, updateChecked, enableEditing, saveEdit, deleteCard };
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
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .card-content {
    flex: 1;
    margin-left: 0.5rem;
  }
  .edit-textarea {
    width: 100%;
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .delete-btn {
    margin-left: 0.5rem;
  }
  .delete-icon {
    width: 1rem;
    height: 1rem;
  }
  </style>
  