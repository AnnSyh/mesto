"use strict";

export class Card {
  constructor(
    template,
    handleCardClick,
    handleConfirmDelete,
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
    this._handleConfirmDelete = handleConfirmDelete;
    this._openConfirm = openConfirm;
    this._closeConfirm = closeConfirm;

    this._user = user;
    this._api = api;

    this._confirmBtn = document.querySelector(".confirmation-btn");
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
      this._api
      .deleteLike(this._id)
      .then((data) => {
        this._heart.classList.remove("cards__heart_active"); //добавляем акт класс сердечка
        this._counter.textContent = data.likes.length; // выводим кол-во кликов в карточку
        this._likes = data.likes; // обновляем массив лайков после клика
      })
      .catch((err) => console.log(`WASTED - ${err}`));
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

  //навешиваем события на элементы карточек
  setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._text, this._link)
    );
    this._trash.addEventListener("click", () => this._handleConfirmDelete());
    this._heart.addEventListener("click", () => this._handleCardLikes());
  }

  //отмечаем лайкнутые карточки
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

    this.setEventListeners(); //навешиваем обработчики


    // console.log('render(): this._user = ',this._user);
    // console.log('render(): this._owner = ',this._owner);

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
