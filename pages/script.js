"use strict";

const profileBtnEdit = document.querySelector('.profile__btn_edit');
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupInputTitle = document.querySelector('.popup__input_title');
const popupInputSubtitle = document.querySelector('.popup__input_subtitle');

const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__job');

// const popupBtn = document.querySelector('.popup__btn');

profileBtnEdit.addEventListener("click", function () {
    popupInputTitle.value = profileTitle.innerText;
    popupInputSubtitle.value = profileSubtitle.innerText;
    popup.classList.toggle('popup_opened');
});
popupClose.addEventListener("click", function () {
    popup.classList.toggle('popup_opened');
});
// Находим сам попап
let popupElement = document.querySelector('.popup');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_title');
let jobInput = document.querySelector('.popup__input_subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputNew = nameInput.value;
    let jobInputNew = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputNew;
    profileJob.textContent = jobInputNew;

    //закрыть popup
    popupElement.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
