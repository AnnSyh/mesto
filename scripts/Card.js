'use strict'

export class Card {
	static template = document.querySelector('.card-template').content;

	constructor(text, link) {
		this._text = text;
		this._link = link;
		// this._removeCard = this._removeCard.bind(this);
	}

	_createView() {
		// this._view = this._template.cloneNode(true);
		this._view = Card.template.querySelector('.cards__item').cloneNode(true);
	}

	_addCard(CardTemplate) {
		cardsList.prepend(CardTemplate);
	}

	_removeCard = () => {
		this._view.remove();
	}

	//Слушатель событий, закрывающий модальное окно по нажатию на Escape
	_clickEsc(evt) {
		const curentPopup = document.querySelector('.open-img__popup');
		if (evt.key == 'Escape') {
			curentPopup.classList.remove('popup_opened');
		}
	}

	_openPopupImage(evt, src) {
		const curentElement = evt.target;
		const curentPopup = document.querySelector('.open-img__popup');

		curentPopup.querySelector('.popup__img').src = curentElement.src;
		curentPopup.querySelector('.popup__img').alt = curentElement.alt;
		curentPopup.querySelector('.popup__caption').innerText = curentElement.alt;

		curentPopup.classList.add('popup_opened');
		//вешаем событие на кнопку Esc
		document.addEventListener('keydown', this._clickEsc);

	}

	_addEventListeners(evt) {
		this._view.addEventListener('click', (evt) => {
			const imgTemplate = this._view.querySelector('.cards__img');
			const trashTemplate = this._view.querySelector('.cards__trash');
			const heartTemplate = this._view.querySelector('.cards__heart');

			if (evt.target == trashTemplate) { this._removeCard(evt) };
			if (evt.target == heartTemplate) { heartTemplate.classList.toggle('cards__heart_active') };
			if (evt.target == imgTemplate) {
				const imgTemplateSrc = imgTemplate.getAttribute('src');
				this._openPopupImage(evt, imgTemplateSrc);
			}
		});
	}


	render(container) {
		this._createView();
		this._view.querySelector('.cards__title').innerText = this._text;
		this._view.querySelector('.cards__img').src = this._link;

		this._addEventListeners();

		container.append(this._view);
	}

}
// Card.template