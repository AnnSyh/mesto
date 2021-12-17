'use strict'

export class FormValidator {
	constructor(configData, formElement) {

		this._configData = configData;
		this._formElement = formElement;

		const { formSelector, inputSelector, submitButtonSelector,
			inactiveButtonClass, inputErrorClass, errorClass
		} = configData;

		// console.log('formElement = ', formElement);
		// console.log('this._formElement = ', this._formElement);
		// console.log('this._formElement.querySelector = ', this._formElement.innerHTML.);

		this._inputSelector = this._formElement.querySelector(inputSelector);
		this._submitButtonSelector = this._formElement.querySelector(submitButtonSelector);
		this._inactiveButtonClass = this._formElement.querySelector(inactiveButtonClass);

		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;

		this._inputList = Array.from(this._formElement.querySelectorAll('input'));
		// console.log('this._submitButtonSelector  = ', this._submitButtonSelector);

		console.log('inputErrorClass =', this._inputErrorClass);
		console.log('errorClass =', this._errorClass);
	}

	_showInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._errorClass);
	};

	_hideInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		console.log('errorElement = ', errorElement);
		console.log('errorClass = ', this._errorClass);
		debugger
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};

	_checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {

		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	};

	_setEventListeners = () => {
		// const { formSelector, inputSelector, submitButtonSelector,
		// 	inactiveButtonClass, inputErrorClass, errorClass
		// } = this._configData
		// const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
		// const buttonElement = this._formElement.querySelector(submitButtonSelector);

		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		// чтобы проверить состояние кнопки в самом начале
		this.toggleButtonState(this._inputList, this._buttonElement, this._inactiveButtonClass);

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {

				console.log('inputErrorClass = ', inputErrorClass);
				console.log('errorClass = ', errorClass);

				this._checkInputValidity(inputElement, { inputErrorClass, errorClass });
				// чтобы проверять его при изменении любого из полей
				this.toggleButtonState(inputList, buttonElement, inactiveButtonClass);
			});
		});
	};

	enableValidation = () => {
		this._setEventListeners();
	}

	_hasInvalidInput = (inputList) => {
		// console.log('_hasInvalidInput: inputList = ', inputList);
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	};

	_hasEmptyInput = (inputList) => {
		return inputList.some((inputElement) => {
			return inputElement.validity.valueMissing;
		});
	};

	//В нем Вы будете пробегаться по  this._inputList и очищать ошибки с инпутов.
	resetValidation = () => {

		this.toggleButtonState(this._inputList, this._submitButtonSelector, this._inactiveButtonClass); // <== управляем кнопкой ==

		this._inputList.forEach((inputElement) => {
			// debugger
			console.log('inputErrorClass =', this._inputErrorClass);
			console.log('errorClass =', this._errorClass);

			this._hideInputError(inputElement); // <==очищаем ошибки ==
		});
	}

	toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
		console.log('this._submitButtonSelector  = ', this._submitButtonSelector);
		// debugger
		const isFormValid = this._hasInvalidInput(inputList);
		console.log('isFormValid = ', isFormValid);
		this._submitButtonSelector.classList.toggle(this._inactiveButtonClass, isFormValid);
		// console.log('inactiveButtonClass = ', inactiveButtonClass);
		this._submitButtonSelector.disabled = isFormValid;
	};

}