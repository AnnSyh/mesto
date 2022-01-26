'use strict'

export class UserInfo {

	constructor(userNameSelector, userAboutSelector) {
		this._userNameSelector = userNameSelector;
		this._userAboutSelector = userAboutSelector;
		this._userAvatarSelector = document.querySelector('.profile__img');

		this._containerProfileName = document.querySelector('.' + this._userNameSelector);
		this._containerProfileJob = document.querySelector('.' + this._userAboutSelector);
// console.log('getUserInfo(): this = ',this);
	}

	getUserInfo() {
		return {
			name: this._containerProfileName.textContent,
			about: this._containerProfileJob.textContent,

		};
	}

	getUserAvatar() {
		return {
			avatar: this._userAvatarSelector.src,
		};
	}

	setUserInfo({ name, about }) {
		this._containerProfileName.textContent = name;
		this._containerProfileJob.textContent = about;
	}

	setUserAvatar( avatar ) {
		this._userAvatarSelector.src = avatar;
	}
}
