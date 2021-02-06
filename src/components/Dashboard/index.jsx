import React, { useEffect, useState, useContext } from "react"
import {
  Grid,
  Card,
  Avatar,
  Snackbar,
  Container,
  IconButton,
  CardHeader,
  CardActionArea
} from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import { useStyles } from "./assets/style"
import People from "@material-ui/icons/People"
import CloseIcon from "@material-ui/icons/Close"

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
  const [message, setMessage] = useState(false)
  const [process, setProcess] = useState("")
  const loader = useContext(LoaderContext)
  const [ordersRows, setOrdersRows] = useState([])
  const [processRows, setProcessRows] = useState([])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = () => {
    setMessage(false)
  }

  useEffect(() => {
    loader(true)

    ProcessService.get()
      .then((response) => {
        loader(false)
        setProcessRows(getProcessRows(response[0]))

        localStorage.setItem('process', JSON.stringify(getProcessRows(response[0])))
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
    client.onmessage = (message) => {
      let updateProcessRows = JSON.parse(localStorage.getItem('process'))

      const item = updateProcessRows.find(element => (element.numero === message.data))
      const index = updateProcessRows.indexOf(item, 0)

      updateProcessRows[index].status = "stopped"

      setMessage(true)
      setProcess(message.data)
      setProcessRows(updateProcessRows)

      client.close()
      client.onopen()
    }
  }, [])

  return (
    <Grid container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={message}
        key="topright"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity="error">
          Ocorreu uma parada no processo {process}!
        </Alert>
      </Snackbar>

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