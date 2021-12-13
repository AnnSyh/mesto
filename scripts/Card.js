'use strict'

export class Card {
	static template = document.querySelector('.card-template').content;

	constructor(text, link) {
		this._text = text;
		this._link = link;
	}

	_createView() {
		// this._view = this._template.cloneNode(true);
		this._view = Card.template.cloneNode(true);
	}


	render(container) {
		this._createView();
		this._view.querySelector('.cards__title').innerText = this._text;
		this._view.querySelector('.cards__img').src = this._link;
		container.append(this._view);

	}
}
// Card.template




// export class Card {
// 	constructor(name, link, selector) {
// 		// this._selector = selector;
// 		this._name = name;
// 		this._link = link;
// 	}

// 	_getTemplate() {
// 		// забираем разметку из HTML и клонируем элемент
// 		const cardElement = document
// 			.querySelector('.card-template')
// 			.content
// 			.querySelector('.cards__item')
// 			.cloneNode(true);

// 		// вернём DOM-элемент карточки
// 		return cardElement;
// 	}

// 	createCard(name, link) {
// 		this._element = this._getTemplate();
// 		const CardImg = this._element.querySelector('.cards__img');
// 		const CardTitle = this._element.querySelector('.cards__title');

// 		CardImg.setAttribute('src', this._link);
// 		CardImg.setAttribute('alt', this._name);
// 		CardTitle.textContent = this._name;

// 		this._addEventListeners();

// 		return this._element;
// 	}

// 	_addEventListeners(evt) {
// 		this._element.addEventListener('click', (evt) => {
// 			const imgTemplate = this._element.querySelector('.cards__img');
// 			const trashTemplate = this._element.querySelector('.cards__trash');
// 			const heartTemplate = this._element.querySelector('.cards__heart');

// 			console.log('click card !');

// 			if (evt.target == trashTemplate) { this._deleteCard(evt) }
// 			if (evt.target == heartTemplate) { heartTemplate.classList.toggle('cards__heart_active') }
// 			if (evt.target == imgTemplate) { console.log('popupImage.src = ', imgTemplate.getAttribute('src')) }
// 			// imgTemplate.addEventListener('click', this._openPopupImage);
// 		});

// 	}

// 	addCardsFromArray(data) {
// 		data.forEach(function (item) {
// 			const currentCard = createCard(item.name, item.link);
// 			addCard(currentCard)
// 		});
// 	}


// 	_addCard(itemCardTemplate) {
// 		cardsList.prepend(itemCardTemplate)
// 	}

// 	_deleteCard(evt) {
// 		const cardCurent = evt.target.closest('.cards__item')
// 		cardCurent.remove()
// 	}
// }
