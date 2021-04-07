import { getDate } from "../utils/date";
const searchInput = document.querySelector('.search__input');

export default class NewsApi {
  constructor(config) {
    this.newsApiUrl = config.newsApiUrl;
    this.key = config.key;
    this.pageSize = config.pageSize;
    this.language = config.language;
    this.sortNews = config.sortNews;
  }

  getNewsApi(searchInput) {
    const date = getDate();
    return fetch(
      `${this.newsApiUrl}${searchInput}&from=${date.dateFrom}&to=${date.dateTo}&language=${this.language}&sortBy=${this.sortNews}&pageSize=${this.pageSize}&apiKey=${this.key}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(err)
      })
      .catch((err) => {
        return err;
      })
  }
}