'use strict'

export class Card {
	constructor(template, handleCardClick,  openConfirm, closeConfirm, card, user, api) {
		this._card = card;
		this._text = card.name;
		this._link = card.link;
		this._owner = card.owner._id;
		this._id = card._id;
		this._likes = card.likes;
// debugger
		this._template = template;
		this._handleCardClick = handleCardClick;
		this._openConfirm = openConfirm;
		this._closeConfirm = closeConfirm;

		this._user = user;
		this._api = api;

		console.log('this = ',this);
		console.log('this._likes = ',this._likes);

	}

	_createView() {
		this._view = this._template.content.querySelector('.cards__item').cloneNode(true);
	}





//новый массив лайков после клика


	// кликаем лайки
_handleCardLikes(cardId,cardLikes) {
	console.log('	_handleCardLikes(cardId,cardLikes)');
	console.log('	cardId = ',cardId);
	console.log('	изначальное кол-во cardLikes = ',cardLikes);


	const even = (element) => (element._id == this._user);
	if( cardLikes.some(even)){
					//стереть из массива лайков карточки данные юзера лайкнувшего карточку
					this._api
					    .deleteLike(cardId)
					    .then((data)=>{
						// debugger
						console.log('api.deleteLike = ',this._heart);
						this._heart.classList.remove('cards__heart_active'); //добавляем акт класс сердечка
						this._counter.textContent = data.likes.length;
						console.log('новое кол-во data.likes = ',data.likes);
						this._isLikes();
					})
					.catch(err => console.log(`WASTED - ${err}`));
	} else {
				 //записать в массив лайков карточки данные юзера лайкнувшего карточку
			 this._api
			 .postLike(cardId)
			 .then((data)=>{
				// debugger
				console.log('api.postLike = ',this._heart);
				   this._heart.classList.add('cards__heart_active');//удаляем акт класс сердечка
					 this._counter.textContent = data.likes.length;
					 console.log('новое кол-во data.likes = ',data.likes);
					 this._isLikes();
			 })
			 .catch(err => console.log(`WASTED - ${err}`));
	}
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
			.catch(err => console.log(`WASTED - ${err}`));

			this._closeConfirm();//закрываем окно подтверждения
		});
	}

	setEventListeners() {
		this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
		this._trash.addEventListener('click', (evt) => this._removeCard(evt));
		this._heart.addEventListener('click', () => { this._handleCardLikes(this._id,this._likes) });
	}


	_isLikes(){
		console.log('	isLikes()');
		// проверяет поставлен ли мной лайк или нет

			const even = (element) => (element._id == this._user);

			if ( this._likes.some(even) ){
				console.log('лайки не содержат текущего юзера');
			} else {
				console.log('лайки содержат текущего юзера');
			}

	}

	render() {
		console.log('render() !!!');
		this._createView();
		// debugger
		// console.log('this._likes = ',this._likes);

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
		console.log('myCard = ',myCard );
    if(!myCard){
	         this._trash = this._view.querySelector('.cards__trash').classList.add("hidden");
    }

		// this._isLikes();

		return this._view;
	}

}
