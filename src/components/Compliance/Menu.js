import { Menu } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const CustomMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    index2={props.index2}
    {...props}
  />
))