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

  isAuthenticated() {
    return localStorage.getItem('userToken') !== null
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.REACT_APP_MSUSERS_IS_ACTIVE, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
        .then((response) => {})
        .catch((error) => {
          localStorage.clear()
        })
    })
  }
}

export default new Auth()