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
    console.log('getUser()');
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      body: JSON.stringify()
    })
      .then(onError);
  }
  postUser(user){
    console.log('postUser(user)');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(onError);
  }
  postAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar['avatar-src']
      })
    })
      .then(onError);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(onError);
  }

  postCreateCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(onError);
  }

  deleteCard(id) {
    console.log('deleteCard(id)');
    // debugger
    console.log('url = ',`${this._url}/${id}`);
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  postLike(id) {
    // console.log('url = ',`${this._url}/${id}/likes`);
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(onError);
  }

  deleteLike(id) {
    // debugger
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(onError);
  }

  // другие методы работы с API
}
