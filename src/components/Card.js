import { Api } from "../components/Api.js";
import { apiConfig } from "../scripts/apiConfig.js";
const api = new Api({});

export class Card {
  constructor(data, config, handleImagePopup) {
    this._data = data;
    this._text = data.name;
    this._img = data.link;
    this._config = config;
    this._handleImagePopup = handleImagePopup;
  }

  _getTemplate() {
    return document.querySelector(this._config.cardTemplate).content;
  }

  _likeCard(node) {
    const elementLike = node.querySelector(".elements__like");

    elementLike.addEventListener("click", (evt) => {
      // const eventTarget = evt.target;
      // const likeActive = eventTarget.querySelector(".elements__like_active");
      const likeCounter = elementLike.querySelector(".elements__count_like");

      // api.getUserData().then((dataUser) => {
      //   this._data.likes.forEach((i) => {
      //     if (i._id === dataUser._id) {
      //       console.log("yes");
      //       elementLike.classList.toggle("elements__like_active");
      //     } else {
      //       console.log("no");
      //       elementLike.classList.toggle("elements__like_active");
      //     }
      //   });
      // });

      if (elementLike.classList.contains("elements__like_active")) {
        api.removeLikeCard(this._data._id).then((data) => {
          likeCounter.textContent = data.likes.length;
        });

        elementLike.classList.toggle("elements__like_active");
      } else {
        api.addLikeCard(this._data._id).then((data) => {
          likeCounter.textContent = data.likes.length;
        });

        elementLike.classList.toggle("elements__like_active");
      }
    });
  }

  _removeCard(node) {
    node.querySelector(".elements__remove").addEventListener("click", (evt) => {
      const delPopup = document.querySelector(this._config.popupDelCard);
      const delPopupForm = delPopup.querySelector(".popup__form");

      delPopupForm.addEventListener("submit", () => {
        return api.deleteCard(this._data._id).then((data) => {
          console.log(data);
          delPopup.classList.toggle("popup_visible");
          location.reload();
        });
      });

      // api.deleteCard(this._data._id).then((data) => {
      //   console.log(data);
      // });

      delPopup.classList.toggle("popup_visible");
      // evt.currentTarget.closest(".elements__element").remove();
    });
  }

  _openImage(node) {
    node.querySelector(".elements__image").addEventListener("click", (evt) => {
      this._handleImagePopup(this._data);
    });
  }

  createCard(userId) {
    const cardElement = this._getTemplate().cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");
    const titleCard = cardElement.querySelector(".elements__title");
    const likeElement = cardElement.querySelector(".elements__count_like");
    const buttonLike = cardElement.querySelector(".elements__like");
    const buttonRemove = cardElement.querySelector(".elements__remove");

    titleCard.textContent = this._text;
    imgElement.src = this._img;
    imgElement.alt = this._text;
    likeElement.textContent = this._data.likes.length;

    this._data.likes.forEach((i) => {
      if (i._id.includes(userId)) {
        buttonLike.classList.toggle("elements__like_active");
      }
    });

    if (this._data.owner._id === userId) {
      buttonRemove.style.display = "block";
    }

    this._likeCard(cardElement);
    this._removeCard(cardElement);
    this._openImage(cardElement);

    return cardElement;
  }
}
