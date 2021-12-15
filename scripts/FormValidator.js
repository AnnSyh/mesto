'use strict'

export class FormValidator {
	constructor(configData, formElement) {
		this._configData = configData;
		this._formElement = formElement;
	}

	_showInputError = (inputElement, { inputErrorClass, errorClass }) => {
		const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(errorClass);
	};

	_hideInputError = (inputElement, { inputErrorClass, errorClass }) => {
		const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

		inputElement.classList.remove(inputErrorClass);
		errorElement.classList.remove(errorClass);
		errorElement.textContent = '';
	};

	_checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, { inputErrorClass, errorClass });
		} else {
			this._hideInputError(inputElement, { inputErrorClass, errorClass });
		}
	};

	_setEventListeners = (formElement, { inputSelector, submitButtonSelector,
		inactiveButtonClass, inputErrorClass, errorClass }) => {
		const inputList = Array.from(formElement.querySelectorAll(inputSelector));
		const buttonElement = formElement.querySelector(submitButtonSelector);
		// чтобы проверить состояние кнопки в самом начале
		this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement, { inputErrorClass, errorClass });
				// чтобы проверять его при изменении любого из полей
				this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
			});
		});
	};

	enableValidation = (configData) => {
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
			this._setEventListeners(formElement, newObj)
		});
	};

	_hasInvalidInput = (inputList) => {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	};

	_hasEmptyInput = (inputList) => {
		return inputList.some((inputElement) => {
			return inputElement.validity.valueMissing;
		})
	};

	_toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
		const isFormValid = this._hasInvalidInput(inputList);
		buttonElement.classList.toggle(inactiveButtonClass, isFormValid);
		buttonElement.disabled = isFormValid;
	};
}