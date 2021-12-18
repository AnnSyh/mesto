'use strict'

export class Card {

	constructor(template, handleCardClick, text, link) {
		this._text = text;
		this._link = link;
		this._template = template;
		this._handleCardClick = handleCardClick;
		// debugger
		this._cardImage = this._template.content.querySelector('.cards__item').querySelector('.cards__img');
		this._trashTemplate = this._template.content.querySelector('.cards__item').querySelector('.cards__trash');
		this._heartTemplate = this._template.content.querySelector('.cards__item').querySelector('.cards__heart');
	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}

	_removeCard = () => {
		this._view.remove();
	}


	_addEventListeners(evt) {
		const imgTemplate = this._view.querySelector('.cards__img');
		const trashTemplate = this._view.querySelector('.cards__trash');
		const heartTemplate = this._view.querySelector('.cards__heart');

		imgTemplate.addEventListener('click', () => this._handleCardClick(this._text, this._link));
		trashTemplate.addEventListener('click', (evt) => this._removeCard(evt));
		heartTemplate.addEventListener('click', (evt) => { heartTemplate.classList.toggle('cards__heart_active') });

	}

	render(container) {
		this._createView();
		this._view.querySelector('.cards__title').innerText = this._text;
		this._view.querySelector('.cards__img').alt = this._text;
		this._view.querySelector('.cards__img').src = this._link;
		this._addEventListeners();

		// container.append(this._view);
		return this._view;

	}

}