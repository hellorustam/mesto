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
  nameInput,
  aboutInput,
  popupAddNode,
  popupImg,
  cardsContainer,
  selectorsObj,
} from "../scripts/config.js";

import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api.js";
import { apiConfig } from "../scripts/apiConfig.js";

const fromEdit = document.querySelector(validationConfig.popUpProfileForm);
const formProfile = new FormValidator(validationConfig, fromEdit);

const formAdd = document.querySelector(validationConfig.popUpMestoForm);
const formMesto = new FormValidator(validationConfig, formAdd);

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
  profileAvatar.style.backgroundImage = `url('${data?.avatar}')`;
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
  })
  .catch((err) =>
    console.log("Ошибка при получении данных о пользователе: " + err)
  );

const newInitialCardsArr = [];

const section = new Section(
  {
    // items: initialCards,
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
    // console.log(newInitialCardsArr);
  })
  .catch((err) => console.log("Ошибка при получении карточек: " + err));

//----

function openPopup(dataCard) {
  popupWithImage.openPopup(dataCard);
}

const createCard = (data) => {
  return new Card(data, selectorsObj, openPopup).createCard();
};

// const section = new Section(
//   {
//     // items: initialCards,
//     // items: newInitialCards(),
//     renderer: (item) => {
//       section.addItem(createCard(item));
//     },
//   },
//   cardsContainer
// );

const mestoPopup = new PopupWithForm({
  popup: popupAddNode,
  handleSubmit: (item) => {
    const newCardsData = {
      name: item.name,
      link: item.link,
    };

    function submitNewCard() {
      const postNewCard = {
        method: "POST",
        headers: {
          authorization: "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCardsData),
      };

      api
        .postCard(postNewCard)
        .catch((err) => console.log("Ошибка при получении карточек: " + err));
    }
    submitNewCard();

    section.addItem(createCard(item));
    mestoPopup.closePopup();
  },
});

const profilePopup = new PopupWithForm({
  popup: popupProfileNode,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    userInfo.updateUserInfo();

    // ----

    const bodyUserData = {
      name: data.name,
      about: data.about,
    };

    const changeUserBodyData = apiConfig.changeUserDataHeaders(bodyUserData);

    // function submitNewUserInfo() {
    //   const changeUserBodyData = {
    //     method: "PATCH",
    //     headers: {
    //       authorization: "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyUserData),
    //   };

    api
      .changeUserData(changeUserBodyData)
      // .then((data) => console.log(data.json()))
      .catch((err) => console.log("Ошибка при получении карточек: " + err));
    // }
    // submitNewUserInfo();

    // bodyUserData.name = data.name;
    // bodyUserData.about = data.about;

    // api
    //   .changeUserData(changeUserBodyData)
    //   .catch((err) => console.log("Ошибка при получении карточек: " + err));

    // ----

    profilePopup.closePopup();
  },
});

const userInfo = new UserInfo(profileNameNode, profileAboutNode);

userInfo.setUserInfo({
  name: profileNameNode.textContent,
  about: profileAboutNode.textContent,
});

// api.likeCard().then((data) => {
//   console.log(data);
// });

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

// section.renderAll();

mestoPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();

formMesto.enableValidation();
formProfile.enableValidation();
