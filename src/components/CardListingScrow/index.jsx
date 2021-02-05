import React, { useState } from 'react'
import {
  Paper,
  Table,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 200
  }
})

export default function StickyHeadTable({title, rows, columns, ...props}) {
  const classes = useStyles()
  const forceUpdate = useForceUpdate()
  const [value, setValue] = useState(0)
  function useForceUpdate() {
    return () => setValue(value => value + 1)
  }

  let status = []
  rows.forEach((element, index) => {
    status[index] = element.code
  })

  const [checked, setChecked] = useState(status)
  const changeState = (event, index) => {
    checked[index] = !checked[index]
    props.options(rows[index])
    setChecked(checked)
    forceUpdate()
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, index_) => {
                    const value = row[column.id]
                    if (column.id === 'check') {
                      return (
                        <TableCell key={index_} align={column.align}>
                          <Button
                            onClick={(event) => changeState(event, index)}
                            color={(checked[index]) ? "primary" : "secondary"}
                            variant="contained"
                            size="small"
                          >
                            {(checked[index]) ? "Adicionar" : "Remover"}
                          </Button>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}