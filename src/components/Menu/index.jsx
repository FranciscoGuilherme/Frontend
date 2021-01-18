import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, Container } from '@material-ui/core'
import { Card, CardMedia, CardActions, CardContent } from '@material-ui/core'

import Footer from "~/components/Footer"
import Toolbar from "~/components/Menu/Toolbar"

import { images } from "./assets/images"
import { useStyles } from "./assets/styles"

const axios = require('axios').default

export default function Album() {
  const classes = useStyles()
  const [modules, setModules] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_MODULES)
      .then((response) => {
        setModules(response.modules)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <>
      <Toolbar />

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid
          container
          spacing={4}
        >
          {modules.map((module, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={images[module.image]}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    { module.name }
                  </Typography>
                  <Typography>
                    { module.description }
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Acessar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  )
}