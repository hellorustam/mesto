import { Popup } from "./Popup.js";
// import { Api } from "../components/Api.js";
// import { apiConfig } from "../scripts/apiConfig.js";
// const api = new Api({});

export class PopupDelCard extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  setEventListener() {
    this._form = this._popup.querySelector(".popup__form");
    this._form.addEventListener("submit", () => {
      this
        ._handleSubmit
        //   () => {
        //   return api.deleteCard(this._data._id).then((data) => {
        //     console.log(data);
        //   });
        // }
        ();
      location.reload();
    });
    super.setEventListeners();
  }
}
