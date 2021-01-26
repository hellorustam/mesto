import { initialCards } from './initial-cards.js';
import { validationConfig } from './config.js';
import { Validation } from './validate.js';


const editButtonNode = document.querySelector('.profile__edit');
const profileNameNode = document.querySelector('.profile__name');
const profileAboutNode = document.querySelector('.profile__about');
const addButtonNode = document.querySelector('.profile__add-button');


// const popupNode = document.querySelectorAll('.popup');
const popupProfileNode = document.querySelector('.popup-profile');
const closeButtonNode = popupProfileNode.querySelector('.popup__close');
const nameInput = popupProfileNode.querySelector('.popup__name');
const aboutInput = popupProfileNode.querySelector('.popup__about'); 
const formElement = popupProfileNode.querySelector('.popup__profile-form');


const popupAddNode = document.querySelector('.popup-add');
const closeButtonAddNode = popupAddNode.querySelector('.popup__close');
const mestoTitleInput = popupAddNode.querySelector('.popup__mesto-title');
const mestoLinkInput = popupAddNode.querySelector('.popup__mesto-link'); 
const mestoFormElement = popupAddNode.querySelector('.popup__mesto-form');

const popupImg = document.querySelector('.popup-img');
const popupImgSource = document.querySelector('.popup__img');
const popupImgCaption = document.querySelector('.popup__img-caption');


const cardsContainer = document.querySelector('.elements');
// const popupImgContainer = document.querySelector('.elements__element');
const cardTemplate = document.querySelector('#card-template').content;


<<<<<<< HEAD
const closeOvelayPopup = (itm) => {
    itm.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
=======
//---
// const qS = (node) => document.querySelector(node);

// const selectorsObj = {
//     addButt: '.profile__name',
//     profileNameNode: '.fasdf'
// }

// editButtonNode = qS(selectorsObj.addButt);
//---


const popupActive = (itm) => {document.addEventListener('keyup',(evt) => {
        if (evt.key === 'Escape') {
>>>>>>> develop
            closePopup(itm);
        }
    });
}

const closeEscPopup = (evt) => {
    const avtivePopup = document.querySelector('.popup_visible');
    if (evt.key === 'Escape') {
        closePopup(avtivePopup);
    }
};

function openPopup (itm) {
    itm.classList.add('popup_visible');
    itm.addEventListener('click', closeOvelayPopup(itm));
    document.addEventListener('keyup', closeEscPopup)
}

function closePopup (itm) {
<<<<<<< HEAD
    itm.classList.remove('popup_visible');
    itm.removeEventListener('click', closeOvelayPopup(itm));
    document.removeEventListener('keyup', closeEscPopup);
=======
        itm.classList.remove('popup_visible');
        itm.removeEventListener('click');
        document.removeEventListener('keyup');
>>>>>>> develop
}


// Подтягивает данные профиля и открывает попап
function openProfilePopup() {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;

    openPopup(popupProfileNode);
}

// Отправляет форму Профиля и закрывает попап 
function handleProfileSubmit (evt) {
    evt.preventDefault();

    profileNameNode.textContent = nameInput.value;
    profileAboutNode.textContent = aboutInput.value;

    closePopup(popupProfileNode);
}


// Создание карточки 
function createCard(titleValue, imgValue) {
    const cardElement = cardTemplate.cloneNode(true);
    const imgElement = cardElement.querySelector('.elements__image');

    imgElement.src = imgValue;
    imgElement.alt = titleValue;
    cardElement.querySelector('.elements__title').textContent = titleValue;

    cardElement.querySelector('.elements__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like_active');
    });

    cardElement.querySelector('.elements__remove').addEventListener('click', (evt) => {
        evt.currentTarget.closest('.elements__element').remove();
    });

    imgElement.addEventListener('click', function(evt){
        popupImgSource.src = imgValue;
        popupImgSource.alt = titleValue;
        popupImgCaption.textContent = titleValue;
        openPopup(popupImg);
    });

    return cardElement;
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}



// Отправляет форму Места и закрывает попап 
function handleMestoSubmit(evt) {
    const submitButton = mestoFormElement.querySelector('.popup__button');

    evt.preventDefault();

    addCard(cardsContainer, createCard(mestoTitleInput.value, mestoLinkInput.value));

    submitButton.classList.add('popup__button_invalid');
    submitButton.disabled = true;

    mestoFormElement.reset();
    closePopup(popupAddNode);
}


// ----


// Вывод карточек из массива
initialCards.map(item => {
    addCard(cardsContainer, createCard(item.name, item.link));
});



// Вызов попапа редактирования профиля
editButtonNode.addEventListener('click', openProfilePopup);
closeButtonNode.addEventListener('click', () => {
    closePopup(popupProfileNode);
});
formElement.addEventListener('submit', handleProfileSubmit);



// Добавление новой карточки
addButtonNode.addEventListener('click', () => {
    openPopup(popupAddNode);
});
closeButtonAddNode.addEventListener('click', () => {
    closePopup(popupAddNode);
});



popupImg.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popupImg);
});
mestoFormElement.addEventListener('submit', handleMestoSubmit);




const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new Validation(validationConfig, formAdd);
formMesto.enableValidation();

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new Validation(validationConfig, fromEdit);
formProfile.enableValidation();