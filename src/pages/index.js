import "./index.css";

import {
  apiConfig,
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

const api = new Api(apiConfig.address, apiConfig.token, apiConfig.groupID);

// ----

function renderLoading(isLoading, node) {
  const loader = node.querySelector(validationConfig.loaderNode);
  if (isLoading) {
    loader.textContent = "...";
  } else {
    loader.textContent = "";
  }
}

// ----

api
  .getUserData()
  .then((data) => {
    profileNameNode.textContent = data?.name;
    profileAboutNode.textContent = data?.about;
    profileAvatar.src = data?.avatar;

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
      renderLoading(false, popupProfileNode);
    });
};

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();

    renderLoading(true, popupProfileNode);

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
    .catch((err) => console.log("Ошибка при получении аватара: " + err))
    .finally(() => {
      renderLoading(false, popupAvatarNode);
    });
};

const avatarPopup = new PopupWithForm({
  popup: popupAvatarNode,
  handleSubmit: (data) => {
    const newAvatarData = {
      avatar: data.link,
    };
    renderLoading(true, popupAvatarNode);
    profileAvatar.src = data?.link;
    changeAvatarData(newAvatarData);
    avatarPopup.closePopup();
  },
});

// -----------

const createCard = (data) => {
  return new Card(data, selectorsObj, openPopup).createCard(apiConfig.userId);
};

const section = (data) => {
  return new Section(
    {
      items: data,
      renderer: (item) => {
        section(data).addItem(createCard(item));
      },
    },
    cardsContainer
  );
};

api
  .getCards()
  .then((data) => {
    section(data).renderAll();
  })
  .catch((err) => console.log("Ошибка при получении карточек: " + err));

// -----------

function openPopup(dataCard) {
  popupWithImage.openPopup(dataCard);
}

const mestoPopup = new PopupWithForm({
  popup: popupAddNode,
  handleSubmit: (item) => {
    renderLoading(true, popupAddNode);

    const newCardsData = {
      name: item.name,
      link: item.link,
      likes: [],
      // owner: {
      //   _id: apiConfig.userId,
      // },
    };

    console.log(newCardsData.likes.length);

    api
      .postCard(newCardsData)
      .catch((err) => console.log("Ошибка при получении карточек: " + err))
      .finally(() => {
        renderLoading(false, popupAddNode);
      });

    section().addItemPrepend(createCard(newCardsData));
    mestoPopup.closePopup();
    // location.reload();
  },
});

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
