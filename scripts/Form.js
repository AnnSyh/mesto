'use strict'

export class Form {
	constructor(createCard) {
		this._template = document.querySelector('.form-template').content;
		this._createCard = createCard;
	}

	_createView() {
		this._view = this._template.querySelector('.form').cloneNode(true);
	}

	_addEventListeners() {

		this._view.addEventListener('submit', () => {
			console.log('!!!!')

			// createCard();

		});
	}


	render(container) {
		this._createView();

		// debugger

		this._addEventListeners();

		container.append(this._view);

	}
}