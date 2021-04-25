export class Api {
  constructor({ address, token, groupID }) {
    this._address = address;
    this._token = token;
    this._groupID = groupID;
  }

  // ----

  getUserData() {
    return fetch(`${this._address}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  changeUserData(data) {
    return fetch(`${this._address}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  changeAvatarData(data) {
    return fetch(`${this._address}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  // ---------

  getCards() {
    return fetch(`${this._address}/${this._groupID}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  // ---------
}
