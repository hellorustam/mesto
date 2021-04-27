import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((element) => {
      this._inputData[element.name] = element.value;
    });

    return this._inputData;
  }

  setEventListeners() {
    this._form.addEventListener("submit", () => {
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
