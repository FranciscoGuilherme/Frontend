import React from 'react'
import { Grid, Card, Avatar, Container, CardHeader, CardActionArea } from '@material-ui/core'
import People from "@material-ui/icons/People"

import Vendas from './Vendas'
import Pedidos from './Pedidos'

import { useStyles } from "./assets/style"

const modulesList = [1, 2, 3]

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Grid container>
      {modulesList.map((module, index) => (
        <Grid item md={6} xl={4} xs={12}>
          <Container className={classes.cardGrid} >
            <CardActionArea>
              <Card>
                <CardHeader
                  title="Usuários"
                  subheader="Alguma descrição"
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <People />
                    </Avatar>
                  }
                />
              </Card>
            </CardActionArea>
          </Container>
        </Grid>
      ))}

      <Grid md={12} xs={12}>
        <Vendas />
      </Grid>

      <Grid md={12} xs={12}>
        <Pedidos />
      </Grid>
    </Grid>
  );
};

export default Dashboard;