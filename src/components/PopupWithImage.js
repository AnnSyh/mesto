'use strict'
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

    constructor(popup, text, link) {
        super(popup);
        this._popup = popup;
        this._img = this._popup.querySelector('.popup__img');
        this._title = this._popup.querySelector('.popup__caption');

        // debugger;

        this._text = text;
        this._link = link;
    }

    openPopup(text, link) {
        super.openPopup();
        // устанавливаем ссылку
        // устанавливаем подпись картинке
        //открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
        this._title.innerText = text;
        this._img.alt = text;
        this._img.src = link;
    }
}
