'use strict'

import { initialCards } from "./initialCards.js";
import { configData } from "./configData.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const curentPopup = document.querySelector('.open-img__popup');
const curentPopupImg = curentPopup.querySelector('.popup__img');
const curentPopupCaption = curentPopup.querySelector('.popup__caption');

const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');
const cardTemplate = document.querySelector('.card-template');

//создаем инструкции для списка
const createCard = (...args) => new Card(cardTemplate, handleCardClick, ...args);

//создаем список
const defaultCardList = new Section({ data: initialCards, renderer }, cardsListContainer);
defaultCardList.renderItems();

function renderer(item) {
    // Создаем карточку и возвращаем ее шаблон
    const newCardInitial = createCard(item.name, item.link).render();
    return newCardInitial;
}
//  /создаем список


//создаем карточку пользователя ЖакИв Кусто
// const UserInfo = new UserInfo(name, info);

// function renderer(item) {
//     // Создаем карточку и возвращаем ее шаблон
//     const newCardInitial = UserInfo(item.name, item.link).render();
//     return newCardInitial;
// }


//Валидация форм
// Находим формы в DOM
const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form');
const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form');

const editFormValidator = new FormValidator(configData, formEditPlaceElement);
const cardFormValidator = new FormValidator(configData, formAddPlaceElement);

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
const popupEditProfile = document.querySelector('.edit-profile__popup');
const popupAddPlaceElement = document.querySelector('.add-plaсe__popup');


//открытие попапа с картинкой для карточки (мягкое связывание)
function handleCardClick(text, link) {
    const showImgPopup = new PopupWithImage(curentPopup, text, link);  // <==  создаем эл-т класса PopupWithImage ==
    showImgPopup.openPopup(); // <==  открываем попап ==
}

//открываем попап для редактирования  профиля
function openPopupProfileEdit() {
    editFormValidator.resetValidation(); // <== очищаем поля формы и дизеблим кнопку сабмита перед открытием
    //заполнить поля
    nameInput.value = profileName.innerText; // <== передаем значение из формы ==
    jobInput.value = profileJob.innerText;   // <== передаем значение из формы ==
    const editProfilePopup = new PopupWithForm(popupEditProfile);  // <==  создаем эл-т класса PopupWithForm ==
    editProfilePopup.openPopup(); // <==  открываем попап ==
}

//открываем попап для добавления нового места
function openPopupProfileAdd() {
    cardFormValidator.resetValidation();// <== очищаем поля формы и дизеблим кнопку сабмита перед открытием
    const addPlaсePopup = new PopupWithForm(popupAddPlaceElement);  // <==  создаем эл-т класса PopupWithForm ==
    addPlaсePopup.openPopup(); // <==  открываем попап ==
}
//вставляет карточку на стр
function addCard(itemCardTemplate) {
    cardsListElement.prepend(itemCardTemplate);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    console.log('hanldeAddPlaceFormSubmit');
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    formEditPlaceElement.getInputValues();
}
function hanldeAddPlaceFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    //собираем их в массив для карточки
    const currentCardInputs = [
        {
            name: placeNameInput.value,
            link: placeImgInput.value,
        },
    ];

    //создаем список
    const currentCreateCard = new Section({ data: currentCardInputs, renderer }, cardsListContainer);
    currentCreateCard.renderItems();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formEditPlaceElement.addEventListener('submit', handleProfileFormSubmit);
// formAddPlaceElement.addEventListener('submit', hanldeAddPlaceFormSubmit);

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener('click', openPopupProfileEdit);
profileBtnAdd.addEventListener('click', openPopupProfileAdd);
