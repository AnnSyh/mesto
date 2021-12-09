'use strict'

import { initialCards } from "./initialCards.js";

console.log('initialCards = ', initialCards);

export default class Card {
	constructor(selector) {
		this._selector = selector;
	}

	_getElement() {
		const messageElement = document
			.querySelector(this._selector)
			.content
			.querySelector('.message')
			.cloneNode(true);

		return messageElement;
	}

	_setEventListeners() {
		this._element.querySelector('.message__text').addEventListener('click', () => {
			this._handleClick();
		});
	}

	_handleClick() {
		this._element.querySelector('.message__text').classList.toggle('message__text_is-active');
	}
}