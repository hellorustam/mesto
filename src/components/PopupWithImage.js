import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImgSource = this._popup.querySelector(".popup__img");
    this._popupImgCaption = this._popup.querySelector(".popup__img-caption");
  }

  openPopup(dataCard) {
    this._popupImgSource.src = dataCard.link;
    this._popupImgSource.alt = dataCard.name;
    this._popupImgCaption.textContent = dataCard.name;

    super.openPopup();
  }
}
