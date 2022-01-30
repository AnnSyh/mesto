"use strict";
import { Popup } from "./Popup.js";

export class PopupConfirmForm extends Popup {
  constructor(popup, handleFormSubmit) {
    console.log('PopupConfirmForm');
    super(popup);
    this._form = this._popup.querySelector("form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _handler = (evt) => {
    this._handleFormSubmit(evt, this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handler);
  }

}
