import React from "react"
import { Button } from "@material-ui/core"

import auth from "~/auth"

export default function Login(props) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        auth.login(() => {
          props.history.push("/dashboard")
        })
      }}
    >
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  )
}
