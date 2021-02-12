import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
    // this._submitForm = (evt) => {
    //   evt.preventDefault();
    //   profileNameNode.textContent = nameInput.value;
    //   profileAboutNode.textContent = aboutInput.value;
    // };
  }

  _getInputValues(nameInput, aboutInput) {
    nameInput.value = profileNameNode.textContent;
    aboutInput.value = profileAboutNode.textContent;
  }

  // openProfile(name, about) {
  //   super.openPopup();
  //   _getInputValues(name, about);

  //   setEventListeners();
  // }

  closePopup() {
    this._selector.classList.remove("popup_visible");
    // this._selector.reset();
  }

  setEventListeners() {
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.closePopup(this._selector);
      }
    });
    this._handleEscClose(this._selector);
  }

  editProfile() {
    editButtonNode.addEventListener("click", openPopup(this._selector));
  }
}
