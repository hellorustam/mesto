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
  elementsLike,
  elementsRemove,
  popupImg,
  cardsContainer,
  selectorsObj,
} from "../scripts/config.js";

import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDelCard } from "../components/PopupDelCard.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";

// ----

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);
const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);
const formAvatar = new FormValidator(validationConfig, popupAvatarForm);

const popupWithImage = new PopupWithImage(popupImg);

const userInfo = new UserInfo(profileNameNode, profileAboutNode, profileAvatar);

const api = new Api(apiConfig.address, apiConfig.token, apiConfig.groupID);

const section = new Section(
  {
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardsContainer
);

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

const userDataArr = {};

const getUserData = api
  .getUserData()
  .then((data) => {
    // userDataArr.name = data?.name;
    // userDataArr.about = data?.about;
    // userDataArr.avatar = data?.avatar;
    userDataArr.id = data?._id;
    profileNameNode.textContent = data?.name;
    profileAboutNode.textContent = data?.about;
    profileAvatar.src = data?.avatar;
  })
  .catch((err) =>
    console.log("Ошибка при получении данных о пользователе: " + err)
  );

Promise.all([getUserData, getCards]).catch((err) =>
  console.log("Ошибка при получении данных о пользователе: " + err)
);

profileEditAvatar.addEventListener("click", () => {
  avatarPopup.openPopup();
});

editButtonNode.addEventListener("click", (evt) => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData?.name.textContent;
  aboutInput.value = userData?.about.textContent;
  profilePopup.openPopup();
});

const changeUserData = (data) => {
  return api
    .changeUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.updateUserInfo();
      profilePopup.closePopup();
    })
    .catch((err) => console.log("Ошибка при получении карточек: " + err))
    .finally(() => {
      renderLoading(false, popupProfileNode);
    });
};

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    renderLoading(true, popupProfileNode);

    const bodyUserData = {
      name: data?.name,
      about: data?.about,
    };

    changeUserData(bodyUserData);
  },
});

// ----

const changeAvatarData = (data) => {
  return api
    .changeAvatarData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.updateUserInfo();
      avatarPopup.closePopup();
    })
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
    changeAvatarData(newAvatarData);
  },
});

// ----

const createCard = (data) => {
  return new Card(data, selectorsObj, openPopup, {
    removeLike: (id, target) => {
      api
        .removeLikeCard(id)
        .then((data) => {
          target.textContent = data.likes.length;
        })
        .catch((err) => console.log("Ошибка: " + err));
    },
    addLike: (id, target) => {
      api
        .addLikeCard(id)
        .then((data) => {
          target.textContent = data.likes.length;
        })
        .catch((err) => console.log("Ошибка: " + err));
    },
    popupDelCard: (id, node) => {
      popupDelCard().openPopup();
      popupDelCard(id, node).setEventListeners();
    },
  }).createCard(userDataArr.id);
};

const getCards = api
  .getCards()
  .then((data) => {
    section.renderAll(data);
  })
  .catch((err) => console.log("Ошибка при получении карточек: " + err));

// ----

const popupDelCard = (id, node) => {
  return new PopupDelCard({
    popup: popupDelCardNode,
    handleSubmit: () => {
      renderLoading(true, popupDelCardNode);
      api
        .deleteCard(id)
        .then(() => {
          popupDelCard().closePopup();
          node.remove();
          renderLoading(false, popupDelCardNode);
        })
        .catch((err) => console.log("Ошибка при получении карточек: " + err));
    },
  });
};

// popupDelCard().setEventListeners();

// ----

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
      owner: {
        _id: userDataArr.id,
      },
    };

    api
      .postCard(newCardsData)
      .then((data) => {
        newCardsData._id = data._id;
        section.addItemPrepend(createCard(newCardsData));
        mestoPopup.closePopup();
      })
      .catch((err) => console.log("Ошибка при получении карточек: " + err))
      .finally(() => {
        renderLoading(false, popupAddNode);
      });
  },
});

// ----

// userInfo.setUserInfo({
//   name: profileNameNode.textContent,
//   about: profileAboutNode.textContent,
//   avatar: profileAvatar.src,
// });

// ----

// Кнопка добавление новой карточки
addButtonNode.addEventListener("click", () => {
  mestoPopup.openPopup();
});

mestoPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
avatarPopup.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
formAvatar.enableValidation();
