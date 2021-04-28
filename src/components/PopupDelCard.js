import { Popup } from "./Popup.js";

export class PopupDelCard extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  // _updateCard() {
  //   this._card = {};
  //   let cardToDelete = id;
  //   return this._card;
  // }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
}
