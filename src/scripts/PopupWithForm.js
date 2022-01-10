'use strict'
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
        this._formValues = this._form.elements;

        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        Array.from(this._form.elements).forEach(element => {
            this._formValues[element.name] = element.value;
        });
        // debugger
        return this._formValues;
    }

    _handler = (evt) => {
        this._handleFormSubmit(evt, this._getInputValues());
        this._closePopup()
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handler);
    }

    _closePopup() {
        super.closePopup();
        this._form.reset();
    }
}