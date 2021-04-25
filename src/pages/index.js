import "./index.css";

import { initialCards } from "../scripts/initial-cards.js";
import {
  validationConfig,
  editButtonNode,
  profileNameNode,
  profileAboutNode,
  addButtonNode,
  popupProfileNode,
  nameInput,
  aboutInput,
  popupAddNode,
  popupImg,
  cardsContainer,
  selectorsObj,
} from "../scripts/config.js";

import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

const popupWithImage = new PopupWithImage(popupImg);

function openPopup(dataCard) {
  popupWithImage.openPopup(dataCard);
}

const createCard = (data) => {
  return new Card(data, selectorsObj, openPopup).createCard();
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardsContainer
);

const mestoPopup = new PopupWithForm({
  popup: popupAddNode,
  handleSubmit: (item) => {
    section.addItem(createCard(item));

    mestoPopup.closePopup();
  },
});

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();
    profilePopup.closePopup();
  },
});

const userInfo = new UserInfo(profileNameNode, profileAboutNode);

userInfo.setUserInfo({
  name: profileNameNode.textContent,
  about: profileAboutNode.textContent,
});

// Вызов попапа редактирования профиля
editButtonNode.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();

  nameInput.value = getUserInfo.name;
  aboutInput.value = getUserInfo.about;

  profilePopup.openPopup(nameInput, aboutInput);
});

// ----

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  mestoPopup.openPopup();
});

section.renderAll();

mestoPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
