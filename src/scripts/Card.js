'use strict'

export class Card {
	constructor(template, handleCardClick, openConfirm, closeConfirm, text, link, owner, api) {
		this._text = text;
		this._link = link;
		this._template = template;
		this._handleCardClick = handleCardClick;
		this._owner = owner;
		this._openConfirm = openConfirm;
		this._closeConfirm = closeConfirm;
		this._api = api;
	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}

	_removeCard = (evt) => {
		this._openConfirm();
		const confirmBtn = document.querySelector('.confirmation-btn');
		confirmBtn.addEventListener('click', (evt) => {
			evt.preventDefault();//открываем окно подтверждения
			// debugger
			this._view.remove(); //удаляем карточку
			this._closeConfirm();//закрываем окно подтверждения
		});
	}

	setEventListeners() {
		// debugger
		this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
		this._trash.addEventListener('click', (evt) => this._removeCard(evt));
		this._heart.addEventListener('click', () => { this._heart.classList.toggle('cards__heart_active') });
	}

	render() {
		this._createView();

		// console.log('',owner._id === user._id);

		this._image = this._view.querySelector('.cards__img');
		this._trash = this._view.querySelector('.cards__trash');
		this._heart = this._view.querySelector('.cards__heart');
		this._title = this._view.querySelector('.cards__title');

		this._title.innerText = this._text;
		this._image.alt = this._text;
		this._image.src = this._link;

		this.setEventListeners();

		return this._view;
	}

}