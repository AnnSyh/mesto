'use strict'

import { initialCards } from "./initialCards.js";
import { configData } from "./configData.js";
import { Card } from "./Card.js";
import { CardsList } from "./CardsList.js";
import { FormValidator } from "./FormValidator.js";

const curentPopup = document.querySelector('.open-img__popup');
const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');
const cardTemplate = document.querySelector('.card-template');
//создаем инструкции для формы
const createForm = (...args) => new Form(...args);
//создаем инструкции для списка
const createCard = (...args) => new Card(cardTemplate, handleCardClick, ...args);
//создаем список
const cardsList = new CardsList(initialCards, cardsListTemplate, createForm, createCard);
cardsList.render(cardsListContainer);

const cardContainer = document.querySelector('.cards__list');
initialCards.forEach(item => {
    const newCardInitial = new Card(cardTemplate, handleCardClick, item.name, item.link);
    // newCardInitial.render(cardsListContainer);
    // debugger
    // cardContainer.append(newCardInitial._view.cloneNode(true));
    cardContainer.append(newCardInitial.render(cardsListContainer));

});

//мягкое связывание,открытие попапа с картинкой для карточки
function handleCardClick(text, link) {
    console.log('handleCardClick');
    // устанавливаем ссылку
    // устанавливаем подпись картинке
    //открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
    // console.log('curentPopup = ', curentPopup);

    curentPopup.querySelector('.popup__img').src = link;
    curentPopup.querySelector('.popup__img').alt = text;
    curentPopup.querySelector('.popup__caption').textContent = text;

    openPopup(curentPopup);
}

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

//попап для редактирования  профиля
function openPopupProfileEdit() {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
    openPopup(popupEditProfile);
}
//попап для добавления нового места
function openPopupProfileAdd() {
    openPopup(popupAddPlaceElement);
}
//закрываем открытый попап еслион есть
function closePopup(evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
        popup.classList.remove('popup_opened');
        //снять слушатель с кнопки Esc 
        document.removeEventListener('keydown', clickEsc);
    }
}
//рендерим нов карточку из формы  (через класс new Card)
function createCardFunction(name, src) {
    const newCardAdd = new Card(cardTemplate, handleCardClick, name, src);
    return newCardAdd.render();
}

function addCard(itemCardTemplate) {
    cardsListElement.prepend(itemCardTemplate);
}

function deleteCard(evt) {
    // console.log('deleteCard(evt) evt.target = ', evt.target)
    const cardCurent = evt.target.closest('.cards__item');
    cardCurent.remove();
}

//ф-я открытия любого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    //вешаем событие на кнопку Esc
    document.addEventListener('keydown', clickEsc);
}
//попап для карточек
function openPopupImage(evt) {
    const curentElement = evt.target;

    curentPopup.querySelector('.popup__img').src = curentElement.src;
    curentPopup.querySelector('.popup__img').alt = curentElement.alt;
    curentPopup.querySelector('.popup__caption').innerText = curentElement.alt;
    openPopup(curentPopup);
}

//Слушатель событий, закрывающий модальное окно по нажатию на Escape
function clickEsc(evt) {
    if (evt.key == 'Escape') {
        closePopup();
    }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    // закрываем popup
    closePopup(evt);
}
function formAddPlaceSubmitHandler(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const placeNameInputValue = placeNameInput.value;
    const placeImgInputValue = placeImgInput.value;
    // Предаем их в создаваймую карточку
    const currentCreateCard = createCardFunction(placeNameInputValue, placeImgInputValue);
    // Добавляем карточку в разметку
    addCard(currentCreateCard);
    //Деактивирую кнопку сабмита и очищать инпуты
    placeNameInput.value = '';
    placeImgInput.value = '';
    popupBtn.classList.add('form__submit_inactive');
    popupBtn.disabled = true;
    // закрываем popup
    closePopup(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditPlaceElement.addEventListener('submit', handleProfileFormSubmit);
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmitHandler);

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener('click', openPopupProfileEdit);
profileBtnAdd.addEventListener('click', openPopupProfileAdd);

//закрытие всех попапов при клике на крестик или оверлай
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
            closePopup(popup);
        }
    });
});