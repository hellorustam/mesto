import { initialCards } from "./initial-cards.js";
import {
  validationConfig,
  editButtonNode,
  profileNameNode,
  profileAboutNode,
  addButtonNode,
  popupProfileNode,
  closeButtonNode,
  nameInput,
  aboutInput,
  formElement,
  popupAddNode,
  closeButtonAddNode,
  mestoTitleInput,
  mestoLinkInput,
  mestoFormElement,
  popupImg,
  popupImgSource,
  popupImgCaption,
  cardsContainer,
  cardTemplate,
  selectorsObj,
} from "./config.js";

import { Card } from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { FormValidator } from "../components/FormValidator.js";

import { addCard } from "./utils.js";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);
const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

// Подтягивает данные профиля и открывает попап
function openProfilePopup() {
  nameInput.value = profileNameNode.textContent;
  aboutInput.value = profileAboutNode.textContent;

  // formProfile.enableValidation();
  openPopup(popupProfileNode);
}

// ----

// Отправляет форму Профиля и закрывает попап
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileNameNode.textContent = nameInput.value;
  profileAboutNode.textContent = aboutInput.value;

  closePopup(popupProfileNode);
}

// Отправляет форму Места и закрывает попап
function handleMestoSubmit(evt) {
  const submitButton = mestoFormElement.querySelector(".popup__button");

  evt.preventDefault();

  addCard(
    cardsContainer,
    new Card(
      mestoTitleInput.value,
      mestoLinkInput.value,
      selectorsObj
    ).createCard()
  );

  submitButton.classList.add("popup__button_invalid");
  submitButton.disabled = true;

  mestoFormElement.reset();
  closePopup(popupAddNode);
}

// ----

// Вывод карточек из массива
initialCards.map((item) => {
  addCard(
    cardsContainer,
    new Card(item.name, item.link, selectorsObj).createCard()
  );
});

// Вызов попапа редактирования профиля
editButtonNode.addEventListener("click", openProfilePopup);
closeButtonNode.addEventListener("click", () => {
  closePopup(popupProfileNode);
});
formElement.addEventListener("submit", handleProfileSubmit);

// Добавление новой карточки
addButtonNode.addEventListener("click", () => {
  openPopup(popupAddNode);
});
closeButtonAddNode.addEventListener("click", () => {
  closePopup(popupAddNode);
});

popupImg.querySelector(".popup__close").addEventListener("click", () => {
  new Popup(popupImg).closePopup(popupImg);
});
mestoFormElement.addEventListener("submit", handleMestoSubmit);

// ----

formMesto.enableValidation();
formProfile.enableValidation();
