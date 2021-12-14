'use strict'

import { initialCards } from "./initialCards.js";
import { configData } from "./configData.js";
import { Card } from "./Card.js";
import { CardsList } from "./CardsList.js";
import { FormValidator } from "./FormValidator.js";

const cardsListTemplate = document.querySelector('.list-template').content;
const cardsListContainer = document.querySelector('.list-template-place');


//создаем инструкции для формы
const createForm = (...args) => new Form(...args);
//создаем инструкции для списка
const createCard = (...args) => new Card(...args);

const cardsList = new CardsList(initialCards, cardsListTemplate, createForm, createCard);
cardsList.render(cardsListContainer);

//Валидация форм
// Находим формы в DOM
const formEditPlaceElement = document.querySelector('.edit-profile__popup .popup__form');
const formAddPlaceElement = document.querySelector('.add-plaсe__popup .popup__form');

const editFormValidator = new FormValidator(configData, formEditPlaceElement);
const cardFormValidator = new FormValidator(configData, formAddPlaceElement);

editFormValidator.enableValidation(configData);
cardFormValidator.enableValidation(configData);