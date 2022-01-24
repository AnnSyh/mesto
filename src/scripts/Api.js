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

    console.log('this._url = ',this._url);
  }

  getUser() {
    return fetch(this._url, {
      headers: this._headers,
      body: JSON.stringify()
    })
      .then(onError);
  }
  postUser(user){
    console.log('Api: postUser(user)');
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(onError);
  }
  postAvatar(avatar){
    console.log('Api: postAvatar(avatar)  this._url = ',this._url);
    console.log('Api: postAvatar(avatar)  avatar = ',avatar);
    console.log('Api: postAvatar(avatar): avatar.avatar-src = ',avatar['avatar-src']);

    return fetch(`${this._url}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar['avatar-src'])
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
    console.log('url = ',`${this._url}/${id}`);
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  postLike(id) {
    console.log(' postLike(id)');
    debugger
    console.log('url = ',`${this._url}/${id}/likes`);
    return fetch(`${this._url}/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(onError);
  }

  deleteLike(id) {
    console.log(' deleteLike(id)');
    // debugger
    return fetch(`${this._url}/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(onError);
  }

  // другие методы работы с API
}
