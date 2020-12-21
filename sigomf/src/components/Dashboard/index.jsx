import React from "react"
import { Button } from "@material-ui/core"

import auth from "~/auth";

export const Dashboard = (props) => {
  return (
    <>
      <h1>Dashboard</h1>
      <form
        onSubmit={event => {
          event.preventDefault()

          auth.logout(() => {
            props.history.push("/")
          })
        }}
      >
        <Button type="submit" variant="contained" color="primary">
          Logout
        </Button>
      </form>
    </>
  )
}