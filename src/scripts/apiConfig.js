const TOKEN = "1f3f6d46-ee23-42d9-b041-2bb6b8e9765e";

const CONFIG_API = {
  ADDRESS: "https://mesto.nomoreparties.co/v1",
  GROUP_ID: "cohort-22",
};

const PREF_API = `${CONFIG_API.ADDRESS}/${CONFIG_API.GROUP_ID}`;

const URLS = {
  USER: `${PREF_API}/users/me`,
  AVATAR: `${PREF_API}/users/me/avatar`,
  CARDS: `${PREF_API}/cards`,
  LIKES: `${PREF_API}/cards/likes`,
};

const GET_USER_DATA_HEADERS = {
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
};

const CHANGE_USER_DATA_HEADERS = (data) => {
  return {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

const GET_CARDS_HEADERS = {
  headers: {
    authorization: TOKEN,
  },
};

const POST_CARD_HEADERS = (data) => {
  return {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

const ADD_LIKE_CARD = () => {
  return {
    method: "PUT",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  };
};

const REMOVE_LIKE_CARD = () => {
  return {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  };
};

const DELETE_CARD = () => {
  return {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  };
};

// const REMOVE_LIKE_CARD = () => {
//   return {
//     method: "DELETE",
//     headers: {
//       authorization: TOKEN,
//       "Content-Type": "application/json",
//     },
//   };
// };

export const apiConfig = {
  urls: URLS,
  getUserDataHeaders: GET_USER_DATA_HEADERS,
  changeUserDataHeaders: CHANGE_USER_DATA_HEADERS,
  getCardsHeaders: GET_CARDS_HEADERS,
  postCardHeaders: POST_CARD_HEADERS,
  addLikeCard: ADD_LIKE_CARD,
  removeLikeCard: REMOVE_LIKE_CARD,
  deleteCard: DELETE_CARD,
};
