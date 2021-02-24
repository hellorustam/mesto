import "./index.css";

import { initialCards } from "../scripts/initial-cards.js";
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
  // popupImgSource,
  // popupImgCaption,
  cardsContainer,
  // cardTemplate,
  selectorsObj,
} from "../scripts/config.js";

import { Card } from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(
        new Card(item.name, item.link, selectorsObj).createCard()
      );
    },
  },
  cardsContainer
);

const mestoPopup = new PopupWithForm({
  selector: popupAddNode,
  handleSubmit: () => {
    section.addItem(
      new Card(
        mestoTitleInput.value,
        mestoLinkInput.value,
        selectorsObj
      ).createCard()
    );

    mestoPopup.closePopup();
    // new Popup(popupAddNode).closePopup(popupAddNode);
  },
});

const profilePopup = new PopupWithForm({
  selector: popupProfileNode,
  handleSubmit: () => {
    userInfo.setUserInfo(profileNameNode, profileAboutNode);
    userInfo.updateUserInfo(nameInput.value, aboutInput.value);
  },
});

const userInfo = new UserInfo(
  profileNameNode.textContent,
  profileAboutNode.textContent
);

userInfo.setUserInfo(profileNameNode.textContent, profileAboutNode.textContent);

// Вызов попапа редактирования профиля
editButtonNode.addEventListener("click", () => {
  userInfo.setUserInfo(
    profileNameNode.textContent,
    profileAboutNode.textContent
  );

  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;

  profilePopup.openPopup(nameInput, aboutInput);
  profilePopup.setEventListeners();
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  userInfo.setUserInfo(profileNameNode, profileAboutNode);
  userInfo.updateUserInfo(nameInput.value, aboutInput.value);

  new Popup(popupProfileNode).closePopup(popupProfileNode);
});

closeButtonNode.addEventListener("click", () => {
  profilePopup.closePopup();
});

// ----

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  new Popup(popupAddNode).openPopup(popupAddNode);
  new Popup(popupAddNode).setEventListeners(popupAddNode);
});

closeButtonAddNode.addEventListener("click", () => {
  mestoPopup.closePopup();
});

// Закрытие попапа с картинкой
popupImg.querySelector(".popup__close").addEventListener("click", () => {
  new Popup(popupImg).closePopup(popupImg);
});

// ----

section.renderAll();

mestoFormElement.addEventListener("submit", mestoPopup.setEventListeners());

profilePopup.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
