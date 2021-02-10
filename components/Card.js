import { PopupWithImage } from "../components/PopupWithImage.js";

export class Card {
  constructor(text, img, config) {
    this._text = text;
    this._img = img;
    this._config = config;
  }

  _getTemplate() {
    return document.querySelector(this._config.cardTemplate).content;
  }

  _likeCard(node) {
    node.querySelector(".elements__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });
  }

  _removeCard(node) {
    node.querySelector(".elements__remove").addEventListener("click", (evt) => {
      evt.currentTarget.closest(".elements__element").remove();
    });
  }

  createCard() {
    const cardElement = this._getTemplate().cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");

    imgElement.src = this._img;
    imgElement.alt = this._text;
    cardElement.querySelector(".elements__title").textContent = this._text;

    this._likeCard(cardElement);
    this._removeCard(cardElement);
    new PopupWithImage(imgElement).openPopup(imgElement);

    return cardElement;
  }
}
