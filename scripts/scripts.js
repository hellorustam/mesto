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
const popupImgContainer = document.querySelector('.elements__element');







function popupOpen (itm) {
    itm.classList.add('popup_visible');
}
function popupClose (itm) {
    itm.classList.remove('popup_visible');
}



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

    cardElement.querySelector('.elements__title').textContent = titleValue;
    cardElement.querySelector('.elements__image').alt = titleValue;
    cardElement.querySelector('.elements__image').src = imgValue;

    cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    cardElement.querySelector('.elements__remove').addEventListener('click', function(evt) {
        let currentCard = evt.currentTarget.parentNode;
        currentCard.remove();
    });

    cardElement.querySelector('.popup__img-caption').textContent = titleValue;
    cardElement.querySelector('.popup__img').alt = titleValue;
    cardElement.querySelector('.popup__img').src = imgValue;
    cardElement.querySelector('.popup__close').addEventListener('click', function(evt){
        let currentCard = evt.currentTarget.parentNode.parentNode;
        popupClose(currentCard);
    });
    cardElement.querySelector('.elements__image').addEventListener('click', function(evt){
        let currentCard = evt.currentTarget.parentNode.querySelector('.popup');
        popupOpen(currentCard);
    });

    cardsContainer.prepend(cardElement);
}


// Открывает попап добавления карточки
// function popupAdd() {
//     popupOpen(popupAddNode);
// }

// // Отправляет форму Места и закрывает попап 
function mestoFormSubmitHandler (evt) {
    evt.preventDefault();

    addCard(mestoTitleInput.value, mestoLinkInput.value);

    mestoFormElement.reset();
    popupClose(popupAddNode);
}


// Вывод карточек из массива
initialCards.map(item => addCard(item.name, item.link));


// Вызов попапа редактирования профиля
editButtonNode.addEventListener('click', popupProfile);
closeButtonNode.addEventListener('click', () => {
    popupClose(popupProfileNode);
});
formElement.addEventListener('submit', formSubmitHandler);


// Добавление новой карточки
addButtonNode.addEventListener('click', () => {
    popupOpen(popupAddNode);
});
closeButtonAddNode.addEventListener('click', () => {
    popupClose(popupAddNode);
});

mestoFormElement.addEventListener('submit', mestoFormSubmitHandler);