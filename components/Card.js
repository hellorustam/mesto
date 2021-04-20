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

  createCard() {
    const cardElement = this._getTemplate().cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");
    const likeElement = cardElement.querySelector(".elements__count_like");
    const buttonLike = cardElement.querySelector(".elements__like");
    const buttonRemove = cardElement.querySelector(".elements__remove");

    imgElement.src = this._img;
    imgElement.alt = this._text;
    likeElement.textContent = this._data.likes.length;

    api.getUserData().then((dataUser) => {
      this._data.likes.forEach((i) => {
        if (i._id.includes(dataUser._id)) {
          // if (i._id === dataUser._id) {
          buttonLike.classList.toggle("elements__like_active");
        }
      });

      // console.log(this._data.owner._id);
      if (this._data.owner._id === dataUser._id) {
        buttonRemove.style.display = "block";
      }
    });

    // api.getUserData().then((dataUser) => {
    //   if (this._data.likes.indexOf(dataUser._id)) {
    //     buttonLike.classList.toggle("elements__like_active");
    //   } else {
    //     console.log("no");
    //   }
    // });

    // buttonRemove.addEventListener("click", () => {
    //   const delPopup = document.querySelector(this._config.popupDelCard);
    //   // console.log(delPopup);

    //   delPopup.classList.toggle("popup_visible");
    //   // console.log(buttonRemove);
    // });

    cardElement.querySelector(".elements__title").textContent = this._text;

    this._likeCard(cardElement);
    this._removeCard(cardElement);
    this._openImage(cardElement);

    return cardElement;
  }
}
