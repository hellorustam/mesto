import "./index.css";

import { initialCards } from "../scripts/initial-cards.js";
import {
  validationConfig,
  editButtonNode,
  profileNameNode,
  profileAboutNode,
  profileAvatar,
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
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api.js";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

const popupWithImage = new PopupWithImage(popupImg);

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1",
  token: "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e",
  groupID: "cohort-22",
});

const userData = {};

api
  .getUserData()
  .then((data) => {
    userData.name = data.name;
    userData.about = data.about;
    userData.avatar = data.avatar;
    const { name, about, avatar } = data;
    profileNameNode.textContent = name;
    profileAboutNode.textContent = about;
    profileAvatar.src = avatar;
  })
  .catch((err) =>
    console.log("Ошибка при получении данных о пользователе: " + err)
  );

// profileNameNode.textContent = userData.name;
// profileAboutNode.textContent = about;

// console.log(profileNameNode.textContent);

console.log(userData);

// profileNameNode.textContent = userData.then((data) => {
//   const { name, about, avatar } = data;
//   profileNameNode.textContent = name;
//   profileAboutNode.textContent = about;
// });

api
  .getCards()
  .catch((err) => console.log("Ошибка при получении карточек: " + err));

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

  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  // nameInput.value = getUserInfo.name;
  // aboutInput.value = getUserInfo.about;

  profilePopup.openPopup();
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
