'use strict'

export class Card {
	constructor(template, handleCardClick, handleCardLikes, openConfirm, closeConfirm, card, user, api) {
		this._card = card;
		this._text = card.name;
		this._link = card.link;
		this._owner = card.owner._id;
		this._id = card._id;
		this._likes = card.likes;
// debugger
		this._template = template;
		this._handleCardClick = handleCardClick;
		this._handleCardLikes = handleCardLikes;
		this._openConfirm = openConfirm;
		this._closeConfirm = closeConfirm;

		this._user = user;
		this._api = api;

		// console.log('this = ',this);
		console.log('this._user = ',this._user);

	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}


	_removeCard = (evt) => {
		console.log('_removeCard: this._cardId = ',this._id);

		this._openConfirm();
		const confirmBtn = document.querySelector('.confirmation-btn');

		confirmBtn.addEventListener('click', (evt) => {
			evt.preventDefault();//открываем окно подтверждения
// debugger
			this._api.deleteCard(this._id)
			.then(()=>{
				this._view.remove(this._id); //удаляем карточку
			})
			.catch(err => console.log(err));

			this._closeConfirm();//закрываем окно подтверждения
		});
	}

	setEventListeners() {
		this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
		this._trash.addEventListener('click', (evt) => this._removeCard(evt));
		this._heart.addEventListener('click', () => { this._handleCardLikes(this._id,this._likes) });
	}

	render() {
		this._createView();
		// debugger
		console.log('this._likes = ',this._likes);

		this._image = this._view.querySelector('.cards__img');
		this._trash = this._view.querySelector('.cards__trash');
		this._heart = this._view.querySelector('.cards__heart');
		this._title = this._view.querySelector('.cards__title');
		this._counter = this._view.querySelector('.cards__heart-counter');
		this._likesSelector = this._view.querySelector('.cards__heart-counter');

		this._title.innerText = this._text;
		this._image.alt = this._text;
		this._image.src = this._link;
		this._likesSelector.textContent = this._likes.length;

		this.setEventListeners();
// debugger
		let myCard = (this._owner == this._user);
		// console.log('myCard = ',myCard );
    if(!myCard){
	         this._trash = this._view.querySelector('.cards__trash').classList.add("hidden");
    }

		return this._view;
	}

}
