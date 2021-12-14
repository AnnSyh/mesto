'use strict'

import { initialCards } from "./initialCards.js";
import { configData } from "./configData.js";
import { Card } from "./Card.js";
import { CardsList } from "./CardsList.js";
import { FormValidator } from "./FormValidator.js";

const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');


//создаем инструкции для формы
const createForm = (...args) => new Form(...args);
//создаем инструкции для списка
const createCard = (...args) => new Card(...args);

const cardsList = new CardsList(initialCards, cardsListTemplate, createForm, createCard);
cardsList.render(cardsListContainer);

//Валидация форм
// Находим формы в DOM
const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form');
const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form');
//вызываем конструктор с валидацией форм
// new FormValidator(configData, formEditPlaceElement);
// new FormValidator(configData, formAddPlaceElement);


const editFormValidator = new FormValidator(configData, formEditPlaceElement);
const cardFormValidator = new FormValidator(configData, formAddPlaceElement);

editFormValidator.enableValidation(configData);
cardFormValidator.enableValidation(configData);


// находим кнопки кот вызывают всплытие/закрытие окна редактирования
const profileBtnEdit = document.querySelector('.profile__btn_user-edit')
// находим кнопки кот вызывают всплытие/закрытие окна добавления карточки
const profileBtnAdd = document.querySelector('.profile__btn_user-add')
// Находим сам попап
const popupEditProfile = document.querySelector('.edit-profile__popup')
const popupAddPlaceElement = document.querySelector('.add-plaсe__popup')
// // Находим форму в DOM
// const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form');
// const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_user-title');
const jobInput = document.querySelector('.popup__input_user-subtitle');
const placeNameInput = document.querySelector('.popup__input_plaсe-title');
const placeImgInput = document.querySelector('.popup__input_plaсe-img');
// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const template = document.querySelector('.template')
//Находим кнопку 'Сохранить' в форме 
const popupBtn = document.querySelector('.popup__btn')
// находим все попапы 
const popups = document.querySelectorAll('.popup')

//ф-я открытия любого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    //вешаем событие на кнопку Esc
    document.addEventListener('keydown', clickEsc)
}
//попап для карточек
function openPopupImage(evt) {
    const curentElement = evt.target
    const curentPopup = document.querySelector('.open-img__popup')

    curentPopup.querySelector('.popup__img').src = curentElement.src
    curentPopup.querySelector('.popup__img').alt = curentElement.alt
    curentPopup.querySelector('.popup__caption').innerText = curentElement.alt
    openPopup(curentPopup)
}
//попап для редактирования  профиля
function openPopupProfileEdit() {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
    openPopup(popupEditProfile)
}
//попап для добавления нового места
function openPopupProfileAdd() {
    openPopup(popupAddPlaceElement)
}

function closePopup(evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
        popup.classList.remove('popup_opened');
        //снять слушатель с кнопки Esc 
        document.removeEventListener('keydown', clickEsc);
    }
};

//Слушатель событий, закрывающий модальное окно по нажатию на Escape
function clickEsc(evt) {
    if (evt.key == 'Escape') {
        closePopup()
    }
}


//вешаем событие на кнопки
profileBtnEdit.addEventListener('click', openPopupProfileEdit)
profileBtnAdd.addEventListener('click', openPopupProfileAdd)
//закрытие всехпопапов при клике на крестик или оверлай
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
            closePopup(popup)
        }
    })
})
