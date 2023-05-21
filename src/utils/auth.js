class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  registration({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email' : email,
        'password': password
      })
    })
    .then(res => this._handleFirstResponse(res))
  }

  login({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email' : email,
        'password': password
      })
    })
    .then(res => this._handleFirstResponse(res))
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then(res => this._handleFirstResponse(res))
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: { 
    authorization: '5df01682-9d36-4915-9eb9-b7271e1fc542',
    'Content-Type': 'application/json' 
  }
});

export default auth;