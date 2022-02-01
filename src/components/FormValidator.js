'use strict'

export class FormValidator {
	constructor(configData, formElement) {

		this._configData = configData;
		this._formElement = formElement;

		const { formSelector, inputSelector, submitButtonSelector,
			inactiveButtonClass, inputErrorClass, errorClass
		} = configData;

		this._submitButton = this._formElement.querySelector(submitButtonSelector);

		this._inactiveButtonClass = inactiveButtonClass;
		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;

		this._inputList = this._formElement.querySelectorAll(inputSelector);
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
		// this.toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				// чтобы проверять его при изменении любого из
				this.toggleButtonState();
			});
		});
	};

	enableValidation = () => {
		this._setEventListeners();
	}

	_hasInvalidInput = () => {
		return Array.from(this._inputList).some((inputElement) => {
			return !inputElement.validity.valid;
		});
	};

	_hasEmptyInput = () => {
		return this._inputList.some((inputElement) => {
			return inputElement.validity.valueMissing;
		});
	};

	//В нем Вы будете пробегаться по  this._inputList и очищать ошибки с инпутов.
	resetValidation = () => {
		this._formElement.reset(); // <==очищаем форму ==
		this.toggleButtonState(); // <== управляем кнопкой ==
		//Очищаем ошибки
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
	};

	toggleButtonState = () => {
		const isFormValid = this._formElement.checkValidity(); // флаг валидности формы
		// const isFormValid = this._hasInvalidInput();// флаг валидности формы
		this._submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid); //переключение класса активности кнопки сабмита в зависимости от флага валидности формы
		this._submitButton.disabled = !isFormValid;// отключение самой активности сабмита
	};


}
