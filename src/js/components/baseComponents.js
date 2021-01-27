import { newsApiKey } from './newsApiKey.js';

const newsApiUrl = process.env.NODE_ENV === 'development'
  ? 'https://newsapi.org/v2/everything?q='
  : 'https://nomoreparties.co/news/v2/everything?q=';

const apiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://api.birdsnews.ru';

const apiConfig = {
  url: `${apiUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
};

const newsApiConfig = {
  key: `${newsApiKey}`,
  pageSize: 100,
  language: 'ru',
  sortNews: 'publishedAt',
  newsApiUrl: `${newsApiUrl}`,
};

export {
  apiConfig,
  newsApiConfig
};