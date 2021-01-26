const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__input_invalid',
    buttonInvalidClass: 'popup__button_invalid',
    popUpMestoForm: '.popup__mesto-form'
};

class Validation {
    constructor(config, form){
        this._config = config;
        this._form = form;
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

    setButtonState(button, isActive) {
        if(isActive) {
            button.classList.remove(this._config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.buttonInvalidClass);
            button.disabled = true;
        }
    }



    setEventListener() {
        const inputList = this._form.querySelectorAll(this._config.inputSelector);
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);

        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {    
                checkInputValidity(input);
                setButtonState(submitButton, form.checkValidity());
            });
        });
    }

    enableValidation() {
            setEventListener();

            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });

            const submitButton = this._form.querySelector(this._config.submitButtonSelector);
            setButtonState(submitButton, this._form.checkValidity());
    }
}


const formAdd = document.querySelector(validationConfig.formSelector);
const form = new Validation(validationConfig, formAdd);


// enableValidation(validationConfig);