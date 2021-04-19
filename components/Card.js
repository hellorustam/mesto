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
      const eventTarget = evt.target;
      const likeButt = eventTarget.querySelector(".elements__like");

      if (likeButt === null) {
        const likes = {
          likes: ++this._data.likes.length,
        };

        const changeAddLikeData = apiConfig.addLikeCard(likes);

        api.addLikeCard(changeAddLikeData).then((data) => {
          const likeCounter = eventTarget.querySelector(
            ".elements__count_like"
          );

          likeCounter.textContent = likes;
          // console.log(likeCounter);
        });

        elementLike.classList.toggle("elements__like_active");
        console.log("+1");
      } else {
        api.removeLikeCard(this._data._id).then((data) => {
          const likes = --this._data.likes.length;
          const likeCounter = eventTarget.querySelector(
            ".elements__count_like"
          );

          likeCounter.textContent = likes;
          // console.log(likeCounter);
        });

        elementLike.classList.toggle("elements__like_active");
        console.log("-1");
      }
    });
  }

  _removeCard(node) {
    node.querySelector(".elements__remove").addEventListener("click", (evt) => {
      evt.currentTarget.closest(".elements__element").remove();
    });
  }

  _openImage(node) {
    node.querySelector(".elements__image").addEventListener("click", (evt) => {
      this._handleImagePopup(this._data);
    });
  }

  createCard() {
    const cardElement = this._getTemplate().cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");
    const likeElement = cardElement.querySelector(".elements__count_like");

    imgElement.src = this._img;
    imgElement.alt = this._text;
    likeElement.textContent = this._data.likes.length;

    cardElement.querySelector(".elements__title").textContent = this._text;

    this._likeCard(cardElement);
    this._removeCard(cardElement);
    this._openImage(cardElement);

    return cardElement;
  }
}
