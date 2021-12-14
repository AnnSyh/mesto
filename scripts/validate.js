'use strict'

import { configData } from "./configData.js";

// Находим форму в DOM
const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form');
const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_user-title');
const jobInput = document.querySelector('.popup__input_user-subtitle');
const placeNameInput = document.querySelector('.popup__input_plaсe-title');
const placeImgInput = document.querySelector('.popup__input_plaсe-img');

// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const template = document.querySelector('.card-template');
// находим список в кот надо встаивть карточки
const cardsList = document.querySelector('.cards__list');
//Находим кнопку 'Сохранить' в форме 
const popupBtn = document.querySelector('.popup__btn');
// находим все попапы 
const popups = document.querySelectorAll('.popup');

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

function closePopup(evt) {
	const popup = document.querySelector('.popup_opened');
	if (popup) {
		popup.classList.remove('popup_opened');
		//снять слушатель с кнопки Esc 
		document.removeEventListener('keydown', clickEsc);
	}
};

function addListenersToCard(itemCardTemplate) {
	const imgTemplate = itemCardTemplate.querySelector('.cards__img');
	const trashTemplate = itemCardTemplate.querySelector('.cards__trash');
	const heartTemplate = itemCardTemplate.querySelector('.cards__heart');

	trashTemplate.addEventListener('click', deleteCard);
	heartTemplate.addEventListener('click', function () {
		this.classList.toggle('cards__heart_active');
	});
	imgTemplate.addEventListener('click', openPopupImage);
}

function createCard(name, src) {
	debugger
	const itemCardTemplate = template.content.querySelector('.cards__item').cloneNode(true);
	const imgTemplate = itemCardTemplate.querySelector('.cards__img');
	const titleTemplate = itemCardTemplate.querySelector('.cards__title');

	imgTemplate.src = src;
	imgTemplate.alt = name;
	titleTemplate.textContent = name;
	addListenersToCard(itemCardTemplate);

	return itemCardTemplate;
}
function addCard(itemCardTemplate) {
	cardsList.prepend(itemCardTemplate);
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
	const curentElement = evt.target
	const curentPopup = document.querySelector('.open-img__popup');

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
function formSubmitHandler(evt) {
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
	const currentCreateCard = createCard(placeNameInputValue, placeImgInputValue);
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
formEditPlaceElement.addEventListener('submit', formSubmitHandler);
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmitHandler);

// -------------validate.js--------------------------------

const showInputError = (inputElement, { inputErrorClass, errorClass }) => {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = inputElement.validationMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, { inputErrorClass, errorClass }) => {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {
	if (!inputElement.validity.valid) {
		showInputError(inputElement, { inputErrorClass, errorClass });
	} else {
		hideInputError(inputElement, { inputErrorClass, errorClass });
	}
};



const setEventListeners = (formElement, { inputSelector, submitButtonSelector,
	inactiveButtonClass, inputErrorClass, errorClass }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(inputElement, { inputErrorClass, errorClass });
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
	});
};

const enableValidation = (configData) => {
	const { formSelector, inputSelector, submitButtonSelector,
		inactiveButtonClass, inputErrorClass, errorClass
	} = configData
	const formList = Array.from(document.querySelectorAll(formSelector));

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		const newObj = {
			inputSelector, submitButtonSelector,
			inactiveButtonClass, inputErrorClass, errorClass
		}
		setEventListeners(formElement, newObj)
	});
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const hasEmptyInput = (inputList) => {
	return inputList.some((inputElement) => {
		return inputElement.validity.valueMissing;
	})
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	const isFormValid = hasInvalidInput(inputList);
	buttonElement.classList.toggle(inactiveButtonClass, isFormValid);
	buttonElement.disabled = isFormValid;
};

enableValidation(configData);