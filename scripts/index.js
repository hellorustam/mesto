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
} from "./config.js";
import { FormValidator } from "./FormValidator.js";

const popupActive = (itm) => {
  document.addEventListener("keyup", (evt) => {
    if (evt.key === "Escape") {
      closePopup(itm);
    }
  });
};

function openPopup(itm) {
  itm.classList.add("popup_visible");
  itm.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(itm);
    }
  });
  popupActive(itm);
}

function closePopup(itm) {
  itm.classList.remove("popup_visible");
  itm.removeEventListener("click");
  document.removeEventListener("keyup");
}

// Подтягивает данные профиля и открывает попап
function openProfilePopup() {
  nameInput.value = profileNameNode.textContent;
  aboutInput.value = profileAboutNode.textContent;

  openPopup(popupProfileNode);
}

// Отправляет форму Профиля и закрывает попап
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileNameNode.textContent = nameInput.value;
  profileAboutNode.textContent = aboutInput.value;

  closePopup(popupProfileNode);
}

// Создание карточки
function createCard(titleValue, imgValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const imgElement = cardElement.querySelector(".elements__image");

  imgElement.src = imgValue;
  imgElement.alt = titleValue;
  cardElement.querySelector(".elements__title").textContent = titleValue;

  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });

  cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", (evt) => {
      evt.currentTarget.closest(".elements__element").remove();
    });

  imgElement.addEventListener("click", function (evt) {
    popupImgSource.src = imgValue;
    popupImgSource.alt = titleValue;
    popupImgCaption.textContent = titleValue;
    openPopup(popupImg);
  });

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

// Отправляет форму Места и закрывает попап
function handleMestoSubmit(evt) {
  const submitButton = mestoFormElement.querySelector(".popup__button");

  evt.preventDefault();

  addCard(
    cardsContainer,
    createCard(mestoTitleInput.value, mestoLinkInput.value)
  );

  submitButton.classList.add("popup__button_invalid");
  submitButton.disabled = true;

  mestoFormElement.reset();
  closePopup(popupAddNode);
}

// ----

// Вывод карточек из массива
initialCards.map((item) => {
  addCard(cardsContainer, createCard(item.name, item.link));
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
  closePopup(popupImg);
});
mestoFormElement.addEventListener("submit", handleMestoSubmit);

// ----

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);
formMesto.enableValidation();

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);
formProfile.enableValidation();
