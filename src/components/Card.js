"use strict";

export class Card {
  constructor(
    template,
    handleCardClick,
    openConfirm,
    closeConfirm,
    card,
    user,
    api
  ) {
    this._card = card;
    this._text = card.name;
    this._link = card.link;
    this._owner = card.owner._id;
    this._id = card._id;
    this._likes = card.likes;

    this._template = template;
    this._handleCardClick = handleCardClick;
    this._openConfirm = openConfirm;
    this._closeConfirm = closeConfirm;

    this._user = user;
    this._api = api;

		this._confirmBtn = document.querySelector('.confirmation-btn');
  }

  _createView() {
    this._view = this._template.content
      .querySelector(".cards__item")
      .cloneNode(true);
  }

  // кликаем лайки
  _handleCardLikes() {
    this._heart.classList.toggle("cards__heart_active"); //меняем акт класс сердечка

    const even = (element) => element._id == this._user;
    if (this._likes.some(even)) {
      //  console.log('этот пользователь уже лайкал');
      this._api.deleteLike(this._id).then((data) => {
        this._heart.classList.remove("cards__heart_active"); //добавляем акт класс сердечка
        this._counter.textContent = data.likes.length; // выводим кол-во кликов в карточку
        this._likes = data.likes; // обновляем массив лайков после клика
      });
    } else {
      // console.log('этот пользователь еще не лайкал');
      this._api
        .postLike(this._id)
        .then((data) => {
          this._heart.classList.add("cards__heart_active"); //удаляем акт класс сердечка
          this._counter.textContent = data.likes.length; // выводим кол-во кликов в карточку
          this._likes = data.likes; // обновляем массив лайков после клика
        })
        .catch((err) => console.log(`WASTED - ${err}`));
    }
  }

  // _confirmFunctionDelete(evt){
  // 	console.log('confirmFunctionDelete');

  // 	const confirmBtn = document.querySelector('.confirmation-btn');
  // 	// debugger
  // 				confirmBtn.textContent = 'Удаляется...';

  // 				this._api
  // 				.deleteCard(this._id)  //удаляем карточку из базы
  // 				.then((data)=>{
  // 					this._view.remove(); //удаляем  карточку из dom
  // 					this._view = null;
  // 				})
  // 				.catch(error => console.log(`WASTED - ${error}`))
  // 				.finally(() => confirmBtn.textContent = 'Да');

  // 				this._closeConfirm();//закрываем окно подтверждения
  // }

  // 	_removeCard = (evt) => {
  // 		debugger
  // 		console.log('_removeCard: this._cardId = ',this._id);

  // 		this._openConfirm();//открываем окно подтверждения
  // 		evt.preventDefault();// убираем авт отправление формы
  // 		const confirmBtn = document.querySelector('.confirmation-btn');

  // 		confirmBtn.addEventListener('click',  this._confirmFunctionDelete(evt));
  // 		confirmBtn.removeEventListener('click', this._confirmFunctionDelete(evt));
  // 	}

  deleteCardApi() {
    // confirmBtn.textContent = "Удаляется...";
    this._confirmBtn.textContent = "Удаляется...";
    this._api
      .deleteCard(this._id) //удаляем карточку из базы
      .then((data) => {
				  // !!!вот тут надо будет снять обработчик!!!
						// this.removeEventListener("click", (evt) => confirmFunctionDelete(evt));//снимаем обработчик

        this._view.remove(); //удаляем  карточку из dom
        this._view = null;
      })
      .catch((error) => console.log(`WASTED - ${error}`))
      .finally(() => (this._confirmBtn.textContent = "Да"));
  }


  _removeCard = (evt) => {
    this._openConfirm(); //открываем окно подтверждения

    const confirmFunctionDelete = (evt) => {

      console.log("confirmFunctionDelete");
      evt.preventDefault(); // убираем авт отправление формы

      this.deleteCardApi();

			console.log('убрать обработчик!');// !!!убираем обработчик!!!
			// this.removeEventListener("click", (evt) => confirmFunctionDelete(evt));

      this._closeConfirm(); //закрываем окно подтверждения
    };

    this._confirmBtn.addEventListener("click", (evt) => confirmFunctionDelete(evt));
			// this.removeEventListener("click", (evt) => confirmFunctionDelete(evt));//снимаем обработчик

  };

  setEventListeners() {
    console.log("setEventListeners()");
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._text, this._link)
    );
    this._trash.addEventListener("click", (evt) => this._removeCard(evt));

		console.log('повесить обработчик!'); // !!!навешиваем обработчик!!!
		//  this._confirmBtn.addEventListener("click", (evt) => confirmFunctionDelete(evt));

    this._heart.addEventListener("click", () => {
      this._handleCardLikes();
    });
  }

  _isLiked(card) {
    // проверяет поставлен ли мной лайк или нет
    card._likes.forEach((element) => {
      if (element._id == this._user) {
        // console.log('лайки содержат текущего юзера');
        this._heart.classList.add("cards__heart_active");
      } else {
        // console.log('лайки не содержат текущего юзера');
        this._heart.classList.remove("cards__heart_active");
      }
    });
  }

  render() {
    this._createView();
    // debugger

    this._btn = this._view.querySelector(".confirmation-btn");
    this._image = this._view.querySelector(".cards__img");
    this._trash = this._view.querySelector(".cards__trash");
    this._heart = this._view.querySelector(".cards__heart");
    this._title = this._view.querySelector(".cards__title");
    this._counter = this._view.querySelector(".cards__heart-counter");
    this._likesSelector = this._view.querySelector(".cards__heart-counter");

    this._title.innerText = this._text;
    this._image.alt = this._text;
    this._image.src = this._link;
    this._likesSelector.textContent = this._likes.length;

    this.setEventListeners();//навешиваем обработчики

    // debugger
    let myCard = this._owner == this._user;
    // console.log('myCard = ',myCard );
    if (!myCard) {
      this._trash = this._view
        .querySelector(".cards__trash")
        .classList.add("hidden");
    }
    this._isLiked(this); //проверяю есть ли лайкнутые пользователем карточки и закрашиваю сердечки в случае если есть
    return this._view;
  }
}
