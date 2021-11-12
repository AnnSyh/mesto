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
const nameInput = document.querySelector('.popup__input_user_title');
const jobInput = document.querySelector('.popup__input_user_subtitle');
const placeNameInput = document.querySelector('.popup__input_plaсe_title');
const placeImgInput = document.querySelector('.popup__input_plaсe_img');
// Находим переменные для функции openPopup()
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const template = document.querySelector('.template');


function addCards(data) {
    for (let i = 0; i < data.length; i++) {
        createCard(data[i].name, data[i].link);
    }
}

function addListenersToCard(itemCardTemplate) {
    const imgTemplate = itemCardTemplate.querySelector('.cards__img');
    const trashTemplate = itemCardTemplate.querySelector('.cards__trash');
    const heartTemplate = itemCardTemplate.querySelector('.cards__heart');

    trashTemplate.addEventListener('click', dellCard);
    heartTemplate.addEventListener('click', function () {
        this.classList.toggle('cards__heart_active');
    });

    imgTemplate.addEventListener('click', openPopup);
    popupCloseImg.addEventListener('click', closePopup);
}

function createCard(name, src) {
    const itemCardTemplate = template.content.querySelector('.cards__item').cloneNode(true);
    const imgTemplate = itemCardTemplate.querySelector('.cards__img');
    const titleTemplate = itemCardTemplate.querySelector('.cards__title');

    imgTemplate.src = src;
    imgTemplate.alt = name;
    titleTemplate.textContent = name;

    addListenersToCard(itemCardTemplate);

    cardsList.prepend(itemCardTemplate);

    return itemCardTemplate;
}

function dellCard(evt) {
    const cardCurent = evt.target.parentNode.parentNode;
    cardCurent.remove();
}

function openPopup(evt) {
    const openPopupElement = evt.target;

    if (openPopupElement.classList.contains('profile__btn_user_edit')) {
        nameInput.value = profileName.innerText;
        jobInput.value = profileJob.innerText;
        popupEditProfile.classList.add('popup_opened')
    } else if (openPopupElement.classList.contains('profile__btn_user_add')) {
        popupAddPlaceElement.classList.add('popup_opened');
    } else if (openPopupElement.classList.contains('cards__img')) {
        const cardsImg = evt.target;
        const cardsText = evt.target.parentNode.parentNode.querySelector('.cards__title').innerText;
        const popupImg = document.querySelector('.popup__img');
        const popupCaption = document.querySelector('.popup__caption');
        popupImg.src = cardsImg.src;
        popupCaption.innerText = cardsText;
        popupOpenImg.classList.add('popup_opened');
    }
};

function closePopup(evt) {
    const popupCurent = evt.target.parentNode.parentNode.parentNode;
    const popupCurentOne = evt.target.parentNode.parentNode;
    popupCurentOne.classList.remove('popup_opened');
    popupCurent.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    //закрываем popup
    closePopup(evt);
}
function formAddPlaceSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получаем значение полей jobInput и nameInput из свойства value
    const placeNameInputValue = placeNameInput.value;
    const placeImgInputValue = placeImgInput.value;
    // Предаем их в создаваймую карточку
    createCard(placeNameInputValue, placeImgInputValue);
    //закрываем popup
    closePopup(evt);
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
