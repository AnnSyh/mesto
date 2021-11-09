"use strict";
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



//находим список в кот надо встаивть карточки
const cardsList = document.querySelector('.cards__list');
//находим кнопки кот вызывают всплытие/закрытие окна редактирования
let profileBtnEdit = document.querySelector('.profile__btn_user_edit');
//находим кнопки кот вызывают всплытие/закрытие окна добавления карточки
let profileBtnAdd = document.querySelector('.profile__btn_user_add');

let popupCloseEditProfile = document.querySelector('.popup__close_edit_profile');
let popupCloseAddPlace = document.querySelector('.popup__close_add_plaсe');
// Находим сам попап
// let popupElement = document.querySelector('.popup_edit_profile');
let popupEditProfile = document.querySelector('.popup_edit_profile');
let popupAddPlaceElement = document.querySelector('.popup_add_plaсe');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
let formAddPlaceElement = document.querySelector('.popup_add_plaсe .popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_user_title');
let jobInput = document.querySelector('.popup__input_user_subtitle');
let placeNameInput = document.querySelector('.popup__input_plaсe_title');
let placeImgInput = document.querySelector('.popup__input_plaсe_img');
// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


function addCards(data) {
    for (let i = 0; i < data.length; i++) {
        addCard(data[i].name, data[i].link)
    }
}

function addCard(name, src) {
    const cardsLi = document.createElement('li');
    cardsLi.classList.add('cards__item');
    const cardsImg = document.createElement('img');
    cardsImg.classList.add('cards__img');
    cardsImg.src = src;
    const cardsText = document.createElement('div');
    cardsText.classList.add('cards__text');
    const cardsTitle = document.createElement('h2');
    cardsTitle.classList.add('cards__title');
    cardsTitle.classList.add('text-overflow');
    cardsTitle.textContent = name;
    const likeButton = document.createElement('button');
    likeButton.classList.add('cards__heart');
    cardsText.append(cardsTitle, likeButton);
    cardsLi.append(cardsImg, cardsText);
    cardsList.prepend(cardsLi);
}

function openPopup() {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
    popupEditProfile.classList.add('popup_opened');
};

function openPopupAdd() {
    popupAddPlaceElement.classList.add('popup_opened');
};

function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
    popupAddPlaceElement.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    //закрываем popup
    // popupElement.classList.remove('popup_opened');
    closePopup();
}
function formAddPlaceSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    let placeNameInputValue = placeNameInput.value;
    let placeImgInputValue = placeImgInput.value;
    // Предаем их в создаваймую карточку
    addCard(placeNameInputValue, placeImgInputValue);
    //закрываем popup
    closePopup();
}

function heartClick() {
    //находим сердечки
    let cardsHeart = document.querySelectorAll('.cards__heart');
    for (let i = 0; i < cardsHeart.length; i++) {
        cardsHeart[i].addEventListener('click', function () {
            cardsHeart[i].classList.toggle('cards__heart_active');
        });
    }
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmitHandler);

profileBtnEdit.addEventListener('click', openPopup);
popupCloseEditProfile.addEventListener('click', closePopup);

profileBtnAdd.addEventListener('click', openPopupAdd);
popupCloseAddPlace.addEventListener('click', closePopup);

addCards(initialCards);

heartClick();



