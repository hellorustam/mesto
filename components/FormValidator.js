class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _setButtonState(isActive) {
    if (isActive) {
      this._button.classList.remove(this._config.buttonInvalidClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._config.buttonInvalidClass);
      this._button.disabled = true;
    }
  }

  _setEventListener() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setButtonState(this._form.checkValidity());
      });
    });
  }

  enableValidation() {
    this._setEventListener();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setButtonState(this._form.checkValidity());
  }
}

export { FormValidator };
