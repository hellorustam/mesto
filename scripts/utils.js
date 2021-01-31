const popupActive = (itm) => {
  document.addEventListener("keyup", function evt(evt) {
    if (evt.key === "Escape") {
      closePopup(itm);
    }
  });
};

function openPopup(itm) {
  itm.classList.add("popup_visible");
  itm.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(itm);
    }
  });
  popupActive(itm);
}

function closePopup(itm) {
  itm.classList.remove("popup_visible");
  // itm.removeEventListener("click");
  // document.removeEventListener("keyup", evt());
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

export { popupActive, openPopup, closePopup, addCard };
