import { fade, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px"
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    float: "right",
    marginLeft: "10px",
    marginBottom: "30px"
  },
  title: {
    marginBottom: "20px"
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  listing: {
    marginBottom: "20px"
  }
}))