'use strict'

export class Card {

	constructor(template, handleCardClick, text, link) {
		this._text = text;
		this._link = link;
		this._template = template;
		this._handleCardClick = handleCardClick;

		// debugger
	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}

	_removeCard = () => {
		this._view.remove();
		// this._element = null;
	}

	setEventListeners() {
		// debugger
		this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
		this._trash.addEventListener('click', (evt) => this._removeCard(evt));
		this._heart.addEventListener('click', () => { this._heart.classList.toggle('cards__heart_active') });
	}

	render() {
		this._createView();

		this._image = this._view.querySelector('.cards__img');
		this._trash = this._view.querySelector('.cards__trash');
		this._heart = this._view.querySelector('.cards__heart');
		this._title = this._view.querySelector('.cards__title');

		this._title.innerText = this._text;
		this._image.alt = this._text;
		this._image.src = this._link;

		this.setEventListeners();

		// container.append(this._view);
		return this._view;
	}

}