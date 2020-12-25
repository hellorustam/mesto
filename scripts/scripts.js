const editButtonNode = document.querySelector('.profile__edit');
const profileNameNode = document.querySelector('.profile__name');
const profileAboutNode = document.querySelector('.profile__about');
const addButtonNode = document.querySelector('.profile__add-button');


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


const cardsContainer = document.querySelector('.elements');
// const popupImgContainer = document.querySelector('.popup__img-elements');
const popupImgContainer = document.querySelector('.elements__element');



// Массив из объектов - карточки
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


//------------------------------------------------------------
// открытие и закрытие попапа
function popupOpen (itm) {
    itm.classList.add('popup_visible');
}
function popupClose (itm) {
    itm.classList.remove('popup_visible');
}

function popupCloseEdit () {
    popupClose(popupProfileNode);
}
function popupCloseAdd () {
    popupClose(popupAddNode);
}
function popupCloseImg () {
    popupClose(popupAddNode);
}

// -----------------------------------------------------------

// Подтягивает данные профиля и открывает попап
function popupProfile() {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;

    popupOpen(popupProfileNode);
}

// Отправляет форму Профиля и закрывает попап 
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileNameNode.textContent = nameInput.value;
    profileAboutNode.textContent = aboutInput.value;

    popupClose(popupProfileNode);
}


// функиция добавления карточки 
function addCard(titleValue, imgValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    
    // const popupImgTemplate = document.querySelector('#popup-img-template').content;
    // const popupImgElement = popupImgTemplate.cloneNode(true);

    cardElement.querySelector('.elements__title').textContent = titleValue;
    cardElement.querySelector('.elements__image').alt = titleValue;
    cardElement.querySelector('.elements__image').src = imgValue;

    cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    cardElement.querySelector('.elements__remove').addEventListener('click', function(evt) {
        evt.preventDefault();
        let currentCard = evt.currentTarget.parentNode;
        currentCard.remove();
    });

    // ------- 

    cardElement.querySelector('.popup__img-caption').textContent = titleValue;
    cardElement.querySelector('.popup__img').alt = titleValue;
    cardElement.querySelector('.popup__img').src = imgValue;
    cardElement.querySelector('.popup__close').addEventListener('click', function(evt){
        evt.preventDefault();
        let currentCard = evt.currentTarget.parentNode.parentNode;
        // console.log(currentCard);
        popupClose(currentCard);
    });
    cardElement.querySelector('.elements__image').addEventListener('click', function(evt){
        evt.preventDefault();
        let currentCard = evt.currentTarget.parentNode.querySelector('.popup');
        popupOpen(currentCard);
        // console.log(currentCard);
    });


    // popupImgContainer.prepend(popupImgElement);
    // cardsContainer.prepend(popupImgElement);


    // cardsContainer.append(cardElement);
    cardsContainer.prepend(cardElement);
}


// Функция попап для картинки
// function openCard(titleValue, imgValue) {
//     const popupImgTemplate = document.querySelector('#popup-img-template').content;
//     const popupImgElement = popupImgTemplate.cloneNode(true);

//     popupImgElement.querySelector('.popup__img-caption').textContent = titleValue;
//     popupImgElement.querySelector('.popup__img').alt = titleValue;
//     popupImgElement.querySelector('.elements__image').src = imgValue;
   
//     popupImgContainer.prepend(popupImgElement);
// }


// Открывает попап добавления карточки
function popupAdd() {
    popupOpen(popupAddNode);
}

// // Отправляет форму Места и закрывает попап 
function mestoFormSubmitHandler (evt) {
    evt.preventDefault();
    // console.log(123);

    addCard(mestoTitleInput.value, mestoLinkInput.value);

    mestoTitleInput.value = '';
    mestoLinkInput.value = '';
    popupClose(popupAddNode);
}


// -----------------------------------------------------------

// Вывод карточек из массива
initialCards.map(item => addCard(item.name, item.link));


// Вызов попапа редактирования профиля
editButtonNode.addEventListener('click', popupProfile);
closeButtonNode.addEventListener('click', popupCloseEdit);
formElement.addEventListener('submit', formSubmitHandler);


// Добавление новой карточки
addButtonNode.addEventListener('click', popupAdd);
closeButtonAddNode.addEventListener('click', popupCloseAdd);
// debugger
mestoFormElement.addEventListener('submit', mestoFormSubmitHandler);