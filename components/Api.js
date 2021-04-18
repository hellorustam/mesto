import { apiConfig } from "../scripts/apiConfig";
// console.log(apiConfig);
// console.log(apiConfig.getUserDataHeaders);

export class Api {
  // constructor({ address, token, groupID, name, about }) {
  //   this._address = address;
  //   this._token = token;
  //   this._groupID = groupID;
  //   // this._name = name;
  //   // this._about = about;
  // }

  // getUserData() {
  //   return fetch(apiConfig.urls.USER, apiConfig.getUserDataHeaders).then(
  //     (response) => {
  //       return response.json();
  //     }
  //   );
  // }

  getUserData() {
    return fetch(apiConfig.urls.USER, apiConfig.getUserDataHeaders).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    );
  }

  // getUserData() {
  //   return fetch(`${this._address}/${this._groupID}/users/me`, {
  //     headers: {
  //       authorization: this._token,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     return Promise.reject(`Ошибка: ${response.status}`);
  //   });
  //   // .then((data) => {
  //   //   return data;
  //   // });
  // }

  // changeUserData() {
  //   return fetch(`${this._address}/${this._groupID}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: this._token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Rustam",
  //       about: "dez",
  //       // name: this._name,
  //       // about: this._about,
  //     }),
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     return Promise.reject(`Ошибка: ${response.status}`);
  //   });
  // }

  getCards() {
    return fetch(apiConfig.urls.CARDS, apiConfig.getCardsHeaders).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    );
  }
}
