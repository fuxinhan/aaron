import {
  container,
  title,
  main,
  mrAuto,
  mainRaised,
} from '../jss/style'
import headerLinksStyle from '../components/headerLinksStyle'

const landingPageStyle = theme => ({
  ...headerLinksStyle(theme),
  mrAuto,
  container: {
    color: '#FFFFFF',
    ...container,
    zIndex: '2',
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0',
  },
  main: {
    ...main,
  },
  mainRaised: {
    ...mainRaised,
  },
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  left: {
    float: 'left!important',
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right',
  },
  icon: {
    width: '18px',
    height: '18px',
    top: '3px',
    position: 'relative',
  },
  iframeContainer: {
    "& > iframe": {
      width: "100%",
      boxShadow:
        "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
  },
})

export default landingPageStyle
