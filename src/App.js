import React from "react"
import { Route } from "react-router-dom"
import { Container, Backdrop, CircularProgress, makeStyles } from "@material-ui/core"

import Menu from "~/components/Menu"
import Login from "~/components/Login"
import Register from "~/components/Register"
import Dashboard from "~/components/Dashboard"
import Compliance from "~/components/Compliance"
import ProtectedRoute from "~/components/ProtectedRoute"
import LoginContext from "~/contexts/LoginContext"
import LoaderContext from "~/contexts/LoaderContext"

import { LoginModel } from "~/models/LoginModel"

import "./App.css"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: '#fff'
  }
}))

export default function App() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <LoaderContext.Provider value={(bool) => {setOpen(bool)}}>
        <Container component="main" maxWidth="sm">
            <LoginContext.Provider value={{ password: LoginModel.validatePassword }}>
              <Route exact path="/" component={Login} />
            </LoginContext.Provider>

            <Route exact path="/register" component={Register} />
        </Container>

        <ProtectedRoute exact path="/menu" component={Menu} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} name="Dashboard" />
        <ProtectedRoute exact path="/compliance" component={Compliance} name="Gestão de normas" />
      </LoaderContext.Provider>
    </>
  )
}