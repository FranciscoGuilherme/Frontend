import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    fontSize: "18px"
  }
}))