import React from 'react'
import {
  Card,
  Modal,
  Button,
  Backdrop,
  TextField,
  Typography,
  makeStyles,
  CardMedia,
  CardContent,
} from '@material-ui/core'

import { images } from "~/components/Menu/assets/images"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    float: "right",
    marginBottom: "30px"
  },
  title: {
    marginBottom: "10px"
  }
}))

export default function CustomModal({ open, handleModalClose }) {
  const classes = useStyles()

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      className={classes.modal}
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Card in={open}>
        <CardMedia
          component="img"
          alt="Business"
          height="140"
          image={images['business']}
          title="Business"
        />
        <CardContent>
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
              Cadastrar novo complicance
            </Typography>

            <TextField
              id="complianceName"
              name="complianceName"
              label="Compliance Name"
              type="text"
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <TextField
              id="complianceDesc"
              name="complianceDesc"
              label="Compliance Description"
              type="text"
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )
}