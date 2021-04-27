export class UserInfo {
  constructor(name, about, avatar) {
    this._nameEdit = name;
    this._aboutEdit = about;
    this._avatar = avatar;
    this._name = "";
    this._about = "";
  }

  setUserInfo(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  updateUserInfo() {
    this._nameEdit.textContent = this._name;
    this._aboutEdit.textContent = this._about;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }
}
