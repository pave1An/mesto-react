import Header from './Header';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRouteElement';

import React, { useState, useEffect, useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { InfoTooltip } from './InfoTooltip';

import api from '../utils/Api';
import auth from '../utils/auth';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  const [deletionCardId, setDeletionCardId] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [userEmail, setUserEmail] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  
  const navigate = useNavigate();
 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleCardClick(card) { 
    setSelectedCard(card);
  }
  
  function handleDeleteClick(cardId) {
    setIsDeleteCardPopupOpen(true);
    setDeletionCardId(cardId);
  }

  function handleCardLike(card, isLiked) { 
    api.clickLike(card._id, isLiked)
    .then((res) => setCards(cards => cards.map(c => c._id === card._id ? res : c)))
    .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleCardDelete() {
    setIsSaving(true);
    api.deleteCard(deletionCardId)
    .then(() => {
      setCards(cards => cards.filter(с => с._id !== deletionCardId));
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
    .finally(() => setIsSaving(false));
  }

  function handleUpdateUser(userData) {
    setIsSaving(true);
    api.patchUserInfo(userData)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
    .finally(() => setIsSaving(false));
  }
  
  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
    .finally(() => setIsSaving(false));
  }
  
  function handleAddPlaceSubmit(card) {
    setIsSaving(true);
    api.postCard(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
    .finally(() => setIsSaving(false));
  }

  function handleRegister({ email, password }) {
    auth.registration({ email, password })
    .then((res) => {
      if(res.data) {
        setIsRegisterSuccess(true);
        navigate('/sign-in', {replace: true});
        setIsInfoTooltipOpen(true);
      }
    })
    .catch((err) => {
      setIsRegisterSuccess(false);
      setIsInfoTooltipOpen(true);
      console.log(`Ошибка: ${err.status}`);
    });
  }
  
  function handleLogin({ email, password }) {
    auth.login({ email, password })
    .then((data) => {
      if(data.token) {
        localStorage.setItem('jwt', data.token);
        setUserEmail(email);
        setLoggedIn(true); 
        navigate('/', {replace: true});
      }
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt)
      .then(res => {
        if(res.data.email) {
          setUserEmail(res.data.email);
          setLoggedIn(true); 
          navigate('/', {replace: true});
        }
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
    }
  }, [navigate]);

  function handleSignout() {
    setUserEmail('');
    setLoggedIn(false);
    localStorage.setItem('jwt', '');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({});
  }

  useEffect(() => {
    checkToken();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`));
  },[checkToken]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignout={handleSignout} />
        
        <Routes>
          <Route path='/' element={
            <ProtectedRouteElement element= {Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onClose={closeAllPopups}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn}
            />}
          />
          <Route path='/sign-up' element={<Register onRegister={handleRegister}/>} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
        </Routes>

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSaving={isSaving}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSaving={isSaving}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSaving={isSaving}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isSaving={isSaving}
        />
        <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} onClose={closeAllPopups} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} isRegisterSuccess={isRegisterSuccess} />
        {loggedIn && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
