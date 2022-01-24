'use strict'

import { configData } from "../utils/configData.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { Api } from '../scripts/Api.js';

import '../pages/index.css';
import { Popup } from "../scripts/Popup.js";

const curentPopupConfirmation = document.querySelector('.confirmation__popup');

const curentPopup = document.querySelector('.open-img__popup');
const curentPopupImg = curentPopup.querySelector('.popup__img');
const curentPopupCaption = curentPopup.querySelector('.popup__caption');

// const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');
const cardTemplate = document.querySelector('.card-template');

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-34/cards',
    headers: {
        authorization: '1690dfea-cbda-42f6-a87e-a16c1f76892e',
        'Content-Type': 'application/json'
    }
});

const userApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-34/users/me',
    headers: {
        authorization: '1690dfea-cbda-42f6-a87e-a16c1f76892e',
        'Content-Type': 'application/json'
    }
});


//создаем инструкции для списка
const createCard = (...args) => new Card(cardTemplate, handleCardClick, handleCardLikes, openConfirm, closeConfirm, ...args, api);

let currentCardId;
function renderer(item) {
    //проверка пользователя
    console.log('renderer(item) = ',item);
// debugger
     currentCardId = item._id;
    console.log('currentCardId = ',currentCardId);
    console.log('user = ',user);

    // Создаем карточку и возвращаем ее шаблон
    const newCardInitial = createCard(item, user).render();
    this.addItem(newCardInitial);

    return newCardInitial;
}
//  /создаем список


//создаем пустой список в который далее будем вставлять карточки
const cardList = new Section({ data: [], renderer }, cardsListContainer);

//запрос к серверу получаю начальный набор карточек с сервера
api.getInitialCards()
    .then(data => {
        //создаем список
        cardList.renderItems(data);
    })
    .catch(err => console.log(err));



//Валидация форм
// Находим формы в DOM
const formEditProfile = document.querySelector('.edit-profile__popup .popup__form');
const formAddPlace = document.querySelector('.add-plaсe__popup .popup__form');

const editFormValidator = new FormValidator(configData, formEditProfile);
const cardFormValidator = new FormValidator(configData, formAddPlace);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// -----------------------------------------------------------
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_user-title');
const jobInput = document.querySelector('.popup__input_user-subtitle');
const placeNameInput = document.querySelector('.popup__input_plaсe-title');
const placeImgInput = document.querySelector('.popup__input_plaсe-img');

// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// // находим список в кот надо встаивть карточки
const cardsListElement = document.querySelector('.cards__list');
//Находим кнопку 'Сохранить' в форме
const popupBtn = document.querySelector('.popup__btn');
// находим все попапы
const popups = document.querySelectorAll('.popup');
// находим кнопки кот вызывают всплытие/закрытие окна-редактирования
const profileBtnEdit = document.querySelector('.btn-user-edit');
const profileAvatarEdit = document.querySelector('.btn-avatar-edit');
// находим кнопки кот вызывают всплытие/закрытие окна-добавления карточки
const profileBtnAdd = document.querySelector('.profile__btn_user-add');
// Находим сам попап
const popupEditProfileSelector = document.querySelector('.edit-profile__popup');
const popupEditProfileAvatar = document.querySelector('.new-avatar__popup');
const popupAddPlaceSelector = document.querySelector('.add-plaсe__popup');

//открытие попапа с предупреждением
const popupConfirmation = new Popup(curentPopupConfirmation, openConfirm, closeConfirm);// <==  создаем эл-т класса Popup
function openConfirm(evt) {
    popupConfirmation.openPopup(); // <==  открываем попап ==
}
function closeConfirm(evt) {
    popupConfirmation.closePopup(); // <==  закрываем попап ==
}

//открытие попапа с картинкой для карточки (мягкое связывание)
const popupImage = new PopupWithImage(curentPopup, curentPopupCaption, curentPopupImg);  // <==  создаем эл-т класса PopupWithImage ==
function handleCardClick(text, link) {
    popupImage.openPopup(text, link); // <==  открываем попап ==
}

// кликаем лайки
function handleCardLikes(cardId) {
    console.log('handleCardLikes: cardId = ',cardId);
debugger
    this._heart.classList.toggle('cards__heart_active');

    api.postLike(cardId)
    .then(()=>{
        //проверить лайкала я эту карточку или нет

         //отправить на сервер новый лайк
         let heartCounter = this._counter.textContent;
         let newHeartCounter;
         // debugger
         newHeartCounter = +heartCounter + 1;
         heartCounter = newHeartCounter;
         this._counter.textContent = heartCounter;
    })
    .catch(err => console.log(err));

    // console.log('likesApi = ',likesApi);
}



let user;
//запрос к серверу получаю нач данные для профайла пользователя
userApi.getUser()
    .then((data) => {
        currentUser.setUserInfo({ name: data.name, about: data.about});
        user = data._id;
    })
    .catch(err => console.log(err));


const userInfoPopup = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==
const userAvatarPopup = new PopupWithForm(popupEditProfileAvatar, handleProfileFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==

const currentUser = new UserInfo('profile__name', 'profile__job');

//открываем попап для редактирования  аватара
//надо сделать проверку пользователя - редактировать может только авторизированный пользователь ???
function openPopupAvatarEdit() {
    editFormValidator.resetValidation(); // <== очищаем поля формы, ошибки и дизеблим кнопку сабмита перед открытием
    //  передаем значение полей из формы
    const currentUserInfo = currentUser.getUserInfo();// получили данные текущего юзера кот выведены на стр
    nameInput.value = currentUserInfo.name;// передали эти данные в поля формы
    jobInput.value = currentUserInfo.about;

    userAvatarPopup.openPopup(); // <==  открываем попап ==
    editFormValidator.toggleButtonState(); // проверить состояние кнопки при открытии формы
}

//открываем попап для редактирования  профиля
function openPopupProfileEdit() {
    editFormValidator.resetValidation(); // <== очищаем поля формы, ошибки и дизеблим кнопку сабмита перед открытием
    //  передаем значение полей из формы
    const currentUserInfo = currentUser.getUserInfo();// получили данные текущего юзера кот выведены на стр
    nameInput.value = currentUserInfo.name;// передали эти данные в поля формы
    jobInput.value = currentUserInfo.about;

    userInfoPopup.openPopup(); // <==  открываем попап ==
    editFormValidator.toggleButtonState(); // проверить состояние кнопки при открытии формы
}

//открываем попап для добавления нового места
const newCardPopup = new PopupWithForm(popupAddPlaceSelector, hanldeAddPlaceFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==
function openPopupProfileAdd() {
    cardFormValidator.resetValidation();// <== очищаем поля формы и дизеблим кнопку сабмита перед открытием
    newCardPopup.openPopup(); // <==  открываем попап ==
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function hanldeConfirmFormSubmit(evt) {
    evt.preventDefault();
    const submitConfirmationBtn = document.querySelector('.confirmation .popup__btn');
    submitConfirmationBtn.addEventListener('click', console.log('click confirmation .popup__btn'))

}

function handleProfileFormSubmit(evt, { title, subtitle }) {
    //изменяем данные текущего юзера в соот с данными забитыми в форму
    currentUser.setUserInfo({ name: title, about: subtitle });

    //отправляем новые данные пользователя на сервер

    userApi.postUser({ name: title, about: subtitle })
    .then(data => {
        currentUser.setUserInfo({ name: title, about: subtitle });
    })
    .catch(err => console.log(err));
}

function hanldeAddPlaceFormSubmit() {
    //создаем нов карточку в соот с данными забитыми в форму
    //отправляем данные новой карточки на сервер

    api.postCreateCard({name: placeNameInput.value, link: placeImgInput.value})
    .then((data) => {
        console.log('api.postCreateCard: user = ',user);
        // console.log('data = ',data._id);
        cardList.addItem(createCard(data,user).render(), 'prepend');
    })
    .catch(err => console.log(err));

}

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener('click', openPopupProfileEdit);
profileAvatarEdit.addEventListener('click', openPopupAvatarEdit);
profileBtnAdd.addEventListener('click', openPopupProfileAdd);
