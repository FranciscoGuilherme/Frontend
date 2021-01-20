import React, { useState, useContext } from "react"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Grid, Button, Typography, TextField, makeStyles } from "@material-ui/core"

import auth from "~/auth"
import useErrors from "~/hooks/useErrors"
import { Icon } from "~/components/GlobalStyle"
import LoginContext from "~/contexts/LoginContext"
import LoaderContext from "~/contexts/LoaderContext"

const useStyles = makeStyles({
  button: {
    float: "right"
  }
})

export default function Login(props) {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loader = useContext(LoaderContext)
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
            loader(true)
            auth.login({email, password})
              .then((response) => {
                loader(false)
                if (response.data.hasOwnProperty('token')) {
                  localStorage.setItem('token', response.data.token)

                  props.history.push("/menu")
                }
              })
              .catch((error) => {
                loader(false)
                console.log(error)
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

        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </Grid>
  )
}
