import React, { useRef, useContext } from 'react';
import usePopupClose from '../utils/usePopupClose';
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ isOpen, name, title, buttonText, onSubmit, children, isFormValid }) {
  const { isSaving, onClose } = useContext(AppContext);
  const popupRef = useRef(null);
  usePopupClose(popupRef, onClose, isOpen);

  return ( 
    <div ref={popupRef} className={`popup ${isOpen && 'popup_opened'} popup_type_${name}`}>
      <div className= "popup__container">
        <button type="button" onClick={onClose} className="popup__close-btn" name="form-close" aria-label="Закрыть" />
        <h3 className="popup__title">{title}</h3>
        <form action="#" className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button 
            type="submit" 
            className={`popup__button ${!isFormValid && 'popup__button_disabled'}`} 
            name="form-submit" 
            disabled={!isFormValid}
          >
            {isSaving ? 'Сохранение...' : buttonText || 'Coхранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
