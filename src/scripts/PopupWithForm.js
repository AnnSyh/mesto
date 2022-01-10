'use strict'
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleProfileFormSubmit, hanldeAddPlaceFormSubmit) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
        this._formValues = this._form.elements;

        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._hanldeAddPlaceFormSubmit = hanldeAddPlaceFormSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        Array.from(this._form.elements).forEach(element => {
            this._formValues[element.name] = element.value;
        });
        // console.log('this._formValues = ', this._formValues);
        return this._formValues;
    }

    _handlerEditProfile = (evt) => {
        this._handleProfileFormSubmit(evt, this._getInputValues());
        this._closePopup(evt);
    };

    _handlerAddPlace = (evt) => {
        this._hanldeAddPlaceFormSubmit(evt, this._getInputValues());
        this._closePopup(evt);
    };


    setEventListeners() {
        super.setEventListeners();

        if (this._form.name == 'edit-profile') {
            // Прикрепляем обработчик к форме:
            this._form.addEventListener('submit', this._handlerEditProfile);

        } else if (this._form.name == 'add-place') {
            // Прикрепляем обработчик к форме:
            this._form.addEventListener('submit', this._handlerAddPlace);
        }
    }

    _closePopup() {
        super.closePopup();
        this._form.reset();
    }
}