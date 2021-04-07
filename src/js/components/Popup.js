export default class Popup {
    constructor (kindPopup) {
      this.kindPopup = kindPopup;
      this.form = this.kindPopup.querySelector('.popup__form');
      this.button = this.kindPopup.querySelector('.popup__button');
      this.setEventListeners();
    }
    setEventListeners() {
      this.kindPopup.querySelector('.popup__close').addEventListener('click', this.close);
    }
    open() {
      this.kindPopup.classList.add('popup_is-opened');
    }
    close() {
      event.target.parentNode.parentNode.classList.remove('popup_is-opened');
    }
    change() {
      this.kindPopup.classList.remove('popup_is-opened');
    }
  };