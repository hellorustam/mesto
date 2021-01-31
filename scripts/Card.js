import { openPopup } from "./utils.js";

class Card {
  constructor(text, img, config) {
    this._text = text;
    this._img = img;
    this._config = config;
    this._card = document.querySelector(this._config.cardTemplate).content;
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

  _popUpCard(node) {
    node.addEventListener("click", function () {
      const popupImgSource = document.querySelector(".popup__img");
      const popupImgCaption = document.querySelector(".popup__img-caption");
      const popupImg = document.querySelector(".popup-img");

      popupImgSource.src = this.src;
      popupImgSource.alt = this.alt;
      popupImgCaption.textContent = this.alt;
      openPopup(popupImg);
    });
  }

  createCard() {
    const cardElement = this._card.cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");

    imgElement.src = this._img;
    imgElement.alt = this._text;
    cardElement.querySelector(".elements__title").textContent = this._text;

    this._likeCard(cardElement);
    this._removeCard(cardElement);
    this._popUpCard(imgElement);

    return cardElement;
  }
}

export { Card };
