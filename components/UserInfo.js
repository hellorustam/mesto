export class UserInfo {
  constructor({ name, about }) {
    this._nameEdit = name;
    this._aboutEdit = about;
    this._name = "";
    this._about = "";
  }

  setUserInfo(newName, newAbout) {
    this._name = newName;
    this._about = newAbout;
  }

  updateUserInfo(nameInput, aboutInput) {
    this._name.textContent = nameInput;
    this._about.textContent = aboutInput;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }
}
