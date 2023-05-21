import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../utils/useFormWithValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSaving }) {
  const { errors, resetForm, handleChange, isValid } = useFormWithValidation(); 
  const inputRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    resetForm();
    inputRef.current.value = '';
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      name='avatar-edit'
      title='Обновить аватар'
      buttonText={isSaving && 'Сохранение...'}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <fieldset className='popup__fieldset'>
        <input
          ref={inputRef}
          id='avatar-input'
          type='url'
          className={`popup__input ${errors.avatar && 'popup__input_type_error'}`}
          name='avatar'
          placeholder='Ссылка на изображение'
          required='required'
          onChange={handleChange}
        />
        <span className='popup__error popup__error_visible'>{errors.avatar || ''}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;