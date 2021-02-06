const axios = require('axios').default

class Auth {
  async login({email, password}) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.REACT_APP_MSUSERS_LOGIN, {
        username: email,
        password: password
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  logout(cb) {
    this.authenticated = false
    cb()
  }

  isAuthenticated() {
    return localStorage.getItem('userToken') !== null;
  }
}

export default new Auth()