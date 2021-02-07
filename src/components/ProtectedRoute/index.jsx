import React from "react"
import { Route, Redirect } from "react-router"

import auth from "~/auth"
import Menu from "~/components/Menu"
import Main from "~/components/Main"


export default function Dashboard({component: Component, name, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          if (Component === Menu) {
            return <Component {...props} />
          }

          return <Main component={Component} name={name} {...props} />
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