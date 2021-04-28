export class Card {
  constructor(
    data,
    config,
    handleImagePopup,
    { removeLike, addLike, popupDelCard }
  ) {
    this._data = data;
    this._text = data.name;
    this._img = data.link;
    this._config = config;
    this._handleImagePopup = handleImagePopup;
    this._removeLike = removeLike;
    this._addLike = addLike;
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
    });
  }

  _removeCard(node) {
    node.querySelector(".elements__remove").addEventListener("click", (evt) => {
      // console.log(this._data._id);
      // console.log(this._popupDelCard(this._data));

      const currentCard = evt.currentTarget.closest(".elements__element");

      this._popupDelCard();
      return (this._config.cardToDelete = {
        id: this._data._id,
        node: currentCard,
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
