import React, { useEffect, useState } from 'react'
import { Grid, Card, Avatar, Container, CardHeader, CardActionArea } from '@material-ui/core'
import People from "@material-ui/icons/People"

import Vendas from './Vendas'
import Pedidos from './Pedidos'
import { useStyles } from "./assets/style"

import OrdersService from '~/services/OrdersService'

const modulesList = [1, 2, 3]

const Dashboard = () => {
  const classes = useStyles()
  const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    OrdersService.get()
      .then((response) => {
        setOrdersList(response[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Grid container>
      {modulesList.map((module, index) => (
        <Grid key={index} item md={6} xl={4} xs={12}>
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

      <Grid item md={12} xs={12}>
        <Vendas />
      </Grid>

      <Grid item md={12} xs={12}>
        <Pedidos ordersList={ordersList} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;