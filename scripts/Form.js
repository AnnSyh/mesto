'use strict'

export class Form {
	constructor() {
		this._template = document.querySelector('.form-template').content;
	}

	_createView() {
		this._view = this._template.cloneNode(true);
	}


	render(container) {
		this._createView();
		container.append(this._view);

	}
}