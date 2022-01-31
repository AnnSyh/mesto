"use strict";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((element) => {
      this._formValues[element.name] = element.value;
    });
    return this._formValues;
  }

  _handler = (evt) => {
    this._handleFormSubmit(evt, this.getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handler);
  }

}
