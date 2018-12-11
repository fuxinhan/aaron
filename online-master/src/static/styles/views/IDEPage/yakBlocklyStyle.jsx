import { container, title, main, mainRaised } from '../../jss/style'
import headerLinksStyle from "../../components/headerLinksStyle"

const yakBlocklyStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.secondary[300],
  },
  workspaceStyle: {
    height: 512,
  },
  input: {
    display: 'none',
  }
})

export default yakBlocklyStyle
