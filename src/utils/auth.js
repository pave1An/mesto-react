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

  _request(endpoint, options) {
    return fetch(`${this._baseUrl + endpoint}`,options).then(this._handleFirstResponse);
  }

  registration({ password, email }) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email' : email,
        'password': password
      })
    });
  }

  login({ password, email }) {
    return this._request('/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email' : email,
        'password': password
      })
    });
  }

  checkToken(jwt) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'Authorization': `Bearer ${jwt}`
      }
    });
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