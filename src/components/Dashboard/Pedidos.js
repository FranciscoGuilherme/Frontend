import React, { useState } from 'react'
import moment from 'moment'
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
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import { data } from "./assets/data"

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

const Pedidos = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <div className={classes.root}>
      <Card {...rest}>
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
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="asc">
                        Data
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        label={order.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY')}
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
