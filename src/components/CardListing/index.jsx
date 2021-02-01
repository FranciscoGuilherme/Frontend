import React, { useState } from 'react'
import {
  Chip,
  Card,
  Paper,
  Divider,
  makeStyles,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  card: {
    overflow: 'overlay'
  }
}))

const Pedidos = ({title, rows, columns}) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, page) => { setPage(page) }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const orderStatus = (value) => {
    return (value === "pending" || value === "stopped")
      ? "secondary"
      : "primary"
  }

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id]
                          if (column.id === 'status') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Chip
                                 color={orderStatus(value)}
                                 label={value}
                                 size="small"
                               />
                              </TableCell>
                            )
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              { value }
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
    </div>
  )
}

export default Pedidos
