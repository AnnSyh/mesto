'use strict'
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
        // this._inputList = this._form.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = {};
        this._form.querySelectorAll('.popup__input').forEach(element => {
            this._inputList[element.name] = element.value;
        });
        // debugger
        // console.log('return = ', this._inputList);
        return this._inputList;
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