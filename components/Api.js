import { apiConfig } from "../scripts/apiConfig.js";

export class Api {
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

  changeUserData(data) {
    return fetch(apiConfig.urls.USER, apiConfig.changeUserDataHeaders(data));
  }

  changeAvatarData(data) {
    return fetch(apiConfig.urls.AVATAR, apiConfig.changeUserDataHeaders(data));
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
    return fetch(apiConfig.urls.CARDS, apiConfig.postCardHeaders(data)).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    );
  }

  addLikeCard(id) {
    return fetch(`${apiConfig.urls.LIKES}/${id}`, apiConfig.addLikeCard()).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    );
  }

  removeLikeCard(id) {
    return fetch(
      `${apiConfig.urls.LIKES}/${id}`,
      apiConfig.removeLikeCard()
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${apiConfig.urls.CARDS}/${id}`, apiConfig.deleteCard()).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    );
  }
}
