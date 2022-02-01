"use strict";

import { configData } from "../utils/configData.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirmForm } from "../components/PopupConfirmForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "../pages/index.css";
import { Popup } from "../components/Popup.js";

let user;
let avatar;
let currentCardId;

const curentPopupConfirmation = document.querySelector(".confirmation__popup");
const curentPopup = document.querySelector(".open-img__popup");
const curentPopupImg = curentPopup.querySelector(".popup__img");
const curentPopupCaption = curentPopup.querySelector(".popup__caption");
const cardsListContainer = document.querySelector(".list-template-place");
const cardTemplate = document.querySelector(".card-template");
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "1690dfea-cbda-42f6-a87e-a16c1f76892e",
    "Content-Type": "application/json",
  },
});
//создаем инструкции для списка
const createCard = (...args) =>
  new Card(
    cardTemplate,
    handleCardClick,
    handleConfirmDelete,
    openConfirm,
    closeConfirm,
    ...args,
    api
  );

function renderer(item) {
  console.log("renderer: user = ", user);
  // debugger

  //проверка пользователя
  currentCardId = item._id;
  // Создаем карточку и возвращаем ее шаблон
  const newCardInitial = createCard(item, user).render();
  this.addItem(newCardInitial);
  return newCardInitial;
}
//  /создаем список

//создаем пустой список в который далее будем вставлять карточки
const cardList = new Section({ data: [], renderer }, cardsListContainer);

//Создаем экземпляр класса currentUser
const currentUser = new UserInfo("profile__name", "profile__job");

// api.getInitialCards()  - запрос к серверу получаю начальный набор карточек с сервера
// api.getUser()          - запрос к серверу получаю нач данные для профайла пользователя
//обьеденяю запрос  данных профиля и получения карточек

Promise.all([api.getInitialCards(), api.getUser()])
  .then(([CardsData, userData]) => {

    user = userData._id;

    cardList.renderItems(CardsData); //  тут отрисовка карточек
    currentUser.setUserInfo({ name: userData.name, about: userData.about }); // тут установка данных пользователя
    avatar = userData.avatar;
    currentUser.setUserAvatar(avatar);
  })
  .catch((err) => console.log(`WASTED - ${err}`));


//Валидация форм
// Находим формы в DOM
const formEditProfile = document.querySelector(
  ".edit-profile__popup .popup__form"
);
const formAddPlace = document.querySelector(".add-plaсe__popup .popup__form");

const editFormValidator = new FormValidator(configData, formEditProfile);
const cardFormValidator = new FormValidator(configData, formAddPlace);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// -----------------------------------------------------------
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_user-title");
const avatarInput = document.querySelector(".popup__input_avatar-img");
const jobInput = document.querySelector(".popup__input_user-subtitle");
const placeNameInput = document.querySelector(".popup__input_plaсe-title");
const placeImgInput = document.querySelector(".popup__input_plaсe-img");

// находим кнопки кот вызывают всплытие/закрытие окна-редактирования
const profileBtnEdit = document.querySelector(".btn-user-edit");
const profileAvatarEdit = document.querySelector(".btn-avatar-edit");
// находим кнопки кот вызывают всплытие/закрытие окна-добавления карточки
const profileBtnAdd = document.querySelector(".profile__btn_user-add");
// Находим сам попап
const popupEditProfileSelector = document.querySelector(".edit-profile__popup");
const popupEditProfileAvatar = document.querySelector(".new-avatar__popup");
const popupAddPlaceSelector = document.querySelector(".add-plaсe__popup");

const editProfileBtn = popupEditProfileAvatar.querySelector(".popup__btn");


//кнопка окна подтверждения
const confirmBtn = document.querySelector(".confirmation-btn");

//открытие попапа с предупреждением через новый класс PopupConfirmForm
const popupConfirmation = new PopupConfirmForm(
  curentPopupConfirmation,
  openConfirm,
  closeConfirm
); // <==  создаем эл-т класса Popup

function openConfirm(evt) {
  popupConfirmation.openPopup(); // <==  открываем попап ==
}
function closeConfirm(evt) {
  popupConfirmation.closePopup(); // <==  закрываем попап ==
}

//открытие попапа с картинкой для карточки (мягкое связывание)
const popupImage = new PopupWithImage(
  curentPopup,
  curentPopupCaption,
  curentPopupImg
); // <==  создаем эл-т класса PopupWithImage ==

function handleCardClick(text, link) {
  popupImage.openPopup(text, link); // <==  открываем попап ==
}

//подтверждение удаления
function handleConfirmDelete() {
  popupConfirmation.openPopup(); //открываем окно подтверждения
  confirmBtn.onclick = (evt) => {
    evt.preventDefault(); // убираем авт отправление формы
    confirmBtn.textContent = "Удаляется...";
    api
      .deleteCard(this._id) //удаляем карточку из базы
      .then((data) => {
        this._view.remove(); //удаляем  карточку из dom
        popupConfirmation.closePopup(); //закрываем окно подтверждения
      })
      .catch((error) => console.log(`Ошибка ${error}`))
      .finally(() => (confirmBtn.textContent = "Да"));
  };
}

const userInfoPopup = new PopupWithForm(
  popupEditProfileSelector,
  handleProfileFormSubmit
); // <==  создаем эл-т класса PopupWithForm ==

const userAvatarPopup = new PopupWithForm(
  popupEditProfileAvatar,
  handleAvatarFormSubmit
); // <==  создаем эл-т класса PopupWithForm ==

//открываем попап для редактирования  аватара
//надо сделать проверку пользователя - редактировать может только авторизированный пользователь ???
function openPopupAvatarEdit() {
  editFormValidator.resetValidation(); // <== очищаем поля формы, ошибки и дизеблим кнопку сабмита перед открытием
  const currentUserAvatar = currentUser.getUserAvatar(); // получили данные текущего аватара кот выведены на стр
  //  передаем значение полей из формы
  avatarInput.value = currentUserAvatar.avatar;
  userAvatarPopup.openPopup(); // <==  открываем попап ==
  editFormValidator.toggleButtonState(); // проверить состояние кнопки при открытии формы
}

//открываем попап для редактирования  профиля
function openPopupProfileEdit() {
  editFormValidator.resetValidation(); // <== очищаем поля формы, ошибки и дизеблим кнопку сабмита перед открытием
  //  передаем значение полей из формы
  const currentUserInfo = currentUser.getUserInfo(); // получили данные текущего юзера кот выведены на стр
  nameInput.value = currentUserInfo.name; // передали эти данные в поля формы
  jobInput.value = currentUserInfo.about;
  userInfoPopup.openPopup(); // <==  открываем попап ==
  editFormValidator.toggleButtonState(); // проверить состояние кнопки при открытии формы
}


function openPopupProfileAdd() {
  cardFormValidator.resetValidation(); // <== очищаем поля формы и дизеблим кнопку сабмита перед открытием
  newCardPopup.openPopup(); // <==  открываем попап ==
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function hanldeConfirmFormSubmit(evt) {
  evt.preventDefault();
  const submitConfirmationBtn = document.querySelector(
    ".confirmation .popup__btn"
  );
  submitConfirmationBtn.addEventListener(
    "click"
    // console.log("click confirmation .popup__btn")
  );
}

//сабмитим форму с аватаром
function handleAvatarFormSubmit(evt, avatar) {
  evt.preventDefault();
  //изменяем данные текущего юзера в соот с данными забитыми в форму
  //отправляем новые данные пользователя на сервер
  editProfileBtn.textContent =
    "Сохраняется...";
  api
    .postAvatar(avatar)
    .then((data) => {
      currentUser.setUserAvatar(avatar["avatar-src"]);
      // debugger
      userAvatarPopup.closePopup();
    })
    .catch((err) => console.log(`WASTED - ${err}`))
    .finally(
      () =>
        (editProfileBtn.textContent =
          "Сохранить")
    );
}

function handleProfileFormSubmit(evt, { title, subtitle }) {
  debugger
  console.log('function handleProfileFormSubmit')
  console.log('title = ',title)
  console.log('subtitle = ',subtitle)
  //изменяем данные текущего юзера в соот с данными забитыми в форму
  currentUser.setUserInfo({ name: title, about: subtitle });

  //отправляем новые данные пользователя на сервер
  popupEditProfileSelector.querySelector(".popup__btn").textContent =
    "Сохраняется...";
  api
    .postUser({ name: title, about: subtitle })
    .then((data) => {
      currentUser.setUserInfo({ name: title, about: subtitle });
      // debugger
      userInfoPopup.closePopup();
    })
    .catch((err) => console.log(`WASTED - ${err}`))
    .finally(
      () =>
        (popupEditProfileSelector.querySelector(".popup__btn").textContent =
          "Сохранить")
    );
}


//открываем попап для добавления нового места
const newCardPopup = new PopupWithForm(
  popupAddPlaceSelector,
  hanldeAddPlaceFormSubmit
); // <==  создаем эл-т класса PopupWithForm ==


function hanldeAddPlaceFormSubmit(evt,values) {
  //создаем нов карточку в соот с данными взятыми из БД (забитыми в форму)
  //отправляем данные новой карточки на сервер

  console.log('values = ',values);
debugger
  popupAddPlaceSelector.querySelector(".popup__btn").textContent = "Сохраняется...";
  api
    .postCreateCard(values)
    .then((data) => {

console.log('hanldeAddPlaceFormSubmit(): data = ',data);
console.log('this = ',this);
console.log('this.getInputValues() = ',this.getInputValues());

      cardList.addItem(createCard(data, user).render(), "prepend");
      // debugger
      newCardPopup.closePopup();
    })
    .catch((err) => console.log(`WASTED - ${err}`))
    .finally(
      () => (popupAddPlaceSelector.querySelector(".popup__btn").textContent = "Сохранить")
    );
}

//вешаем событие на кнопки(открывющие попапы с формами)
profileBtnEdit.addEventListener("click", openPopupProfileEdit);
profileAvatarEdit.addEventListener("click", openPopupAvatarEdit);
profileBtnAdd.addEventListener("click", openPopupProfileAdd);
