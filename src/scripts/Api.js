'use strict'

const onError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject('Something went wrong!');
};

export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUser() {
    return fetch(this._url, {
      headers: this._headers,
      body: JSON.stringify()
    })
      .then(onError);
  }
  postUser(){

  }

  getInitialCards() {
    return fetch(this._url, { headers: this._headers })
      .then(onError);
  }

  createCard(card) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(onError);
  }

  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  // другие методы работы с API
}

