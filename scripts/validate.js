'use strict'

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

	inputElement.classList.add('popup__input_type-error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

	inputElement.classList.remove('popup__input_type-error');
	errorElement.classList.remove('popup__input-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__btn');
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(inputList, buttonElement);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(inputList, buttonElement);
		});
	});
};

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		setEventListeners(formElement)
	});
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		// console.log('!inputElement.validity.valid = ', !inputElement.validity.valid)

		return !inputElement.validity.valid;
	})
};

const hasEmptyInput = (inputList) => {

	return inputList.some((inputElement) => {
		// console.log('inputElement.validity.valueMissing = ', inputElement.validity.valueMissing)
		return inputElement.validity.valueMissing;
	})
};

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		// console.log('hasInvalidInput')
		buttonElement.classList.add('form__submit_inactive');
		buttonElement.setAttribute('disabled', 'disabled')
	} else {
		// console.log('not hasInvalidInput')
		buttonElement.classList.remove('form__submit_inactive');
		buttonElement.removeAttribute('disabled')
	}
	// console.log('after if hasInvalidInput')
};

enableValidation();

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
// 	formSelector: '.popup__form',
// 	inputSelector: '.popup__input',
// 	submitButtonSelector: '.popup__button',
// 	inactiveButtonClass: 'popup__button_disabled',
// 	inputErrorClass: 'popup__input_type-error',
// 	errorClass: 'popup__error_visible'
// });