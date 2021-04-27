export class Api {
  constructor(address, token, groupID) {
    this._address = address;
    this._token = token;
    this._groupID = groupID;
  }

  // ----

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // ----

  getUserData() {
    return fetch(`${this._address}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  changeUserData(data) {
    return fetch(`${this._address}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  changeAvatarData(data) {
    return fetch(`${this._address}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // ----

  getCards() {
    return fetch(`${this._address}/${this._groupID}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  postCard(data) {
    return fetch(`${this._address}/${this._groupID}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // ----

  addLikeCard(id) {
    return fetch(`${this._address}/${this._groupID}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  removeLikeCard(id) {
    return fetch(`${this._address}/${this._groupID}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // ----

  deleteCard(id) {
    return fetch(`${this._address}/${this._groupID}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // ----
}
