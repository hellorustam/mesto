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
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api.js";

// ----

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);
const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);
const formAvatar = new FormValidator(validationConfig, popupAvatarForm);

const formAvatar = new FormValidator(validationConfig, popupAvatarForm);

const popupWithImage = new PopupWithImage(popupImg);

const userInfo = new UserInfo(profileNameNode, profileAboutNode);

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1",
  token: "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e",
  groupID: "cohort-22",
});

// ----

api
  .getUserData()
  .then((data) => {
    profileNameNode.textContent = data?.name;
    profileAboutNode.textContent = data?.about;
    profileAvatar.src = data?.avatar;

    // Вызов попапа смены аватара
    profileEditAvatar.addEventListener("click", () => {
      avatarPopup.openPopup();
    });
  })
  .catch((err) =>
    console.log("Ошибка при получении данных о пользователе: " + err)
  );

editButtonNode.addEventListener("click", () => {
  api
    .getUserData()
    .then((data) => {
      nameInput.value = data?.name;
      aboutInput.value = data?.about;
    })
    .catch((err) =>
      console.log("Ошибка при получении данных о пользователе: " + err)
    );

  profilePopup.openPopup();
});

const changeUserData = (data) => {
  return api
    .changeUserData(data)
    .catch((err) => console.log("Ошибка при получении карточек: " + err))
    .finally(() => {
      // renderLoading(false, popupProfileNode);
    });
};

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();

    const bodyUserData = {
      name: data?.name,
      about: data?.about,
    };

    changeUserData(bodyUserData);
    profilePopup.closePopup();
  },
});

// ----

const changeAvatarData = (data) => {
  return api
    .changeAvatarData(data)
    .catch((err) => console.log("Ошибка при получении карточек: " + err))
    .finally(() => {
      // renderLoading(false, popupAvatarNode);
    });
};

const avatarPopup = new PopupWithForm({
  popup: popupAvatarNode,
  handleSubmit: (data) => {
    const newAvatarData = {
      avatar: data.link,
    };
    profileAvatar.src = data?.link;

    // renderLoading(true, popupAvatarNode);

    changeAvatarData(newAvatarData);
    avatarPopup.closePopup();
  },
});

// ----

function openPopup(dataCard) {
  popupWithImage.openPopup(dataCard);
}

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

    renderLoading(true, popupAddNode);

    api
      .postCard(newCardsData)
      // .then(() => {

      // })
      .then(() => {
        location.reload();
        return data;
      })
      .catch((err) => console.log("Ошибка при получении карточек: " + err))
      .finally(() => {
        renderLoading(false, popupAddNode);
      });

    section.addItemPrepend(createCard(newCardsData));
    mestoPopup.closePopup();
    // location.reload();
  },
});

// ----

// ----

userInfo.setUserInfo({
  name: profileNameNode.textContent,
  about: profileAboutNode.textContent,
});

// ----

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  mestoPopup.openPopup();
});

mestoPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
popupWithImage.setEventListeners();
avatarPopup.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
formAvatar.enableValidation();
