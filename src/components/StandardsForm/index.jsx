import React, { useState } from 'react'
import {
  Paper,
  Button,
  TextField,
  Typography,
  Checkbox,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  FormControl,
  Grid
} from '@material-ui/core'

import { useStyles } from "./assets/styles"

import CardListing from '~/components/CardListing'
import { standardsColumns, getStandardsRows } from '~/components/StandardsForm/standards'

const data = [
  {
    code: "CODE2",
    name: "Name",
    desc: "Alguma descrição"
  },
  {
    code: "CODE2",
    name: "Name",
    desc: "Alguma descrição"
  }
]

function createData(code, name, desc) {
  return { code, name, desc };
}

const rows = [
  createData('code', 'name', 'desc'),
  createData('code', 'name', 'desc'),
  createData('code', 'name', 'desc'),
  createData('code', 'name', 'desc')
];

export default function StandardsForm() {
  const classes= useStyles()
  const [standardsRows, setStandardsRows] = useState(rows)

  return (
    <form className={classes.modalPaper}
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.title}
      >
        Cadastrar nova norma
      </Typography>

      <Grid container justify="center" spacing="2">
        <Grid item xs={8}>
          <TextField
            placeholder="Procurar…"
            type="text"
            required
            
            margin="normal"
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            size="medium"
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <div className={classes.listing}>
        <CardListing check
          title="Base externa de normas"
          rows={standardsRows}
          columns={standardsColumns}
        />
      </div>

      <Grid spacing="2">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="medium"
          className={classes.button}
        >
          Salvar
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="medium"
          className={classes.button}
        >
          Fechar
        </Button>
      </Grid>
    </form>
    
  )
}