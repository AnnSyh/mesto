'use strict'

export class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._close = this._popupSelector.querySelector('.popup__close');
        this._overlay = this._popupSelector.querySelector('.popup__overlay');
        this._submit = this._popupSelector.querySelector('.popup__btn');
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
    }
    setEventListeners() {
        this._close.addEventListener('click', (evt) => this.closePopup(evt));
        this._overlay.addEventListener('click', (evt) => this.closePopup(evt));
        this._handleEscClose();
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscClose() {
        //вешаем событие на кнопку Esc
        document.addEventListener('keydown', this._clickEsc);
    }

    _removeEventListeners() {
        //снять слушатель с кнопки Esc 
        document.removeEventListener('keydown', this._clickEsc);
    }

    //Слушатель событий, закрывающий модальное окно по нажатию на Escape
    _clickEsc = (evt) => {
        if (evt.key == 'Escape') {
            this.closePopup();
        }
    }

}