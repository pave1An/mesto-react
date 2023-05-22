import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return(
    <PopupWithForm
      isOpen={isOpen}
      name='confirmation'
      title='Вы уверены?'
      buttonText='Да'
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  )
}

export default DeleteCardPopup;