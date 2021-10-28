"use strict";

let profileBtnEdit = document.querySelector('.profile__btn_edit');
let popupClose = document.querySelector('.popup__close');

// Находим сам попап
let popupElement = document.querySelector('.popup');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_title');
let jobInput = document.querySelector('.popup__input_subtitle');

function openPopup() {
    const nameInput = document.querySelector('.popup__input_title');
    const jobInput = document.querySelector('.popup__input_subtitle');
    const profileTitle = document.querySelector('.profile__name');
    const profileSubtitle = document.querySelector('.profile__job');
    nameInput.value = profileTitle.innerText;
    jobInput.value = profileSubtitle.innerText;
    popupElement.classList.add('popup_opened');
};

function closePopup() {
    const popupElement = document.querySelector('.popup');
    popupElement.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выбераем элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    //закрываем popup
    popupElement.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

profileBtnEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
