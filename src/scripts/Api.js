'use strict'

export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._url, { headers: this._headers })
      .then((res) => res.json());
  }

  createCard() {
    return fetch(this._url, { method: 'POST', headers: this._headers })
      .then((res) => res.json());
  }

  deleteCard() {

  }

  // другие методы работы с API
}

