import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: '200px'
  },
  rootSecondary: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  paperSecondary: {
    margin: `${theme.spacing(1)}px auto`
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '95%'
  },
  accordionBody: {
    background: theme.palette.background.default
  },
  menuItemSpace: {
    marginLeft: "30px"
  },
  button: {
    float: "right",
    marginTop: "20px",
    marginLeft: "20px",
    marginBottom: "20px"
  },
  buttonSingleSpace: {
    marginLeft: "20px"
  },
  buttonRight: {
    float: "right"
  }
}))