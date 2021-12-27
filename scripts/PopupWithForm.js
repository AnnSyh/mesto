'use strict'
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

    constructor(popupSelector, handleProfileFormSubmit, hanldeAddPlaceFormSubmit) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._close = this._popupSelector.querySelector('.popup__close');
        this._overlay = this._popupSelector.querySelector('.popup__overlay');
        this._submit = this._popupSelector.querySelector('.popup__btn');
        this._form = this._popupSelector.querySelector('.form');

        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._hanldeAddPlaceFormSubmit = hanldeAddPlaceFormSubmit;

        // debugger
        // this._getInputValues();
    }
    getInputValues() {
        const rezultArrayProfiles = [];
        const rezultArrayPlaces = [];
        var name, job, placeTitle, plaсeImg;
        Array.from(this._form.elements).forEach(element => {

            if (element.id == "user-title") { name = element.value; }
            if (element.id == "user-subtitle") { job = element.value; }
            if (element.id == "place-title-input") { placeTitle = element.value; }
            if (element.id == "plaсe-img-input") { plaсeImg = element.value; }
        });
        rezultArrayProfiles.push({ name, job });
        rezultArrayPlaces.push({ placeTitle, plaсeImg });
        console.log('rezultArrayProfiles = ', rezultArrayProfiles);
        // console.log('rezultArrayPlaces = ', rezultArrayPlaces);
    }

    _addEventListeners() {
        this._close.addEventListener('click', (evt) => this.closePopup(evt));
        this._overlay.addEventListener('click', (evt) => this.closePopup(evt));
        this._submit.addEventListener('click', (evt) => this.closePopup(evt));

        if (this._form.name == 'edit-profile') {
            console.log('edit-profile');
            debugger
            // this._getInputValues();
            // this._submit.addEventListener('submit', this._handleProfileFormSubmit);
            this._submit.addEventListener('submit', () => {
                console.log('_addEventListeners(): submit');
                this._handleProfileFormSubmit(this._getInputValues());
            });
        } else if (this._form.name == 'add-place') {
            console.log('add-place');
            this._submit.addEventListener('submit', this._hanldeAddPlaceFormSubmit);
        }
    }


}