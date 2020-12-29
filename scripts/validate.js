// const profileFormNode = document.querySelector('.popup__profile-form');
// const nameFormInput = profileFormNode.querySelector('.popup__name');
// const aboutFormInput = profileFormNode.querySelector('.popup__about'); 
// const inputList = profileFormNode.querySelectorAll('.popup__input');
// const submitButton = profileFormNode.querySelector('.popup__button');

// profileFormNode.addEventListener('submit', (evt) => {
//     evt.preventDefault();
// })


function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputInvalidClass);
}

function checkInputValidity(form, input, config) {
    if(input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

function setButtonState(button, isActive, config) {
    if(isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = 'disabled';
    }
}



function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {    
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__input_invalid',
    buttonInvalidClass: 'popup__button_invalid'
};

enableValidation(validationConfig);