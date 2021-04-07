export default class MainApi {
  constructor(options) {
    this.baseUrl = options.url;
    this.headers = options.headers;
  }

  signup(email, password, name) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
      .catch((err) => {
        return err
      })
  }

  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          location.reload();
          return res
        }
        return res

      })
      .catch((err) => {
        return err
      })
  }

  getUserName() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
        return err
      }

        )
      .catch((err) => {
          return err.status;
        })
  }

  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        location.reload();
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      return err
    })
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        return err
      })
  }

  createArticle(obj) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: obj.keyword,
        title: obj.title,
        text: obj.text,
        date: obj.date,
        source: obj.source,
        link: obj.url,
        image: obj.image,
      }),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        return err
      })
  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        return err
      })
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}