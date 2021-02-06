import React, { useEffect, useState, useContext } from "react"
import {
  Grid,
  Card,
  Avatar,
  Container,
  CardHeader,
  CardActionArea
} from "@material-ui/core"
import { useStyles } from "./assets/style"
import People from "@material-ui/icons/People"

import Vendas from "./Vendas"

import CardListing from "~/components/CardListing"
import LoaderContext from "~/contexts/LoaderContext"
import OrdersService from "~/services/OrdersService"
import ProcessService from "~/services/ProcessService"
import { ordersColumns, getOrdersRows } from "~/components/Dashboard/orders"
import { processColumns, getProcessRows } from "~/components/Dashboard/process"

const modulesList = [1, 2, 3]
const client = new WebSocket(process.env.REACT_APP_MSGPI_WEBSOCKET)

const Dashboard = () => {
  const classes = useStyles()
  const loader = useContext(LoaderContext)
  const [ordersRows, setOrdersRows] = useState([])
  const [processRows, setProcessRows] = useState([])

  useEffect(() => {
    loader(true)

    ProcessService.get()
      .then((response) => {
        loader(false)
        setProcessRows(getProcessRows(response[0]))
      })
      .catch((error) => {
        loader(false)
        console.log(error)
      })

    OrdersService.get()
      .then((response) => {
        loader(false)
        setOrdersRows(getOrdersRows(response[0]))
      })
      .catch((error) => {
        loader(false)
        console.log(error)
      })

    client.onopen = () => { console.log('WebSocket Client Connected') }
    client.onmessage = (message) => { console.log(message) }
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
        <CardListing title="Processos" rows={processRows} columns={processColumns} />
      </Grid>

      <Grid item md={12} xs={12}>
        <CardListing title="Pedidos" rows={ordersRows} columns={ordersColumns} />
      </Grid>

      <Grid item md={12} xs={12}>
        <Vendas />
      </Grid>
    </Grid>
  );
};

export default Dashboard;