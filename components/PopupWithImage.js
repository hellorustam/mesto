import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  openPopup() {
    this._selector.addEventListener("click", function () {
      const popupImgSource = document.querySelector(".popup__img");
      const popupImgCaption = document.querySelector(".popup__img-caption");
      const popupImg = document.querySelector(".popup-img");

      popupImgSource.src = this.src;
      popupImgSource.alt = this.alt;
      popupImgCaption.textContent = this.alt;

      new Popup(popupImg).openPopup();
      new Popup(popupImg).setEventListeners();
    });
  }
}
