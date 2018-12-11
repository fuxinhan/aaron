import {
  container,
  title,
  main,
  mrAuto,
  mainRaised,
  cardTitle,
  description,
  mlAuto,
} from '../jss/style'
import headerLinksStyle from '../components/headerLinksStyle'
import modalStyle from '../jss/modalStyle'
import tooltipsStyle from '../jss/tooltipsStyle'
import popoverStyles from '../jss/popoverStyles'
import customCheckboxRadioSwitch from '../jss/customCheckboxRadioSwitchStyle'

const AppBarStyle = theme => ({
  container,
  description,
  cardTitle,
  mlAuto,
  ...tooltipsStyle,
  ...popoverStyles,
  ...modalStyle(theme),
  ...customCheckboxRadioSwitch,
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
  section: {
    padding: "70px 0 0"
  },
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  },
  textCenter: {
    textAlign: "center"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  socialLineButton: {
    "&, &:hover": { color: "#fff" },
    marginLeft: "5px",
    marginRight: "5px"
  },
  cardLoginHeader: {
    marginTop: "-40px",
    padding: "20px 0",
    width: "100%",
    marginBottom: "15px"
  },
  cardLoginBody: {
    paddingTop: "0",
    paddingBottom: "0"
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  infoArea: {
    padding: "0px 0px 20px !important"
  },
  space50: {
    height: "50px",
    display: "block"
  }
})

export default AppBarStyle
