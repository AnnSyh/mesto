'use strict'

import { initialCards } from "../utils/initialCards.js";
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

const curentPopupConfirmation = document.querySelector('.popup__confirmation');

const curentPopup = document.querySelector('.open-img__popup');
const curentPopupImg = curentPopup.querySelector('.popup__img');
const curentPopupCaption = curentPopup.querySelector('.popup__caption');

// const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');
const cardTemplate = document.querySelector('.card-template');


const arr = [];
//запрос к серверу получаю начальный набор карточек с сервера
function updateDefaultCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
        headers: {
            authorization: '1690dfea-cbda-42f6-a87e-a16c1f76892e'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {// если мы попали в этот then, data — это объект

            for (let i = 0; i <= data.length; i++) {
                arr.push(data[i]);
            }
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
            const cardList = new Section({ data: initialCards, renderer }, cardsListContainer);
            cardList.renderItems();
        });
    return arr;
}

//загружаем нач набор карточек с сервера
updateDefaultCards();

console.log('new-arr = ', arr);
console.log('initialCards = ', initialCards);

//создаем инструкции для списка
const createCard = (...args) => new Card(cardTemplate, handleCardClick, openConfirm, closeConfirm, ...args);

//создаем список
// const cardList = new Section({ data: initialCards, renderer }, cardsListContainer);
const cardList = new Section({ data: arr, renderer }, cardsListContainer);
cardList.renderItems();

function renderer(item) {
    // Создаем карточку и возвращаем ее шаблон
    const newCardInitial = createCard(item.name, item.link).render();
    this.addItem(newCardInitial);
    return newCardInitial;
}
//  /создаем список


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
const profileBtnEdit = document.querySelector('.profile__btn_user-edit');
// находим кнопки кот вызывают всплытие/закрытие окна-добавления карточки
const profileBtnAdd = document.querySelector('.profile__btn_user-add');
// Находим сам попап
const popupEditProfileSelector = document.querySelector('.edit-profile__popup');
const popupAddPlaceSelector = document.querySelector('.add-plaсe__popup');


// const curentPopup = document.querySelector('.open-img__popup');
// const curentPopupImg = curentPopup.querySelector('.popup__img');
// const curentPopupCaption = curentPopup.querySelector('.popup__caption');

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

//запрос к серверу получаю нач данные для карточки пользователя
function updateUserInfo() {

    fetch('https://mesto.nomoreparties.co/v1/cohort-34/users/me', {
        headers: {
            authorization: '1690dfea-cbda-42f6-a87e-a16c1f76892e'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {// если мы попали в этот then, data — это объект
            // console.log('data.name = ', data.name);
            // console.log('data.about = ', data.about);
            // console.log('data.avatar = ', data.avatar);
            currentUser.setUserInfo({ name: data.name, about: data.about });
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
            currentUser.setUserInfo({ name: 'Жак-Ив Кусто', about: 'Исследователь океана' });
        });
}



const userInfoPopup = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==

const currentUser = new UserInfo('profile__name', 'profile__job');
// вывожу данные пользователя полученые с сервера
updateUserInfo();


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
}
function hanldeAddPlaceFormSubmit() {
    //создаем список
    cardList.addItem(createCard(placeNameInput.value, placeImgInput.value).render());

    // Получаем значение полей jobInput и nameInput из свойства value
    //собираем их в массив для карточки
    // const currentCardInputs = [
    //     {
    //         name: placeNameInput.value,
    //         link: placeImgInput.value,
    //     },
    // ];
    //создаем список
    // const currentCreateCard = new Section({ data: currentCardInputs, renderer }, cardsListContainer);
    // currentCreateCard.renderItems();
}

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener('click', openPopupProfileEdit);
profileBtnAdd.addEventListener('click', openPopupProfileAdd);


