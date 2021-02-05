const axios = require('axios').default

const getCompliances = async () => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_MSNORMAS_COMPLIANCES)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const createCompliances = async (compliances) => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_MSNORMAS_COMPLIANCES, compliances)
      .then((response) => {
        console.log(response)
        //resolve(response)
      })
      .catch((error) => {
        console.log("OI")
        //reject(error)
      })
  })
}

const updateCompliance = async (compliance) => {
  return new Promise((resolve, reject) => {
    axios.put(process.env.REACT_APP_MSNORMAS_COMPLIANCES, compliance)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const deleteCompliance = async (compliance) => {
  return new Promise((resolve, reject) => {
    axios.delete(process.env.REACT_APP_MSNORMAS_COMPLIANCES, compliance)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const CompliancesService = {
  get: getCompliances,
  post: createCompliances,
  put: updateCompliance,
  delete: deleteCompliance
}

export default CompliancesService