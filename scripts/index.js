'use strict'

import { initialCards } from "./initialCards.js";

// находим список в кот надо встаивть карточки
const cardsList = document.querySelector('.cards__list')
// находим кнопки кот вызывают всплытие/закрытие окна редактирования
const profileBtnEdit = document.querySelector('.profile__btn_user-edit')
// находим кнопки кот вызывают всплытие/закрытие окна добавления карточки
const profileBtnAdd = document.querySelector('.profile__btn_user-add')
// Находим сам попап
const popupEditProfile = document.querySelector('.edit-profile__popup')
const popupAddPlaceElement = document.querySelector('.add-plaсe__popup')
// Находим форму в DOM
const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form')
const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form')
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_user-title')
const jobInput = document.querySelector('.popup__input_user-subtitle')
const placeNameInput = document.querySelector('.popup__input_plaсe-title')
const placeImgInput = document.querySelector('.popup__input_plaсe-img')
// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const template = document.querySelector('.template')
//Находим кнопку 'Сохранить' в форме 
const popupBtn = document.querySelector('.popup__btn')
// находим все попапы 
const popups = document.querySelectorAll('.popup')

function addCardsFromArray(data) {
    data.forEach(function (item) {
        const currentCard = createCard(item.name, item.link);
        addCard(currentCard)
    });
}

function addListenersToCard(itemCardTemplate) {
    const imgTemplate = itemCardTemplate.querySelector('.cards__img')
    const trashTemplate = itemCardTemplate.querySelector('.cards__trash')
    const heartTemplate = itemCardTemplate.querySelector('.cards__heart')

    trashTemplate.addEventListener('click', deleteCard)
    heartTemplate.addEventListener('click', function () {
        this.classList.toggle('cards__heart_active')
    })
    imgTemplate.addEventListener('click', openPopupImage)
}

function createCard(name, src) {
    const itemCardTemplate = template.content.querySelector('.cards__item').cloneNode(true)
    const imgTemplate = itemCardTemplate.querySelector('.cards__img')
    const titleTemplate = itemCardTemplate.querySelector('.cards__title')

    imgTemplate.src = src
    imgTemplate.alt = name
    titleTemplate.textContent = name
    addListenersToCard(itemCardTemplate)

    return itemCardTemplate
}

function addCard(itemCardTemplate) {
    cardsList.prepend(itemCardTemplate)
}

function deleteCard(evt) {
    console.log('deleteCard(evt) evt.target = ', evt.target)
    const cardCurent = evt.target.closest('.cards__item')
    cardCurent.remove()
}
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
        popup.classList.remove('popup_opened')
    }
};

//Слушатель событий, закрывающий модальное окно по нажатию на Escape
function clickEsc(evt) {
    if (evt.key == 'Escape') {
        closePopup()
    }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value
    const jobInputValue = jobInput.value
    // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue
    profileJob.textContent = jobInputValue
    // закрываем popup
    closePopup(evt)
}
function formAddPlaceSubmitHandler(evt) {
    evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const placeNameInputValue = placeNameInput.value
    const placeImgInputValue = placeImgInput.value
    // Предаем их в создаваймую карточку
    const currentCreateCard = createCard(placeNameInputValue, placeImgInputValue)
    // Добавляем карточку в разметку
    addCard(currentCreateCard)
    //Деактивирую кнопку сабмита и очищать инпуты
    placeNameInput.value = '';
    placeImgInput.value = '';
    popupBtn.classList.add('form__submit_inactive');
    popupBtn.disabled = true;
    // закрываем popup
    closePopup(evt)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditPlaceElement.addEventListener('submit', formSubmitHandler)
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmitHandler)

//вешаем событие на кнопки
profileBtnEdit.addEventListener('click', openPopupProfileEdit)
profileBtnAdd.addEventListener('click', openPopupProfileAdd)

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
            closePopup(popup)
        }
    })
})

addCardsFromArray(initialCards)
