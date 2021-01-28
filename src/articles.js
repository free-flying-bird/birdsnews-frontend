import { data } from "autoprefixer";
import "./articles.css";
import MainApi from './js/api/MainApi';
import ArticlesList from './js/components/ArticlesList';
import { apiConfig, newsApiConfig } from './js/components/baseComponents';
import renderPreloader from './js/utils/renderPreloader';
import checkLogin from './js/utils/checkLogin';

if (!checkLogin()) {
  localStorage.setItem('isLogin', false);
  location.href = './index.html';
}

import {
  articlesContainer,
  wrapMenu,
  navigation,
  header,
  headerTitle,
  headerLinks,
  headerButton,
  articlesTitle,
  articlesTags } from './js/constants/constants';



const articlesList = new ArticlesList('', '', articlesContainer, '')

const mainApi = new MainApi(apiConfig);


wrapMenu.addEventListener('click', () => {
  headerLinks.forEach((item) => {
    return item.classList.toggle('header__link_theme_dark');
  })
  headerButton.classList.toggle('header__button_theme_dark');
  navigation.classList.toggle('header__navigation_type_open');
  wrapMenu.classList.toggle('header__menu-wrap_type_close');
  headerButton.textContent = 'Выйти';
  header.classList.toggle('header_position_fixed');
  header.classList.toggle('header_theme_dark');
  headerTitle.classList.toggle('header__title_position_fixed');
  headerTitle.classList.toggle('header__title_theme_dark');
});

mainApi.getUserName()
  .then((data) => {
    return data.data.name
  })
  .then((name) => {
    localStorage.setItem('userName', name);
  })
  .catch((err) => {
    return err
  });

mainApi.getArticles()
.then((data) => {
  renderPreloader(true)
  return data.data
})
.then((givenArticles) => {
  if (givenArticles.length != 0) {
    articlesTitle.textContent = localStorage.userName+', у Вас '+givenArticles.length+' сохраненных статей';
    articlesList.renderAll(givenArticles);
    const arr = Array.from(new Set(articlesList.arrTags));
    if (arr.length > 2) {
      articlesTags.textContent = 'По ключевым словам: '+arr[0]+', '+arr[1]+' и '+(arr.length - 2)+'-м другим';
    }
    else if (arr.length == 2) {
      articlesTags.textContent = 'По ключевым словам: '+arr[0]+', '+arr[1];

    }
    else {
      articlesTags.textContent = 'По ключевым словам: '+arr[0];
    }
    return articlesList.addArticles(givenArticles);
  }
  else {
    articlesContainer.classList.add('hide');
    articlesTitle.textContent = localStorage.userName+', у Вас нет сохраненных статей';
    articlesTags.classList.add('hide');
  }
})
.catch((err) => {
  return err
})
.finally(() => {
  renderPreloader(false)
})

headerButton.addEventListener('click', (event) => {
  event.preventDefault()
  mainApi.logout()
    .then(() => {
      localStorage.setItem('isLogin', false);
      location.href = './index.html';
    })
    .catch(() => {
      return err;
    })
})