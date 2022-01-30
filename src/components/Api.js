'use strict'

const handleError = res => {
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
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      body: JSON.stringify()
    })
      .then(handleError);
  }


  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(handleError);
  }



  postUser(user){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(handleError);
  }
  postAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar['avatar-src']
      })
    })
      .then(handleError);
  }


  postCreateCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(handleError);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(handleError);
  }

  postLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(handleError);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(handleError);
  }

}
