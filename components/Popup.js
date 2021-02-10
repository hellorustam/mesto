export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  openPopup(itm) {
    itm.classList.add("popup_visible");
    itm.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.closePopup(itm);
      }
    });
    this._handleEscClose(itm);
  }

  closePopup(itm) {
    itm.classList.remove("popup_visible");
  }

  _handleEscClose(itm) {
    document.addEventListener("keyup", (evt) => {
      if (evt.key === "Escape") {
        this.closePopup(itm);
      }
    });
  }

  setEventListeners() {}
}
