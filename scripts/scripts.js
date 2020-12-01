const editButtonNode = document.querySelector('.profile__edit');
const profileNameNode = document.querySelector('.profile__name');
const profileAboutNode = document.querySelector('.profile__about');

const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__name');
const aboutInput = document.querySelector('.popup__about'); 

const formElement = document.querySelector('.popup__form');


//------------------------------------------------------------------------------

// Открывает попап
function popupOpen () {
    popupNode.classList.add('popup_visible');
}

// Закрывает попап
function popupClose () {
    popupNode.classList.remove('popup_visible');
}

// Подтягивает данные из профиля и открывает попап
function popupVis() {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;

    popupOpen();
}

// Отправляет форму и закрывает попап
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileNameNode.textContent = nameInput.value;
    profileAboutNode.textContent = aboutInput.value;

    popupClose();
}


editButtonNode.addEventListener('click', popupVis);
closeButtonNode.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);