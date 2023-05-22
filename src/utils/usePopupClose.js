import { useEffect } from "react";

const usePopupClose = (elementRef, handleClose, isOpen) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleClosePopup = (e) => {
      if(!elementRef.current) return;
      if(e.key === 'Escape' || e.target === elementRef.current) {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleClosePopup);
    document.addEventListener('mouseup', handleClosePopup);
    
    return () => {
      document.removeEventListener('keydown', handleClosePopup);
      document.removeEventListener('mouseup', handleClosePopup);
    }
  }, [isOpen, elementRef, handleClose]);
}

export default  usePopupClose;