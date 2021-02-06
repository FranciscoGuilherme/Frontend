const axios = require('axios').default

const getLastOrders = async () => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_MSGPI_LAST_ORDERS, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('gatewayToken')}`
      }
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const OrdersService = {
  get: getLastOrders
}

export default OrdersService