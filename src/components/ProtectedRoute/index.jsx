import React from "react"
import { Route, Redirect } from "react-router"

import auth from "~/auth"

export default function Dashboard({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />
        /*if (auth.isAuthenticated()) {
          return <Component {...props} />
        }*/

        return (
            <Redirect to={
              {
                pathname: "/",
                state: {
                  from: props.location
                }
              }
            }
          />
        )
      }
    } />
  )
}