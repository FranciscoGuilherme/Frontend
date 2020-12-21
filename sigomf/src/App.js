import React from "react"
import { Route } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import Login from "~/components/Login"
import Register from "~/components/Register"
import { Dashboard } from "~/components/Dashboard"
import ProtectedRoute from "~/components/ProtectedRoute"

export default function App() {
  return (
    <Container component="article" maxWidth="sm">
      <Typography variant="h3" component="h1" align="center">
        Protected
      </Typography>

      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    </Container>
  )
}
