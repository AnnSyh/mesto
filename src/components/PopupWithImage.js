"use strict";
import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popup, text, link) {
    super(popup);
    this._img = this._popup.querySelector(".popup__img");
    this._title = this._popup.querySelector(".popup__caption");
    this._text = text;
    this._link = link;
  }

  openPopup(text, link) {
    super.openPopup();
    this._title.innerText = text; // устанавливаем подпись картинке
    this._img.alt = text; // устанавливаем alt картинке
    this._img.src = link; // устанавливаем ссылку
  }
}
