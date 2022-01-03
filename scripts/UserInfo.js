'use strict'

export class UserInfo {

	constructor(userName, userAbout) {
		this._userName = userName;
		this._userAbout = userAbout;

		this._containerProfileName = document.querySelector('.profile__name');
		this._containerProfileJob = document.querySelector('.profile__job');

		this._inputUserTitleElement = document.querySelector('.popup__input_user-title');
		this._inputUserSubtitleElement = document.querySelector('.popup__input_user-subtitle');

		this._name = null;
		this._about = null;
	}

	updateUserInfo() {
		this._containerProfileName.textContent = this._userName;
		this._containerProfileJob.textContent = this._userAbout;
	}

	getUserInfo() {
		return {
			name: this._userName,
			about: this._userAbout
		};
	}

	setUserInfo({ name, about }) {
		// debugger
		this._name = name;
		this._about = about;
	}



}