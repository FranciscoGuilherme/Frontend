import { useState } from "react"

function useErrors(validation) {
  const [error, setError] = useState(_createInitialState(validation))

  function validateFields(event) {
    const {name, value} = event.target
    const newState = {...error}

    newState[name] = validation[name](value)
    setError(newState)
  }

  function thereIsNoErrors() {
    for (let field in error) {
      if (!error[field].valid) {
        return false
      }
    }

    return true
  }

  return [error, validateFields, thereIsNoErrors]
}

function _createInitialState(validation) {
  const initialState = {}

  for(let field in validation) {
    initialState[field] = { valid: true, text: "" }
  }

  return initialState
}

export default useErrors