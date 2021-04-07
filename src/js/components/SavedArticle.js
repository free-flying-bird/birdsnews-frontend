import { apiConfig } from '../components/baseComponents';
import MainApi from '../api/MainApi';
import checkLogin from '../utils/checkLogin';

export default class SavedArticle {
  constructor(givenArticle) {
    this.image = givenArticle.image;
    this.date = givenArticle.date
    this.title = givenArticle.title;
    this.text = givenArticle.text;
    this.source = givenArticle.source;
    this.url = givenArticle.url;
    this.keyword = givenArticle.keyword;
    this._id = givenArticle._id;
    this.MainApi = new MainApi(apiConfig);
  }

  setEventListeners() {
    if (this._checkLogin()) {
        this.article.querySelector('.article__button').addEventListener('click', this.delete.bind(this));
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
  createSaved() {
    const article = document.createElement('div');
    const articleImage = document.createElement('img');
    const articleButton = document.createElement('div');
    const articleIcon = document.createElement('div');
    const articleDate = document.createElement('p');
    const articleTitle = document.createElement('h3');
    const articleSubtitle = document.createElement('p');
    const articleSource = document.createElement('a');
    const articleTag = document.createElement('p')

    articleTag.classList.add('article__tag');
    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleButton.classList.add('article__button', 'button', 'article__button_type_like');
    articleIcon.classList.add('article__icon', 'article__icon_type_delete');
    articleDate.classList.add('article__date');
    articleTitle.classList.add('article__title');
    articleSubtitle.classList.add('article__subtitle');
    articleSource.classList.add('link', 'article__source');


    articleButton.setAttribute('data-title', 'удалить статью');
    articleTag.textContent = this.keyword;
    articleImage.setAttribute('src', `${this.image}`);
    articleImage.setAttribute('alt', 'Картинка статьи');
    articleDate.textContent = this.date;
    articleTitle.textContent = this.title;
    articleSubtitle.textContent = this.text;
    articleSource.textContent = this.source;
    articleSource.setAttribute('href', `${this.link}`);
    articleSource.setAttribute('target', '_blank');
    articleSource.setAttribute('title', `${this.source}`);

    articleButton.appendChild(articleIcon);
    article.appendChild(articleTag);
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