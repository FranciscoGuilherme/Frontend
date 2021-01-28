import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const Pedidos = ({ordersList}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title="Ordens de compra" />
        <Divider />
        <PerfectScrollbar>
          <Box >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Usuário</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ordersList.map((order) => (
                  <TableRow hover key={order.serial}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        label={order.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>
                      {order.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>

        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Ver todos
          </Button>
        </Box>
      </Card>
    </div>
  )
}

Pedidos.propTypes = {
  className: PropTypes.string
}

export default Pedidos;
