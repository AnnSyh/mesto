'use strict'

import { configData } from "./configData.js";

const showInputError = (formElement, { inputErrorClass, errorClass }) => {
	const errorElement = formElement.closest('form').querySelector(`.${formElement.id}-error`);

	formElement.classList.add(inputErrorClass);
	errorElement.textContent = formElement.validationMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, { inputErrorClass, errorClass }) => {
	const errorElement = formElement.closest('form').querySelector(`.${formElement.id}-error`);

	formElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, { inputErrorClass, errorClass }) => {

	// console.log('formElement = ', formElement)

	if (!formElement.validity.valid) {
		showInputError(formElement, { inputErrorClass, errorClass });
	} else {
		hideInputError(formElement, { inputErrorClass, errorClass });
	}
};



const setEventListeners = (formElement, { inputSelector, submitButtonSelector,
	inactiveButtonClass, inputErrorClass, errorClass }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);

	inputList.forEach((formElement) => {
		formElement.addEventListener('input', function () {
			checkInputValidity(formElement, { inputErrorClass, errorClass });
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