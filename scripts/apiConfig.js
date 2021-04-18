// import { changeUserBodyData } from "../pages/index.js";
// console.log(changeUserBodyData);

const TOKEN = "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e";

const CONFIG_API = {
  ADDRESS: "https://mesto.nomoreparties.co/v1",
  GROUP_ID: "cohort-22",
};

const PREF_API = `${CONFIG_API.ADDRESS}/${CONFIG_API.GROUP_ID}`;

const URLS = {
  USER: `${PREF_API}/users/me`,
  CARDS: `${PREF_API}/cards`,
};

const GET_USER_DATA_HEADERS = {
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
};

const CHANGE_USER_DATA_HEADERS = {
  method: "PATCH",
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({
  //   name: changeUserBodyData.name,
  //   about: changeUserBodyData.about,
  // }),
  body: JSON.stringify({
    name: "Rustam",
    about: "designer111",
  }),
};

const GET_CARDS_HEADERS = {
  headers: {
    authorization: TOKEN,
    // "Content-Type": "application/json",
  },
};

export const apiConfig = {
  urls: URLS,
  getUserDataHeaders: GET_USER_DATA_HEADERS,
  changeUserDataHeaders: CHANGE_USER_DATA_HEADERS,
  getCardsHeaders: GET_CARDS_HEADERS,
};
