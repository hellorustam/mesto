import { apiConfig } from "../scripts/apiConfig.js";

export class Api {
  // constructor({ address, token, groupID, name, about }) {
  //   this._address = address;
  //   this._token = token;
  //   this._groupID = groupID;
  //   // this._name = name;
  //   // this._about = about;
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

  changeUserData(data) {
    return fetch(apiConfig.urls.USER, data);
  }

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

  postCard(data) {
    return fetch(apiConfig.urls.CARDS, data).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  // likeCard() {
  //   return fetch(apiConfig.urls.CARDS, apiConfig.getCardsHeaders)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return Promise.reject(`Ошибка: ${response.status}`);
  //     })
  //     .then((data) => {
  //       // console.log(data);
  //       return data[1].likes;
  //     });
  // }
}
