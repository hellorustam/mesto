export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  openPopup() {
    this._selector.classList.add("popup_visible");
  }

  closePopup() {
    this._selector.classList.remove("popup_visible");
  }

  _handleEscClose() {
    document.addEventListener("keyup", (evt) => {
      if (evt.key === "Escape") {
        this.closePopup(this._selector);
      }
    });
  }

  setEventListeners() {
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.closePopup(this._selector);
      }
    });
    this._handleEscClose(this._selector);
  }
}
