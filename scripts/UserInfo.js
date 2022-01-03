'use strict'

export class UserInfo {

	constructor(userName, userAbout) {
		this._userName = userName;
		this._userAbout = userAbout;

	}

	getUserInfo() {
		// debugger
		const UserInfo = [];
		UserInfo.name = this._userName;
		UserInfo.about = this._userAbout;
		return UserInfo;
	}

	setUserInfo(dataUser) {
		document.querySelector('.profile__name').prepend(dataUser.name);
		document.querySelector('.profile__job').prepend(dataUser.job);
	}



}