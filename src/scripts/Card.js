'use strict'

export class Card {
	// constructor(template, handleCardClick, openConfirm, closeConfirm, text, link, owner, user, cardId, api) {
	constructor(template, handleCardClick, openConfirm, closeConfirm, card, user, cardId, api) {
		this._card = card;

		this._text = card.name;
		this._link = card.link;
		this._owner = card.owner._id;

		this._template = template;
		this._handleCardClick = handleCardClick;
		this._openConfirm = openConfirm;
		this._closeConfirm = closeConfirm;

		this._user = user;
		this._api = api;
		this._cardId = cardId;

		// console.log('this = ',this);
		console.log('constructor: this._cardId = ',this._cardId);

	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);

	}

	_removeCard = (evt) => {
		console.log('_removeCard: this._cardId = ',this._cardId);

		this._openConfirm();
		const confirmBtn = document.querySelector('.confirmation-btn');
		confirmBtn.addEventListener('click', (evt) => {
			evt.preventDefault();//открываем окно подтверждения

			this._api.deleteCard(this._cardId)
			.then(()=>{
				this._view.remove(this._cardId); //удаляем карточку

			})
			.catch();

			this._closeConfirm();//закрываем окно подтверждения
		});
	}

	setEventListeners() {
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

			console.log('render(): cards  = ',this);
			console.log('render(): owner = ',this._owner);


			console.log('render(): user = ',this._user);

		let myCard = (this._owner == this._user);

		console.log('myCard = ',myCard );

    if(!myCard){
	         this._trash = this._view.querySelector('.cards__trash').classList.add("hidden");
    }

		return this._view;
	}

	likeCard(){

	}
	dislikeCard(){

	}

}
