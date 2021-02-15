import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");
    this._inputData = {};
    this._inputList.forEach((element) => {
      this._inputData[element.name] = element.value;
    });

    return this._inputData;
  }

  setEventListeners() {
    this._form = this._selector.querySelector(".popup__form");
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
