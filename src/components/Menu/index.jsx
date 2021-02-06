import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  Card,
  CardMedia,
  Container,
  Typography,
  CardContent,
  CardActionArea
} from '@material-ui/core'

import { images } from "./assets/images"
import { useStyles } from "./assets/styles"

import Toolbar from "~/components/Menu/Toolbar"
import LoaderContext from "~/contexts/LoaderContext"
import ModulesService from "~/services/ModulesService"

export default function Menu(props) {
  const classes = useStyles()
  const loader = useContext(LoaderContext)
  const [modulesList, setModulesList] = useState([])
  const [modulesListDefault, setModulesListDefault] = useState([])

  useEffect(() => {
    const storageModulesList = localStorage.getItem('modulesList')

    if (storageModulesList !== null) {
      const storageModulesListParsed = JSON.parse(storageModulesList)
      setModulesList(storageModulesListParsed)
      setModulesListDefault(storageModulesListParsed)
    }
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
      <Toolbar updateInput={updateInput} {...props} />

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