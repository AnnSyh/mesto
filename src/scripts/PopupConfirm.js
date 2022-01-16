'use strict'
import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._confirm = true;

    console.log('PopupConfirm');


    // debugger;

  }


}