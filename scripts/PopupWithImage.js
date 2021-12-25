'use strict'
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

    constructor(popupSelector, text, link) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._img = this._popupSelector.querySelector('.popup__img');
        this._title = this._popupSelector.querySelector('.popup__caption');

        this._text = text;
        this._link = link;

        console.log('PopupWithImage');

    }

    openPopup() {
        // устанавливаем ссылку
        // устанавливаем подпись картинке
        //открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
        this._title.innerText = this._text;
        this._img.alt = this._text;
        this._img.src = this._link;

        this._popupSelector.classList.add('popup_opened');

        this._addEventListeners();
        this._handleEscClose();
    }


}