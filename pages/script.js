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
const profileBtnEdit = document.querySelector('.profile__btn_user_edit');
//находим кнопки кот вызывают всплытие/закрытие окна добавления карточки
const profileBtnAdd = document.querySelector('.profile__btn_user_add');
const popupCloseEditProfile = document.querySelector('.popup__close_edit_profile');
const popupCloseAddPlace = document.querySelector('.popup__close_add_plaсe');
const popupCloseImg = document.querySelector('.popup__close_img');
const popupClose = document.querySelector('.popup__close');
// Находим сам попап
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPlaceElement = document.querySelector('.popup_add_plaсe');
const popupOpenImg = document.querySelector('.popup_open_img');
// Находим форму в DOM
const formEditPlaceElement = document.querySelector('.popup_edit_profile .popup__form');
const formAddPlaceElement = document.querySelector('.popup_add_plaсe .popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_user_title');
let jobInput = document.querySelector('.popup__input_user_subtitle');
const placeNameInput = document.querySelector('.popup__input_plaсe_title');
const placeImgInput = document.querySelector('.popup__input_plaсe_img');
// Находим переменные для функции openPopup()
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


function addCards(data) {
    for (let i = 0; i < data.length; i++) {
        addCard(data[i].name, data[i].link)
    }
}

function addCard(name, src) {
    const cardsLi = document.createElement('li');
    cardsLi.classList.add('cards__item');

    const cardsPic = document.createElement('div');
    cardsPic.classList.add('cards__pic');

    const trashButton = document.createElement('button');
    trashButton.classList.add('cards__trash');

    const cardsImg = document.createElement('img');
    cardsImg.classList.add('cards__img');
    cardsImg.src = src;
    cardsImg.alt = name;

    const cardsText = document.createElement('div');
    cardsText.classList.add('cards__text');

    const cardsTitle = document.createElement('h2');
    cardsTitle.classList.add('cards__title');
    cardsTitle.classList.add('text-overflow');
    cardsTitle.textContent = name;

    const likeButton = document.createElement('button');
    likeButton.classList.add('cards__heart');

    cardsPic.append(cardsImg, trashButton);
    cardsText.append(cardsTitle, likeButton);
    cardsLi.append(cardsPic, cardsText);
    cardsList.prepend(cardsLi);

    trashButton.addEventListener('click', dellCard);

    likeButton.addEventListener('click', function () {
        this.classList.toggle('cards__heart_active');
    });

    cardsImg.addEventListener('click', openPopupImg);
    popupCloseImg.addEventListener('click', closePopup);

}

function dellCard(evt) {
    const cardCurent = evt.target.parentNode.parentNode;
    cardCurent.remove();
}

function openPopup(evt) {
    const popup = evt.target;

    if (popup.classList.contains('profile__btn_user_edit')) {
        nameInput.value = profileName.innerText;
        jobInput.value = profileJob.innerText;
        popupEditProfile.classList.add('popup_opened')
    } else if (popup.classList.contains('profile__btn_user_add')) {
        popupAddPlaceElement.classList.add('popup_opened');
    }
    // else if (popup.classList.contains('popup_open_img')) {
    //     // const cardsText = evt.target.parentNode.parentNode.querySelector('.cards__title').innerText;
    //     // const popupImg = document.querySelector('.popup__img');
    //     // const popupCaption = document.querySelector('.popup__caption');
    //     // popupImg.src = cardsImg.src;
    //     // popupCaption.innerText = cardsText;
    //     // popupOpenImg.classList.add('popup_opened');

    //     console.log('!!!!!! popup = ', popup);
    // }
};

function openPopupImg(evt) {
    const cardsImg = evt.target;
    const cardsText = evt.target.parentNode.parentNode.querySelector('.cards__title').innerText;
    const popupImg = document.querySelector('.popup__img');
    const popupCaption = document.querySelector('.popup__caption');
    popupImg.src = cardsImg.src;
    popupCaption.innerText = cardsText;

    popupOpenImg.classList.add('popup_opened');
};

function closePopup(evt) {
    const popupCurent = evt.target.parentNode.parentNode.parentNode;
    popupCurent.classList.remove('popup_opened');

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


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditPlaceElement.addEventListener('submit', formSubmitHandler);
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmitHandler);

profileBtnEdit.addEventListener('click', openPopup);
popupCloseEditProfile.addEventListener('click', closePopup);

profileBtnAdd.addEventListener('click', openPopup);
popupCloseAddPlace.addEventListener('click', closePopup);

addCards(initialCards);
