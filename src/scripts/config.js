const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  loaderNode: ".popup__loader",
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
  profileAvatar: ".profile__avatar",
  addButtonNode: ".profile__add-button",

  popupProfileNode: ".popup-profile",
  closeButtonNode: ".popup__close",
  nameInput: ".popup__name",
  aboutInput: ".popup__about",
  formElement: ".popup__profile-form",

  popupDelCard: ".popup-del-card",
  popupAddNode: ".popup-add",
  popupAvatarNode: ".popup-avatar",
  popupAvatarForm: ".popup__avatar-form",
  profileEditAvatar: ".profile__edit-avatar",
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
const profileAvatar = qSel(selectorsObj.profileAvatar);
const addButtonNode = qSel(selectorsObj.addButtonNode);

const popupProfileNode = qSel(selectorsObj.popupProfileNode);
const closeButtonNode = qSel(selectorsObj.closeButtonNode);
const nameInput = qSel(selectorsObj.nameInput);
const aboutInput = qSel(selectorsObj.aboutInput);
const formElement = qSel(selectorsObj.formElement);

const popupDelCardNode = qSel(selectorsObj.popupDelCard);
const popupAddNode = qSel(selectorsObj.popupAddNode);
const popupAvatarNode = qSel(selectorsObj.popupAvatarNode);
const popupAvatarForm = qSel(selectorsObj.popupAvatarForm);
const profileEditAvatar = qSel(selectorsObj.profileEditAvatar);
const closeButtonAddNode = popupAddNode.querySelector(
  selectorsObj.closeButtonNode
);
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
  profileAvatar,
  addButtonNode,
  popupProfileNode,
  popupAvatarNode,
  popupAvatarForm,
  profileEditAvatar,
  closeButtonNode,
  nameInput,
  aboutInput,
  formElement,
  popupDelCardNode,
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
