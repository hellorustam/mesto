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
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

// import { addCard } from "./utils.js";

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

section.renderAll();

const profileMesto = new PopupWithForm(popupProfileNode);

const userInfo = new UserInfo(
  profileNameNode.textContent,
  profileAboutNode.textContent
);
userInfo.setUserInfo(profileNameNode.textContent, profileAboutNode.textContent);

// Отправляет форму Места и закрывает попап
function handleMestoSubmit(evt) {
  const submitButton = mestoFormElement.querySelector(".popup__button");

  evt.preventDefault();

  section.addItem(
    new Card(
      mestoTitleInput.value,
      mestoLinkInput.value,
      selectorsObj
    ).createCard()
  );

  submitButton.classList.add("popup__button_invalid");
  submitButton.disabled = true;

  new Popup(popupAddNode).closePopup(popupAddNode);
  mestoFormElement.reset();
}

// ----

// Вызов попапа редактирования профиля
editButtonNode.addEventListener("click", () => {
  userInfo.setUserInfo(
    profileNameNode.textContent,
    profileAboutNode.textContent
  );

  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;

  profileMesto.openPopup(nameInput, aboutInput);
  profileMesto.setEventListeners();
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  userInfo.setUserInfo(profileNameNode, profileAboutNode);
  userInfo.updateUserInfo(nameInput.value, aboutInput.value);

  profileMesto.closePopup(popupProfileNode);
});

closeButtonNode.addEventListener("click", () => {
  new Popup(popupProfileNode).closePopup(popupProfileNode);
});

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  new Popup(popupAddNode).openPopup(popupAddNode);
  new Popup(popupAddNode).setEventListeners(popupAddNode);
});
closeButtonAddNode.addEventListener("click", () => {
  new Popup(popupAddNode).closePopup(popupAddNode);
});

popupImg.querySelector(".popup__close").addEventListener("click", () => {
  new Popup(popupImg).closePopup(popupImg);
});

mestoFormElement.addEventListener("submit", handleMestoSubmit);

// ----

formMesto.enableValidation();
formProfile.enableValidation();
