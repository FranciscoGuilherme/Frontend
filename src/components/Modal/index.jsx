import React from 'react'
import {
  Card,
  Modal,
  Backdrop,
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
  }
}))

export default function CustomModal({component: Component, ...props}) {
  const classes = useStyles()

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      className={classes.modal}
      open={props.open}
      onClose={props.handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Card in={props.open}>
        <CardMedia
          component="img"
          alt="Business"
          height="140"
          image={images['business']}
          title="Business"
        />
        <CardContent>
          <Component />
        </CardContent>
      </Card>
    </Modal>
  )
}