import React, { useState, useContext } from "react"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Grid, Button, Typography, TextField } from "@material-ui/core"

import { Icon } from "~/components/GlobalStyle"

import auth from "~/auth"
import useErrors from "~/hooks/useErrors"
import LoginContext from "~/contexts/LoginContext"

export default function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, validateFields, thereIsNoErrors] = useErrors(useContext(LoginContext))

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <form
        onSubmit={event => {
          event.preventDefault()

          if (thereIsNoErrors()) {
            auth.login(() => {
              props.history.push("/dashboard")
            })
          }
        }}
      >
        <Icon>
          <LockOutlinedIcon />
        </Icon>

        <Typography component="h1" variant="h5" align="center">
          Sign In
        </Typography>

        <TextField
          id="email"
          name="email"
          label="email"
          type="email"
          value={email}
          required
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={event => setEmail(event.target.value)}
        />

        <TextField
          id="password"
          name="password"
          label="senha"
          type="password"
          value={password}
          error={!error.password.valid}
          helperText={error.password.text}
          required
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={event => setPassword(event.target.value)}
          onBlur={validateFields}
        />

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Grid>
  )
}
