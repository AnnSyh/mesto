'use strict'

import { initialCards } from "../scripts/initialCards.js";
import { configData } from "../scripts/configData.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';

import '../pages/index.css';


const curentPopup = document.querySelector('.open-img__popup');
// const curentPopupImg = curentPopup.querySelector('.popup__img');
// const curentPopupCaption = curentPopup.querySelector('.popup__caption');

// const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');
const cardTemplate = document.querySelector('.card-template');

//создаем инструкции для списка
const createCard = (...args) => new Card(cardTemplate, handleCardClick, ...args);

//создаем список
const cardList = new Section({ data: initialCards, renderer }, cardsListContainer);
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
const popupEditProfileSelector = document.querySelector('.edit-profile__popup');
const popupAddPlaceSelector = document.querySelector('.add-plaсe__popup');


//открытие попапа с картинкой для карточки (мягкое связывание)
function handleCardClick(text, link) {
    const showImgPopup = new PopupWithImage(curentPopup, text, link);  // <==  создаем эл-т класса PopupWithImage ==
    showImgPopup.openPopup(); // <==  открываем попап ==
}

const editProfilePopup = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==
//создаю Экземпляр класса UserInfo и передаю туда нач данные
const currentUser = new UserInfo('profile__name', 'profile__job');
currentUser.setUserInfo({ name: 'Жак-Ив Кусто', about: 'Исследователь океана' });

//открываем попап для редактирования  профиля
function openPopupProfileEdit() {
    editFormValidator.resetValidation(); // <== очищаем поля формы, ошибки и дизеблим кнопку сабмита перед открытием
    //  передаем значение полей из формы 
    currentUser.getUserInfo();// получили данные текущего юзера кот выведены на стр
    nameInput.value = currentUser.getUserInfo().name;// передали эти данные в поля формы
    jobInput.value = currentUser.getUserInfo().about;
    editProfilePopup.openPopup(); // <==  открываем попап ==
}

//открываем попап для добавления нового места
function openPopupProfileAdd() {
    cardFormValidator.resetValidation();// <== очищаем поля формы и дизеблим кнопку сабмита перед открытием
    const addPlaсePopup = new PopupWithForm(popupAddPlaceSelector, hanldeAddPlaceFormSubmit);  // <==  создаем эл-т класса PopupWithForm ==
    addPlaсePopup.openPopup(); // <==  открываем попап ==
}
//вставляет карточку на стр
function addCard(itemCardTemplate) {
    cardsListElement.prepend(itemCardTemplate);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt, { title, subtitle }) {
    console.log('function handleProfileFormSubmit');
    console.log('ProfileFormSubmit: rezultArray  = ', title, subtitle);
    // Получаем значение полей jobInput и nameInput из свойства value
    // Выбераем элементы, куда должны быть вставлены значения полей
    profileName.textContent = title;
    profileJob.textContent = subtitle;
    //изменяем данные текущего юзера в соот с данными забитыми в форму
    currentUser.setUserInfo({ name: title, about: subtitle });
}
function hanldeAddPlaceFormSubmit(evt, rezultArray) {
    // debugger
    // console.log('AddPlaceFormSubmit: rezultArray  = ', rezultArray);
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

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener('click', openPopupProfileEdit);
profileBtnAdd.addEventListener('click', openPopupProfileAdd);
