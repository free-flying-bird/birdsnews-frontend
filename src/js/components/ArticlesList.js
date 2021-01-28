import MainApi from '../api/MainApi';
import Article from './Article';
import SavedArticle from './SavedArticle';

export default class ArticlesList {
  constructor(givenArticles, showMoreButton, articlesContainer) {
    this.givenArticles = givenArticles;
    this.showMoreButton = showMoreButton;
    this.articlesContainer = articlesContainer;
  }
  render(givenArticles) {
    this.articlesContainer.classList.remove('hide');
    if (givenArticles.length > 3) {
      this.showMoreButton.classList.remove('hide');
      givenArticles.splice(0, 3).forEach(item => {
        const article = new Article(item, this.keyword);
        this.articlesContainer.insertAdjacentElement('beforeend', article.create());
        article.setEventListeners();
      });
    }
    else if (givenArticles) {
      givenArticles.forEach(item => {
        const article = new Article(item, this.keyword);
        this.articlesContainer.insertAdjacentElement('beforeend', article.create());
        article.setEventListeners();
      })
      this.showMoreButton.classList.add('hide');
    }
  }
  addArticles(givenArticles) {
    this.givenArticles = givenArticles;
    return givenArticles;
  }
  addKeyord(keyword) {
    return this.keyword = keyword;
  }
  renderAll(givenArticles) {
    if (givenArticles) {
      const arrTags = [];
      givenArticles.forEach(item => {
        const article = new SavedArticle(item);
        arrTags.push(item.keyword)
        this.articlesContainer.insertAdjacentElement('beforeend', article.createSaved(item));
        article.setEventListeners();
      })
      return this.arrTags = arrTags;
    }
  }
  clear() {
    while (this.articlesContainer.firstChild) {
      this.articlesContainer.removeChild(this.articlesContainer.firstChild);
      this.givenArticles = '';
      this.articlesContainer.classList.add('hide');
    }
  }
}