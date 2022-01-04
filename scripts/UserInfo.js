'use strict'

export class UserInfo {

	constructor(userNameSelector, userAboutSelector) {
		this._userNameSelector = userNameSelector;
		this._userAboutSelector = userAboutSelector;

		// debugger
		this._containerProfileName = document.querySelector('.' + this._userNameSelector);
		this._containerProfileJob = document.querySelector('.' + this._userAboutSelector);

		this._inputUserTitleElement = document.querySelector('.popup__input_user-title');
		this._containerProfileJobElement = document.querySelector('.popup__input_user-subtitle');

		this._name = null;
		this._about = null;
	}

	getUserInfo() {
		console.log('getUserInfo() = ', this._name, this._about);
		return {
			name: this._name,
			about: this._about
		};
	}

	setUserInfo({ name, about }) {
		debugger
		this._name = name;
		this._about = about;

		console.log('this._containerProfileName = ', this._containerProfileName);
		console.log('this._containerProfileJob = ', this._containerProfileJob);

		this._containerProfileName.textContent = name;
		this._containerProfileJob.textContent = about;
	}
}