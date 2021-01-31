class Card {
  constructor(text, img, config) {
    this._text = text;
    this._img = img;
    this._config = config;
    this._card = document.querySelector(this._config.cardTemplate).content;
    this._popupImgSource = document.querySelector(this._config.popupImgSource);
    this._popupImgCaption = document.querySelector(
      this._config.popupImgCaption
    );
    this._popupImg = document.querySelector(this._config.popupImg);
  }

  //   _likeCard() {
  //     const cardElement = this._card.cloneNode(true);
  //     cardElement
  //       .querySelector(".elements__like")
  //       .addEventListener("click", (evt) => {
  //         evt.target.classList.toggle("elements__like_active");
  //       });
  //   }

  //   _removeCard() {
  //     cardElement
  //       .querySelector(".elements__remove")
  //       .addEventListener("click", (evt) => {
  //         evt.currentTarget.closest(".elements__element").remove();
  //       });
  //   }

  //   _popUpCard() {
  //     imgElement.addEventListener("click", function () {
  //       this._config.popupImgSource.src = this._img;
  //       this._config.popupImgSource.alt = this._text;
  //       this._config.popupImgCaption.textContent = this._text;
  //       openPopup(this._config.popupImg);
  //     });
  //   }

  createCard() {
    const cardElement = this._card.cloneNode(true);
    const imgElement = cardElement.querySelector(".elements__image");

    imgElement.src = this._img;
    imgElement.alt = this._text;
    cardElement.querySelector(".elements__title").textContent = this._text;

    // this._likeCard();

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

    imgElement.addEventListener("click", function () {
      this._popupImgSource.src = this._img;
      this._popupImgSource.alt = this._text;
      this._popupImgCaption.textContent = this._text;
      openPopup(this._popupImg);
    });

    return cardElement;
  }
}

export { Card };
