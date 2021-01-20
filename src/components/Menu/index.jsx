import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography, Container } from '@material-ui/core'
import { Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core'

import { images } from "./assets/images"
import { useStyles } from "./assets/styles"

import Toolbar from "~/components/Menu/Toolbar"
import LoaderContext from "~/contexts/LoaderContext"
import ModulesService from "~/services/ModulesService"

export default function Album(props) {
  const classes = useStyles()
  const loader = useContext(LoaderContext)
  const [modulesList, setModulesList] = useState([])
  const [modulesListDefault, setModulesListDefault] = useState([])

  useEffect(() => {
    loader(true)
    ModulesService.get(loader)
      .then((response) => {
        loader(false)
        setModulesList(response)
        setModulesListDefault(response)
      })
      .catch((error) => {
        loader(false)
        console.log(error)
      })
  }, [])

  const updateInput = async (event) => {
    const input = event.target.value
    const filtered = modulesListDefault.filter(module => {
      return module.name
        .toLowerCase()
        .includes(
          input.toLowerCase()
        )
    })

    setModulesList(filtered)
  }

  return (
    <>
      <Toolbar updateInput={updateInput} />

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid
          container
          spacing={4}
        >
          {modulesList.map((module, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardActionArea>
                <Card
                  className={classes.card}
                  onClick={() => {
                    props.history.push(`${module.route}`)
                  }}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={images[module.imageName]}
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