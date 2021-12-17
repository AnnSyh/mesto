'use strict'


export class CardsList {
	constructor(items, template, createForm, createCard) {
		this._items = items;
		this._template = template;
		this._createForm = createForm;
		this._createCard = createCard;
	}

	_createView() {
		this._view = this._template.cloneNode(true);
	}


	render(container) {
		this._createView();

		this._items.forEach(item => {
			const newItem = this._createCard(item.name, item.link);
			newItem.render(this._view.querySelector('.cards__list'));
		});

		container.append(this._view);
		// return this._view;
	}
}