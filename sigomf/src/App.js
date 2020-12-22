import React from "react"
import { Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Login from "~/components/Login"
import Register from "~/components/Register"
import { Dashboard } from "~/components/Dashboard"
import ProtectedRoute from "~/components/ProtectedRoute"

import LoginContext from "~/contexts/LoginContext"

import { LoginModel } from "~/models/LoginModel"

export default function App() {
  return (
    <Container component="main" maxWidth="sm">
      <LoginContext.Provider value={{ password: LoginModel.validatePassword }}>
        <Route exact path="/" component={Login} />
      </LoginContext.Provider>

      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    </Container>
  )
}
