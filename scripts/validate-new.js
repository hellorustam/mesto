const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__input_invalid',
    buttonInvalidClass: 'popup__button_invalid',
    popUpMestoForm: '.popup__mesto-form'
};


class Validation {
    constructor(config, formElement){
        this._config = config;
        this._form = formElement;
        this._button = this._form.querySelector(this._config.submitButtonSelector)
    }

    showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }

    hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputInvalidClass);
    }

    checkInputValidity(input) {
        if(input.validity.valid) {
            hideError(input);
        } else {
            showError(input);
        }
    }

    setButtonState(isActive) {
        if(isActive) {
            this._button.classList.remove(this._config.buttonInvalidClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.buttonInvalidClass);
            this._button.disabled = true;
        }
    }



    setEventListener() {
        const inputList = this._form.querySelectorAll(this._config.inputSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {    
                checkInputValidity(input);
                setButtonState(this._form.checkValidity());
            });
        });
    }

    enableValidation() {
            setEventListener();
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                console.log('Форма отправлена')
            });
            setButtonState(this._form.checkValidity());
    }
}


const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const form = new Validation(validationConfig, formAdd);

console.log(form);