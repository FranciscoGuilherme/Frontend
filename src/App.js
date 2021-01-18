import React, {useState} from "react"
import styled from "styled-components"
import { Route } from "react-router-dom"
import BeatLoader from "react-spinners/BeatLoader"
import LoadingOverlay from "react-loading-overlay"
import { Container } from "@material-ui/core"

import Menu from "~/components/Menu"
import Login from "~/components/Login"
import Register from "~/components/Register"
import Dashboard from "~/components/Dashboard"
import ProtectedRoute from "~/components/ProtectedRoute"

import LoginContext from "~/contexts/LoginContext"
import LoaderContext from "~/contexts/LoaderContext"

import { LoginModel } from "~/models/LoginModel"

import "./App.css"

const StyledLoader = styled(LoadingOverlay)`
  .MyLoader_overlay {
    background: rgb(249 249 249 / 0.5);
  }
`

export default function App() {
  const [loadSpinner, setLoadSpinner] = useState(false)

  return (
    <StyledLoader
      active={loadSpinner}
      spinner={<BeatLoader />}
      classNamePrefix='MyLoader_'
    >
      <LoaderContext.Provider value={(bool) => {setLoadSpinner(bool)}}>
        <Container component="main" maxWidth="sm">
            <LoginContext.Provider value={{ password: LoginModel.validatePassword }}>
              <Route exact path="/" component={Login} />
            </LoginContext.Provider>

            <Route exact path="/register" component={Register} />
        </Container>

        <ProtectedRoute exact path="/menu" component={Menu} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </LoaderContext.Provider>
    </StyledLoader>
  )
}