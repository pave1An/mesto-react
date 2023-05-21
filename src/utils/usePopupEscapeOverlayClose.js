import { useEffect } from "react";

const usePopupEscapeOverlayClose = (elementRef, handleClose, isOpen) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleClosePopup = (e) => {
      if(!elementRef.current) return;
      if(e.key === 'Escape' || e.target === elementRef.current) {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleClosePopup);
    document.addEventListener('mousedown', handleClosePopup);
    
    return () => {
      document.removeEventListener('keydown', handleClosePopup);
      document.removeEventListener('mousedown', handleClosePopup);
    }
  }, [isOpen, elementRef, handleClose]);
}

export default  usePopupEscapeOverlayClose;