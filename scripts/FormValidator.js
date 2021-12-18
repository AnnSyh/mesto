'use strict'

export class FormValidator {
	constructor(configData, formElement) {

		this._configData = configData;
		this._formElement = formElement;

		const { formSelector, inputSelector, submitButtonSelector,
			inactiveButtonClass, inputErrorClass, errorClass
		} = configData;

		this._inputSelector = this._formElement.querySelector(inputSelector);
		this._submitButtonSelector = this._formElement.querySelector(submitButtonSelector);

		this._inactiveButtonClass = inactiveButtonClass;
		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;

		this._inputList = this._formElement.querySelectorAll('input');
	}

	_showInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._errorClass);
	};

	_hideInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};

	_checkInputValidity = (inputElement) => {

		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	};

	_setEventListeners = () => {

		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		// чтобы проверить состояние кнопки в самом начале
		this.toggleButtonState(this._inputList);


		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				// чтобы проверять его при изменении любого из 
				this.toggleButtonState(this._inputList);
			});
		});
	};

	enableValidation = () => {
		this._setEventListeners();
	}

	_hasInvalidInput = (inputList) => {
		return Array.from(inputList).some((inputElement) => {
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
		// console.log('resetValidation');
		// console.log('this._inputList = ', this._inputList);
		// debugger

		this._inputList.forEach((inputElement) => {
			// debugger
			console.log('inputElement = ', inputElement);
			console.log('inputElement.val = ', inputElement.value);
			console.log('inputElement.val = ', inputElement.value);
			inputElement.value = "";                // <==очищаем ошибки ==
			this._hideInputError(inputElement);      // <==очищаем ошибки ==
			this.toggleButtonState(this._inputList); // <== управляем кнопкой ==
		});

	}

	toggleButtonState = (inputList) => {
		const isFormValid = this._hasInvalidInput(inputList);
		this._submitButtonSelector.classList.toggle(this._inactiveButtonClass, isFormValid);
		this._submitButtonSelector.disabled = isFormValid;
	};


}