import { Popup } from "./Popup.js";

export class PopupDelCard extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".popup__form");

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
}
