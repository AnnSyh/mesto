'use strict'

export class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._close = this._popupSelector.querySelector('.popup__close');
        this._overlay = this._popupSelector.querySelector('.popup__overlay');
        this._submit = this._popupSelector.querySelector('.popup__btn');
    }

    openPopup() {
        console.log('Popup: openPopup()');
        this._popupSelector.classList.add('popup_opened');
        this._addEventListeners();
        this._handleEscClose();
    }
    _addEventListeners() {
        this._close.addEventListener('click', (evt) => this.closePopup(evt));
        this._overlay.addEventListener('click', (evt) => this.closePopup(evt));

        if (this._submit) { this._submit.addEventListener('click', (evt) => this.closePopup(evt)); }

    }

    closePopup() {
        console.log('Popup: closePopup()');
        const flagOpen = this._popupSelector.classList.contains('popup_opened');
        if (flagOpen) {
            this._popupSelector.classList.remove('popup_opened');
            this._setEventListeners();
        }
    }

    _handleEscClose() {
        //вешаем событие на кнопку Esc
        document.addEventListener('keydown', this._clickEsc);
    }

    _setEventListeners() {
        //снять слушатель с кнопки Esc 
        document.removeEventListener('keydown', this._clickEsc);
    }

    //Слушатель событий, закрывающий модальное окно по нажатию на Escape
    _clickEsc = (evt) => {
        if (evt.key == 'Escape') {
            // this._popupSelector.closePopup();
            this._popupSelector.classList.remove('popup_opened');
        }
    }

}