const editButtonNode = document.querySelector('.profile__edit');
const profileNameNode = document.querySelector('.profile__name');
const profileAboutNode = document.querySelector('.profile__about');

const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__name');
const aboutInput = document.querySelector('.popup__about'); 

const formElement = document.querySelector('.popup__form');


editButtonNode.addEventListener('click', togglePopupVis);
closeButtonNode.addEventListener('click', togglePopupVis);


//------------------------------------------------------------------------------


function togglePopupVis() {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;

    popupNode.classList.toggle('popup_visible');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileNameNode.textContent = nameInput.value;
    profileAboutNode.textContent = aboutInput.value;

    popupNode.classList.toggle('popup_visible');
}


formElement.addEventListener('submit', formSubmitHandler);