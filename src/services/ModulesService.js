const axios = require('axios').default

const getModules = async () => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_GET_MODULES)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const ModulesService = {
  get: getModules
}

export default ModulesService