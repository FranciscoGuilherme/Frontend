import React from "react"
import { Route, Redirect } from "react-router"

import auth from "~/auth"
import Menu from "~/components/Menu"
import Sidebar from "~/components/Sidebar"

export default function Dashboard({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          if (Component === Menu) {
            return <Component {...props} />
          }

          return <Sidebar component={Component} {...props} />
        }

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