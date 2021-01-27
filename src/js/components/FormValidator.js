export default class FormValidator {
    constructor (form, email, password, button) {
      this.form = form;
      this.email = email;
      this.password = password;
      this.name = name;
      this.button = this.form.querySelector('.popup__button');
      this.setEventListeners();
    }
    setEventListeners() {
      this.form.addEventListener('input', this.setSubmitButtonState)
      this.email.addEventListener('input', this.checkInputValidity(this.email, this.form.querySelector('.popup__email-error')));
      this.password.addEventListener('input', this.checkInputValidity(this.password, this.form.querySelector('.popup__password-error')));

    }
    checkInputValidity(eventTarget, errorMessage) {

      return () => {
        const regexEmail = /^[a-z0-9]+((\.|-|_)[a-z0-9]+)*@[a-z0-9]+((\.|-)[a-z0-9]+)*(\.[a-z]+)/;
        if (eventTarget.value.length === 0) {
          eventTarget.setCustomValidity("Это поле обязательно");


          } else if ((eventTarget.name === 'email') && (!(regexEmail.test(eventTarget.value)))) {
            eventTarget.setCustomValidity("Введите пароль в формате example@example.com");


          }
          else if ((eventTarget.name === 'password') && (eventTarget.value.length < 8)) {
            eventTarget.setCustomValidity("Введите пароль не менее 8 знаков")
          }
          else if ((eventTarget.name === 'name') && (eventTarget.value.length > 30) && (eventTarget.value.length < 2)) {
            eventTarget.setCustomValidity("Введите имя от 2 до 30 знаков")
          }
          else {
            eventTarget.setCustomValidity("");

          }
          errorMessage.textContent = eventTarget.validationMessage;
        }
      }


    setSubmitButtonState() {
      const button = this.querySelector('.popup__button');
      if (this.checkValidity()) {

        button.classList.add('popup__button_enable')
      }
      else {
        button.classList.remove('popup__button_enable')
      }
    }
  };