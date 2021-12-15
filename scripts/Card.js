'use strict'

export class Card {

	constructor(template, text, link) {
		this._text = text;
		this._link = link;
		this._template = template;
	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}

	// _addCard(CardTemplate) {
	// 	cardsList.prepend(CardTemplate);
	// }

	_removeCard = () => {
		this._view.remove();
	}

	//Слушатель событий, закрывающий модальное окно по нажатию на Escape
	// _clickEsc(evt) {
	// 	const curentPopup = document.querySelector('.open-img__popup');
	// 	if (evt.key == 'Escape') {
	// 		curentPopup.classList.remove('popup_opened');
	// 	}
	// }

	_openPopupImage(evt) {
		// const curentElement = evt.target;
		const curentPopup = document.querySelector('.open-img__popup');

		curentPopup.querySelector('.popup__img').src = this._link;
		curentPopup.querySelector('.popup__img').alt = this._text;
		curentPopup.querySelector('.popup__caption').textContent = this._text;

		curentPopup.classList.add('popup_opened');
		//вешаем событие на кнопку Esc
		document.addEventListener('keydown', this.clickEsc);

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