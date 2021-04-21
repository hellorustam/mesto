import "./index.css";

// import { initialCards } from "../scripts/initial-cards.js";

import {
  validationConfig,
  editButtonNode,
  profileNameNode,
  profileAboutNode,
  profileAvatar,
  addButtonNode,
  popupProfileNode,
  popupAvatarNode,
  popupAvatarForm,
  profileEditAvatar,
  nameInput,
  aboutInput,
  popupDelCardNode,
  popupAddNode,
  popupImg,
  cardsContainer,
  selectorsObj,
} from "../scripts/config.js";

import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDelCard } from "../components/PopupDelCard.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import { Api } from "../components/Api.js";
import { apiConfig } from "../scripts/apiConfig.js";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

const formAvatar = new FormValidator(validationConfig, popupAvatarForm);

const popupWithImage = new PopupWithImage(popupImg);

const api = new Api({});

// const api = new Api({
//   address: "https://mesto.nomoreparties.co/v1",
//   token: "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e",
//   groupID: "cohort-22",
//   // name: userData.name,
//   // about: userData.about,
// });

function renderUserDataInContent(data) {
  profileNameNode.textContent = data?.name;
  profileAboutNode.textContent = data?.about;
  profileAvatar.src = "";
  profileAvatar.src = data?.avatar;
  // profileAvatar.style.backgroundImage = `url('${data?.avatar}')`;
}

api
  .getUserData()
  .then((data) => {
    renderUserDataInContent(data);

    // Вызов попапа редактирования профиля
    editButtonNode.addEventListener("click", () => {
      nameInput.value = data.name;
      aboutInput.value = data.about;

      profilePopup.openPopup();
    });

    // Вызов попапа смены аватара
    profileEditAvatar.addEventListener("click", () => {
      avatarPopup.openPopup();
    });
  })
  .catch((err) =>
    console.log("Ошибка при получении данных о пользователе: " + err)
  );

const newInitialCardsArr = [];

const section = new Section(
  {
    items: newInitialCardsArr,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardsContainer
);

api
  .getCards()
  .then((data) => {
    data.forEach((element) => {
      newInitialCardsArr.push(element);
    });
    section.renderAll();
  })
  .catch((err) => console.log("Ошибка при получении карточек: " + err));

//----

function openPopup(dataCard) {
  popupWithImage.openPopup(dataCard);
}

const createCard = (data) => {
  return new Card(data, selectorsObj, openPopup).createCard();
};

const mestoPopup = new PopupWithForm({
  popup: popupAddNode,
  handleSubmit: (item) => {
    const newCardsData = {
      name: item.name,
      link: item.link,
      likes: [],
      owner: {
        _id: "746c6052f7a7f26f04c96054",
      },
    };

    api
      .postCard(newCardsData)
      .then((data) => {
        location.reload();
        return data;
      })
      .catch((err) => console.log("Ошибка при получении карточек: " + err));

    section.addItemPrepend(createCard(newCardsData));
    mestoPopup.closePopup();
    // location.reload();
  },
});

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();

    const bodyUserData = {
      name: data.name,
      about: data.about,
    };

    api
      .changeUserData(bodyUserData)
      .catch((err) => console.log("Ошибка при получении карточек: " + err));

    profilePopup.closePopup();
  },
});

const avatarPopup = new PopupWithForm({
  popup: popupAvatarNode,
  handleSubmit: (data) => {
    const newAvatarData = {
      avatar: data.link,
    };

    profileAvatar.src = data?.link;

    api
      .changeAvatarData(newAvatarData)
      .catch((err) => console.log("Ошибка при получении карточек: " + err));

    avatarPopup.closePopup();
  },
});

// const delCardPopup = new PopupDelCard({
//   popup: popupDelCardNode,
//   handleSubmit: (data) => {
//     console.log(data);

//     // api
//     //   .deleteCard(this._data._id)
//     //   .then((data) => {
//     //     console.log(data);
//     //   })
//     //   .catch((err) => console.log("Ошибка при получении карточек: " + err));

//     delCardPopup.closePopup();
//   },
// });

// delCardPopup.setEventListener();

const userInfo = new UserInfo(profileNameNode, profileAboutNode);

userInfo.setUserInfo({
  name: profileNameNode.textContent,
  about: profileAboutNode.textContent,
});

// // Вызов попапа редактирования профиля
// editButtonNode.addEventListener("click", () => {
//   const getUserInfo = userInfo.getUserInfo();

//   // nameInput.value = userData.name;
//   // aboutInput.value = userData.about;
//   nameInput.value = getUserInfo.name;
//   aboutInput.value = getUserInfo.about;

//   profilePopup.openPopup();
// });

// ----

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  mestoPopup.openPopup();
});

mestoPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
popupWithImage.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
formAvatar.enableValidation();
