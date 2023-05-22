import React, { useContext, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import usePopupClose from '../utils/usePopupClose';

function ImagePopup({ card }) {
  const elementRef = useRef(null);
  const { onClose } = useContext(AppContext);
  usePopupClose(elementRef, onClose, card.link);

  return (
    <div ref={elementRef} className={`popup popup_type_image popup_background_dark ${card.link && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button 
          type="button" 
          className="popup__close-btn" 
          name="form-close" 
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img src= {card.link} alt={card.name} className="popup__image-view"/>
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;