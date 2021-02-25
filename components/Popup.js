export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup(this._popup);
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      console.log(evt.target);
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.closePopup(this._popup);
      }
    });
  }
}
