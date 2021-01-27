const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputInvalidClass: "popup__input_invalid",
  buttonInvalidClass: "popup__button_invalid",
  popUpMestoForm: ".popup__mesto-form",
  popUpProfileForm: ".popup__profile-form",
};

//---
const qSel = (node) => document.querySelector(node);

const selectorsObj = {
  editButtonNode: ".profile__edit",
  profileNameNode: ".profile__name",
  profileAboutNode: ".profile__about",
  addButtonNode: ".profile__add-button",

  popupProfileNode: ".popup-profile",
  closeButtonNode: ".popup__close",
  nameInput: ".popup__name",
  aboutInput: ".popup__about",
  formElement: ".popup__profile-form",

  popupAddNode: ".popup-add",
  closeButtonAddNode: ".popup__close",
  mestoTitleInput: ".popup__mesto-title",
  mestoLinkInput: ".popup__mesto-link",
  mestoFormElement: ".popup__mesto-form",

  popupImg: ".popup-img",
  popupImgSource: ".popup__img",
  popupImgCaption: ".popup__img-caption",

  cardsContainer: ".elements",
  cardTemplate: "#card-template",
};

//---

const editButtonNode = qSel(selectorsObj.editButtonNode);
const profileNameNode = qSel(selectorsObj.profileNameNode);
const profileAboutNode = qSel(selectorsObj.profileAboutNode);
const addButtonNode = qSel(selectorsObj.addButtonNode);

const popupProfileNode = qSel(selectorsObj.popupProfileNode);
const closeButtonNode = qSel(selectorsObj.closeButtonNode);
const nameInput = qSel(selectorsObj.nameInput);
const aboutInput = qSel(selectorsObj.aboutInput);
const formElement = qSel(selectorsObj.formElement);

const popupAddNode = qSel(selectorsObj.popupAddNode);
const closeButtonAddNode = qSel(selectorsObj.closeButtonAddNode);
const mestoTitleInput = qSel(selectorsObj.mestoTitleInput);
const mestoLinkInput = qSel(selectorsObj.mestoLinkInput);
const mestoFormElement = qSel(selectorsObj.mestoFormElement);

const popupImg = qSel(selectorsObj.popupImg);
const popupImgSource = qSel(selectorsObj.popupImgSource);
const popupImgCaption = qSel(selectorsObj.popupImgCaption);

const cardsContainer = qSel(selectorsObj.cardsContainer);
const cardTemplate = qSel(selectorsObj.cardTemplate).content;

export {
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
};

// const editButtonNode = document.querySelector(".profile__edit");
// const profileNameNode = document.querySelector(".profile__name");
// const profileAboutNode = document.querySelector(".profile__about");
// const addButtonNode = document.querySelector(".profile__add-button");

// // const popupNode = document.querySelectorAll('.popup');
// const popupProfileNode = document.querySelector(".popup-profile");
// const closeButtonNode = popupProfileNode.querySelector(".popup__close");
// const nameInput = popupProfileNode.querySelector(".popup__name");
// const aboutInput = popupProfileNode.querySelector(".popup__about");
// const formElement = popupProfileNode.querySelector(".popup__profile-form");

// const popupAddNode = document.querySelector(".popup-add");
// const closeButtonAddNode = popupAddNode.querySelector(".popup__close");
// const mestoTitleInput = popupAddNode.querySelector(".popup__mesto-title");
// const mestoLinkInput = popupAddNode.querySelector(".popup__mesto-link");
// const mestoFormElement = popupAddNode.querySelector(".popup__mesto-form");

// const popupImg = document.querySelector(".popup-img");
// const popupImgSource = document.querySelector(".popup__img");
// const popupImgCaption = document.querySelector(".popup__img-caption");

// const cardsContainer = document.querySelector(".elements");
// // const popupImgContainer = document.querySelector('.elements__element');
// const cardTemplate = document.querySelector("#card-template").content;
