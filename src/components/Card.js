export class Card {
  constructor(
    data,
    config,
    handleImagePopup,
    { removeLike, addLike, deleteCard, popupDelCard }
  ) {
    this._data = data;
    this._text = data.name;
    this._img = data.link;
    this._config = config;
    this._handleImagePopup = handleImagePopup;
    this._removeLike = removeLike;
    this._addLike = addLike;
    this._deleteCard = deleteCard;
    this._popupDelCard = popupDelCard;
  }

  _getTemplate() {
    return document.querySelector(this._config.cardTemplate).content;
  }

  _likeCard(node) {
    const elementLike = node.querySelector(".elements__like");
    const countLike = elementLike.querySelector(".elements__count_like");

    elementLike.addEventListener("click", () => {
      if (elementLike.classList.contains("elements__like_active")) {
        this._removeLike(this._data._id, countLike);
        elementLike.classList.toggle("elements__like_active");
      } else {
        this._addLike(this._data._id, countLike);
        elementLike.classList.toggle("elements__like_active");
      }

      // this._data.likes.forEach((i) => {
      //   // console.log(i);
      //   if (this._data.likes.length >= 0) {
      //     this._addLike(this._data._id, countLike);
      //   } else if (i._id === this._config.userId) {
      //     this._removeLike(this._data._id, countLike);
      //   }
      //   // if (i._id.includes(this._config.userId)) {
      //   //   this._removeLike(this._data._id, countLike);
      //   // }
      // });

      // this._data.likes.forEach((i) => {
      // if (this._data.likes.length >= 0) {
      //   this._addLike(this._data._id, countLike);
      // } else if (i._id.includes(this._config.userId)) {
      //   this._removeLike(this._data._id, countLike);
      // }
      // if (i._id.includes(this._config.userId)) {
      //   console.log("includes id");
      //   // this._removeLike(this._data._id, countLike);
      // } else if (i._id.length === 0) {
      //   console.log(false);
      //   // this._addLike(this._data._id, countLike);
      // }
      // });
    });
  }

  _removeCard(node) {
    const popupDelCard = document.querySelector(this._config.popupDelCard);

    node.querySelector(".elements__remove").addEventListener("click", (evt) => {
      const currentCard = evt.currentTarget.closest(".elements__element");
      // popupDelCard.classList.toggle("popup_visible");
      this._popupDelCard();

      popupDelCard.addEventListener("submit", () => {
        this._deleteCard(this._data._id);
        currentCard.remove();
      });
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
