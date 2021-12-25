'use strict'
import { Popup } from './Popup.js';
import { FormValidator } from "./FormValidator.js";

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleProfileFormSubmit, hanldeAddPlaceSubmit) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._close = this._popupSelector.querySelector('.popup__close');
        this._overlay = this._popupSelector.querySelector('.popup__overlay');
        this._submit = this._popupSelector.querySelector('.popup__btn');
        this._form = this._popupSelector.querySelector('.form');

        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._hanldeAddPlaceSubmit = hanldeAddPlaceSubmit;

        // this._getInputValues();
    }

    _getInputValues() {
        Array.from(this._form.elements).forEach(element => {
            console.log('form.element = ', element);
        });
    }

    _addEventListeners() {
        this._close.addEventListener('click', (evt) => this.closePopup(evt));
        this._overlay.addEventListener('click', (evt) => this.closePopup(evt));
        this._submit.addEventListener('click', (evt) => this.closePopup(evt));

        if (this._form.name == 'edit-profile') {
            console.log('edit-profile');
            this._submit.addEventListener('submit', this._handleProfileFormSubmit);
        } else if (this._form.name == 'add-place') {
            console.log('add-place');
            this._submit.addEventListener('submit', this._hanldeAddPlaceSubmit);
        }
    }

    // closePopup() {
    //     console.log('PopupWithForm: closePopup()');
    // }

}