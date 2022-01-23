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
  postUser(user){
    console.log('postUser(user)');
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(onError);
  }

  getInitialCards() {
    return fetch(this._url, { headers: this._headers })
      .then(onError);
  }

  postCreateCard(card) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(onError);
  }

  deleteCard(id) {
    console.log('deleteCard(id)');
    // debugger
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  // другие методы работы с API
}
