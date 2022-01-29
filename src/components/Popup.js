"use strict";

export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._close = this._popup.querySelector(".popup__close");
    this._overlay = this._popup.querySelector(".popup__overlay");
    this._submit = this._popup.querySelector(".popup__btn");
    this._handleEscClose = this._handleEscClose.bind(this); // <==== привязали 1 раз ===
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose); // <=== только cсылку передаете ==
  }
  setEventListeners() {
    this._close.addEventListener("click", (evt) => this.closePopup(evt));
    this._overlay.addEventListener("click", (evt) => this.closePopup(evt));
    // this._handleEscClose();
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); // <==== такая же ссылка должна быть
  }

  _handleEscClose(evt) {
    //вешаем слушатель событий, закрывающий модальное окно по нажатию на Escape
    if (evt.key == "Escape") {
      this.closePopup();
    }
  }
}
