import React, { useContext, useRef } from 'react';
import failImage from '../images/info-tooltip-fail.svg';
import successImage from '../images/info-tooltip-succes.svg';
import usePopupClose from '../utils/usePopupClose';
import { AppContext } from '../contexts/AppContext';


export const InfoTooltip = ({ isOpen, isRegisterSuccess }) => {
  const { onClose } = useContext(AppContext);
  const elementRef = useRef();
  usePopupClose(elementRef, onClose, isOpen); 
  
  return(
    <div ref={elementRef} className={`popup ${isOpen && 'popup_opened'}`}>
      <div className= "popup__container">
        <button type="button" onClick={onClose} className="popup__close-btn" name="form-close" aria-label="Закрыть" />
        <img className='popup__tooltip-image' src={isRegisterSuccess ? successImage : failImage} alt='статус регситрации' />
        <p className='popup__tooltip-text'> 
          {isRegisterSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}