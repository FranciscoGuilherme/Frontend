const axios = require('axios').default

const getProcess = async () => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_MSGPI_PROCESS)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const ProcessService = {
  get: getProcess
}

export default ProcessService