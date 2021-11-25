'use strict'

const inputData = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'popup__input_type-error',
	errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

	// inputElement.classList.add('popup__input_type-error');
	inputElement.classList.add(inputData.inputErrorClass);
	errorElement.textContent = errorMessage;
	// errorElement.classList.add('popup__input-error_active');
	errorElement.classList.add(inputData.errorClass);
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

	inputElement.classList.remove(inputData.inputErrorClass);
	errorElement.classList.remove(inputData.errorClass);
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
	// const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const inputList = Array.from(formElement.querySelectorAll(inputData.inputSelector));
	// const buttonElement = formElement.querySelector('.popup__btn');
	const buttonElement = formElement.querySelector(inputData.submitButtonSelector);
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

const enableValidation = (inputData) => {
	// const formList = Array.from(document.querySelectorAll('.popup__form'));
	const formList = Array.from(document.querySelectorAll(inputData.formSelector));

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		setEventListeners(formElement)
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

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(inputData.inactiveButtonClass);
		buttonElement.setAttribute('disabled', 'disabled')
	} else {
		buttonElement.classList.remove(inputData.inactiveButtonClass);
		buttonElement.removeAttribute('disabled')
	}
};

enableValidation(inputData);