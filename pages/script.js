"use strict";
//находим кнопки кот вызывают всплытие/закрытие окна редактирования
let profileBtnEdit = document.querySelector('.profile__btn_user_edit');
let popupClose = document.querySelector('.popup__close');
// Находим сам попап
let popupElement = document.querySelector('.popup');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_title');
let jobInput = document.querySelector('.popup__input_subtitle');
// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopup() {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
    popupElement.classList.add('popup_opened');
};

function closePopup() {
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
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    //закрываем popup
    // popupElement.classList.remove('popup_opened');
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

profileBtnEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
