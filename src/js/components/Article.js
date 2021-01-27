import { apiConfig } from '../components/baseComponents';
import articleDate from '../utils/articleDate';
import MainApi from '../api/MainApi';
import checkLogin from '../utils/checkLogin';

export default class Article {
  constructor(givenArticle, keyword) {
    this.image = givenArticle.urlToImage;
    this.date = articleDate(givenArticle.publishedAt);
    this.title = givenArticle.title;
    this.text = givenArticle.description;
    this.source = givenArticle.source.name;
    this.url = givenArticle.url;
    this.keyword = keyword;
    this.MainApi = new MainApi(apiConfig);
  }
  create() {
    // const article =
    // `<div class="article">
    //  <img src="${this.image}" alt="Картинка статьи" class="article__image">
    //  <div class="article__button button article__button_type_like" data-title="Войдите, чтобы сохранять статьи">
    //      <div class="article__icon article__icon_type_like"></div>
    //  </div>
    //  <p class="article__date">${this.date}</p>
    //  <h3 class="article__title">${this.title}</h3>
    //  <p class="article__subtitle">${this.text}</p>
    //  <a href="${this.url}" target="_blank" title="${this.source}" class="link article__source">${this.source}</a>
    // </div>`
    // this._checkLogin();
    const article = document.createElement('div');
    const articleImage = document.createElement('img');
    const articleButton = document.createElement('div');
    const articleIcon = document.createElement('div');
    const articleDate = document.createElement('p');
    const articleTitle = document.createElement('h3');
    const articleSubtitle = document.createElement('p');
    const articleSource = document.createElement('a');

    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleButton.classList.add('article__button', 'button', 'article__button_type_like');
    articleIcon.classList.add('article__icon', 'article__icon_type_like');
    articleDate.classList.add('article__date');
    articleTitle.classList.add('article__title');
    articleSubtitle.classList.add('article__subtitle');
    articleSource.classList.add('link', 'article__source');

    if (!this._checkLogin()) {
      articleButton.setAttribute('data-title', 'Войдите, чтобы сохранять статьи');
    }
    else {
      articleButton.setAttribute('data-title', 'Нажмите, чтобы сохранить статью');
    };

    articleImage.setAttribute('src', `${this.image}`);
    articleImage.setAttribute('alt', 'Картинка статьи');
    articleDate.textContent = this.date;
    articleTitle.textContent = this.title;
    articleSubtitle.textContent = this.text;
    articleSource.textContent = this.source;
    articleSource.setAttribute('href', `${this.url}`);
    articleSource.setAttribute('target', '_blank');
    articleSource.setAttribute('title', `${this.source}`);

    articleButton.appendChild(articleIcon);
    article.appendChild(articleImage);
    article.appendChild(articleButton);
    article.appendChild(articleDate);
    article.appendChild(articleTitle);
    article.appendChild(articleSubtitle);
    article.appendChild(articleSource);

    this.article = article;
    return article;
  }
  setEventListeners() {
    if (this._checkLogin()) {
        this.article.querySelector('.article__button').addEventListener('click', this.like.bind(this));
    }
  }
  like() {
    if (!this._id) {
      this.MainApi.createArticle(this)
      .then((res) => {
        this._id = res.data._id;
        this.article.querySelector('.article__icon_type_like').classList.add('article__icon_type_is-liked');
        return this._id;
      })
      .catch((err) => {
        return err;
      })
    }
    else if (this._id) {
      this.MainApi.removeArticle(this._id)
      .then((res) => {
        this._id = undefined;
        this.article.querySelector('.article__icon_type_like').classList.remove('article__icon_type_is-liked');
        return this._id;
      })
      .catch((err) => {
        return err;
      })
    }
  }
  delete() {
    this.MainApi.removeArticle(this._id)
      .then(() => {
        this.article.classList.add('hide')
      })
      .catch(() => {
        return err;
      })
  }
  createSaved(givenArticle) {
    const article = document.createElement('div');
    const articleImage = document.createElement('img');
    const articleButton = document.createElement('div');
    const articleIcon = document.createElement('div');
    const articleDate = document.createElement('p');
    const articleTitle = document.createElement('h3');
    const articleSubtitle = document.createElement('p');
    const articleSource = document.createElement('a');

    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleButton.classList.add('article__button', 'button', 'article__button_type_like');
    articleIcon.classList.add('article__icon', 'article__icon_type_delete');
    articleDate.classList.add('article__date');
    articleTitle.classList.add('article__title');
    articleSubtitle.classList.add('article__subtitle');
    articleSource.classList.add('link', 'article__source');


    articleButton.setAttribute('data-title', 'Нажмите, чтобы удалить статью');

    articleImage.setAttribute('src', `${givenArticle.image}`);
    articleImage.setAttribute('alt', 'Картинка статьи');
    articleDate.textContent = givenArticle.date;
    articleTitle.textContent = givenArticle.title;
    articleSubtitle.textContent = givenArticle.text;
    articleSource.textContent = givenArticle.source;
    articleSource.setAttribute('href', `${givenArticle.link}`);
    articleSource.setAttribute('target', '_blank');
    articleSource.setAttribute('title', `${givenArticle.source}`);

    articleButton.appendChild(articleIcon);
    article.appendChild(articleImage);
    article.appendChild(articleButton);
    article.appendChild(articleDate);
    article.appendChild(articleTitle);
    article.appendChild(articleSubtitle);
    article.appendChild(articleSource);

    this.article = article;
    return article;
  }
  _checkLogin() {
    return checkLogin();
  }
}