'use strict'

export class UserInfo {

	constructor({ userName, userAbout }) {
		this._userName = userName;
		this._userAbout = userAbout;

	}

	getUserInfo() {
		this._userName.classList.add('userInfo_opened');
		return { userName, userAbout }
	}

	setUserInfo(dataUser) {
		document.querySelector('.profile__name').prepend(dataUser.name);
		document.querySelector('.profile__job').prepend(dataUser.job);
	}



}