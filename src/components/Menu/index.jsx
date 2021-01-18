import React, { useState, useEffect } from 'react'
import { Grid, Typography, Container } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core'

import { images } from "./assets/images"
import { useStyles } from "./assets/styles"

import Toolbar from "~/components/Menu/Toolbar"

const axios = require('axios').default

export default function Album() {
  const classes = useStyles()
  const [modules, setModules] = useState([])

  useEffect(() => {
    let isSubscribed = true
    axios.get(process.env.REACT_APP_GET_MODULES)
      .then((response) => {
        if (isSubscribed) {
          setModules(response.data.modules)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    
    return () => isSubscribed = false
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
              <CardActionArea>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={images[module.image]}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom className={classes.cardTitle}>
                      { module.name }
                    </Typography>
                  </CardContent>
                </Card>
                </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}