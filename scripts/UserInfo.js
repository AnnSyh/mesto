'use strict'

export class UserInfo {

	constructor(userNameSelector, userAboutSelector) {
		this._userNameSelector = userNameSelector;
		this._userAboutSelector = userAboutSelector;

		this._containerProfileName = document.querySelector('.' + this._userNameSelector);
		this._containerProfileJob = document.querySelector('.' + this._userAboutSelector);
	}

	getUserInfo() {
		console.log('getUserInfo() = ', this._name, this._about);
		return {
			name: this._name,
			about: this._about
		};
	}

	setUserInfo({ name, about }) {
		this._name = name;
		this._about = about;

		this._containerProfileName.textContent = name;
		this._containerProfileJob.textContent = about;
	}
}