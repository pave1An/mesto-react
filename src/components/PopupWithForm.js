import React, { useRef } from 'react';
import usePopupEscapeOverlayClose from '../utils/usePopupEscapeOverlayClose';

function PopupWithForm({ isOpen, onClose, name, title, buttonText, onSubmit, children, isFormValid }) {
  const popupRef = useRef(null);
  usePopupEscapeOverlayClose(popupRef, onClose, isOpen);

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
            {buttonText || 'Coхранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
