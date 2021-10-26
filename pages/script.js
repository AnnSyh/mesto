"use strict";

const profileBtnEdit = document.querySelector('.profile__btn_edit');
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupInputTitle = document.querySelector('.popup__input_title');
const popupInputSubtitle = document.querySelector('.popup__input_subtitle');

const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');

profileBtnEdit.addEventListener("click", function () {
	popupInputTitle.value = profileTitle.innerText;
	popupInputSubtitle.value = profileSubtitle.innerText;
	popup.classList.toggle('popup_opened');
});
popupClose.addEventListener("click", function () {
	popup.classList.toggle('popup_opened');
});

form.onsubmit = function () {
	console.log('form.onsubmit');
	// Находим форму в DOM
	let formElement = document.querySelector('.popup__form');
	// Находим поля формы в DOM
	let nameInput = document.querySelector('.popup__input_title');
	let jobInput = document.querySelector('.popup__input_subtitle');

	// Обработчик «отправки» формы, хотя пока
	// она никуда отправляться не будет
	function formSubmitHandler(evt) {
		console.log('formSubmitHandler');
		evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
		// Так мы можем определить свою логику отправки.
		// О том, как это делать, расскажем позже.

		// Получите значение полей jobInput и nameInput из свойства value
		console.log('jobInput.value = ', jobInput.value);
		console.log('nameInput.value = ', nameInput.value);

		// Выберите элементы, куда должны быть вставлены значения полей
		const profileName = document.querySelector('.profile__name');
		const profileJob = document.querySelector('.profile__job');

		// Вставьте новые значения с помощью textContent
		profileName.value = nameInput.value;
		profileJob.value = jobInput.value;
	}

	// Прикрепляем обработчик к форме:
	// он будет следить за событием “submit” - «отправка»
	formElement.addEventListener('submit', formSubmitHandler);
};