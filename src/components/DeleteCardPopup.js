import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, isSaving, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='confirmation'
      title='Вы уверены?'
      buttonText={isSaving ? 'Сохранение...' : 'Да'}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  )
}

export default DeleteCardPopup;