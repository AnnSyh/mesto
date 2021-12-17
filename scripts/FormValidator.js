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

		this._inputList = this._formElement.querySelectorAll('input');
		// console.log('this._submitButtonSelector  = ', this._submitButtonSelector);
	}

	_showInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
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

		if (!this._inputElement.validity.valid) {
			console.log('_checkInputValidity: inputElement = ', this._inputElement);
			this._showInputError(this._inputElement);
		} else {
			this._hideInputError(this._inputElement);
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
				this._checkInputValidity(inputElement);
				// чтобы проверять его при изменении любого из 
				this.toggleButtonState(inputList, buttonElement, inactiveButtonClass);
			});
		});
	};

	enableValidation = () => {
		this._setEventListeners();
	}

	_hasInvalidInput = (inputList) => {
		return Array.from(inputList).some((inputElement) => {
			return !inputElement.validity.valid;
		}

		);
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
			this._hideInputError(inputElement); // <==очищаем ошибки ==
		});
	}

	toggleButtonState = (inputList, submitButtonSelector, inactiveButtonClass) => {
		const isFormValid = this._hasInvalidInput(inputList);
		this._submitButtonSelector.classList.toggle(this._inactiveButtonClass, isFormValid);
		this._submitButtonSelector.disabled = isFormValid;
	};

}