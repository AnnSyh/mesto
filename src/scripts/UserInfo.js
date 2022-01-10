'use strict'

export class UserInfo {

	constructor(userNameSelector, userAboutSelector) {
		this._userNameSelector = userNameSelector;
		this._userAboutSelector = userAboutSelector;

		this._containerProfileName = document.querySelector('.' + this._userNameSelector);
		this._containerProfileJob = document.querySelector('.' + this._userAboutSelector);
	}

	getUserInfo() {
		return {
			name: this._containerProfileName.textContent,
			about: this._containerProfileJob.textContent
		};
	}

	setUserInfo({ name, about }) {
		this._containerProfileName.textContent = name;
		this._containerProfileJob.textContent = about;
	}
}