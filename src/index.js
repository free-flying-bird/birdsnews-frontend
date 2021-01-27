import "./index.css";

import Popup from './js/components/Popup';
import InfoPopup from './js/components/InfoPopup';
import FormValidator from './js/components/FormValidator';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import { apiConfig, newsApiConfig } from './js/components/baseComponents';
import renderPreloader from './js/utils/renderPreloader';
import ArticlesList from './js/components/ArticlesList';
// import headerRender from './js/utils/headerRender';
import { data } from "autoprefixer";

import {
  searchInput,
  errorMessage,
  successButton,
  searchButton,
  articles,
  articlesContainer,
  regButton,
  regAltButton,
  loginAltButton,
  wrapMenu,
  logoutButton,
  logoutIcon } from './js/constants/constants';

const newsApi = new NewsApi(newsApiConfig);
const mainApi = new MainApi(apiConfig);
const popupLogin = new Popup (document.querySelector('.popup_type_login'));
const popupReg = new Popup (document.querySelector('.popup_type_reg'));

const popupError = new InfoPopup(document.querySelector('.popup_type_error'));
const popupSuccess = new InfoPopup(document.querySelector('.popup_type_success'));


const loginValidator = new FormValidator(popupLogin.form, popupLogin.form.email, popupLogin.form.password);
const regValidator = new FormValidator(popupReg.form, popupReg.form.email, popupReg.form.password);
const articlesList = new ArticlesList('', document.querySelector('.articles__load-button'), articlesContainer);



searchButton.addEventListener('click', () => {

  articlesList.clear();
  if (searchInput.value) {
    renderPreloader(true);
    articlesList.addKeyord(searchInput.value)
    newsApi.getNewsApi(searchInput.value)
      .then((data) => {
        return data.articles
        })
      .then((givenArticles) => {
        if (givenArticles.length != 0) {
          document.querySelector('.result-not-found').classList.add('hide');
          articles.classList.remove('hide');
          articlesList.render(givenArticles);
          return articlesList.addArticles(givenArticles);
        }
        else {
          articles.classList.add('hide');
          document.querySelector('.result-not-found').classList.remove('hide');
        }
      })
      .catch((err) => {
        popupError.open();
        errorMessage.textContent = err;
      })
      .finally(() => {
        renderPreloader(false);
      })}
  else if (!searchInput.value) {
    popupError.open();
    errorMessage.textContent = 'Введите ключевые слова для поиска';
  }
});

document.querySelector('.articles__load-button').addEventListener('click', () => {
  articlesList.render(articlesList.givenArticles);
});

wrapMenu.addEventListener('click', () => {
  const navigation = document.querySelector('.header__navigation');
  const header = document.querySelector('.header');
  const headerTitle = document.querySelector('.header__title');
  navigation.classList.toggle('header__navigation_type_open');
  wrapMenu.classList.toggle('header__menu-wrap_type_close');
  header.classList.toggle('header_position_fixed');
  headerTitle.classList.toggle('header__title_position_fixed');
})

regButton.addEventListener('click', () => {
  popupLogin.open();
});

regAltButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('popup__alt-button_type_reg')) {
    popupLogin.change();
    popupReg.open();
  }
});
loginAltButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('popup__alt-button_type_login')) {
    popupReg.change();
    popupLogin.open();
  }
});

successButton.addEventListener('click', (event) => {
  event.preventDefault();
  popupLogin.open();
  popupSuccess.change();
})

logoutButton.addEventListener('click', () => {
  mainApi.logout()
      .then((res) => {
        location.reload();
        return res
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        return err
      })
});

popupReg.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (popupReg.form.checkValidity()) {
    mainApi.signup(popupReg.form.email.value, popupReg.form.password.value, popupReg.form.name.value)
    .then((res) => {
      if (res._id) {
      popupReg.change();
      popupSuccess.open();
      }
      else if (res === 409) {
        popupError.open();
        errorMessage.textContent = "Указаный Email уже зарегистрирован";
      }
      else {
        popupError.open();
        errorMessage.textContent = 'Что-то пошло не так';
      }
    })
  }
  else {
    popupError.open();
    errorMessage.textContent = 'Заполните правильно форму';
  }
});

popupLogin.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (popupLogin.form.checkValidity()) {
    mainApi.signin(popupLogin.form.email.value, popupLogin.form.password.value)
    .then((res) => {
      if (res.status === 401) {
        popupError.open();
        errorMessage.textContent = 'Неправильная почта или пароль';
      }
    })
  }
});
function headerRender() {
  mainApi.getUserName()
  .then((data) => {
    if (data.data.name) {
      localStorage.setItem('isLogin', true);
      logoutButton.classList.remove('hide');
      regButton.classList.add('hide');
      document.querySelector('.header__link_articles').classList.remove('hide');
      logoutButton.textContent = data.data.name;
      logoutButton.appendChild(logoutIcon);
    }
    else if (!data.data.name) {
      localStorage.setItem('isLogin', false);
      logoutButton.classList.add('hide');
      regButton.classList.remove('hide');
      document.querySelector('.header__link_articles').classList.add('hide');
    }
  })
  .catch(() => {
    localStorage.setItem('isLogin', false);
    logoutButton.classList.add('hide');
    regButton.classList.remove('hide');
    document.querySelector('.header__link_articles').classList.add('hide');
  })
};

headerRender();