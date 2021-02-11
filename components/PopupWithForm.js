import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
  }

  _getInputValues(nameInput, aboutInput) {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;

    // openPopup(popupProfileNode);
  }

  closePopup(itm) {
    itm.classList.remove("popup_visible");
    itm.reset();
  }

  setEventListeners() {}
}
