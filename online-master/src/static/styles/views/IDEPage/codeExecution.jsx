import { container, title, main, mainRaised } from '../../jss/style'
import headerLinksStyle from "../../components/headerLinksStyle"
import { inherits } from 'util';

const codeExecutionStyle = theme => ({
  container: {
    color: "#FFFFFF",
    ...container,
    zIndex: "2"
  },
  main: {
    ...main
  },
  mainRaised: {
    marginTop: 'auto',
    ...mainRaised,
  },
  messageSection: {
    padding: "80px 0px"
  },
  textCenter: {
    textAlign: "center"
  },
  ...headerLinksStyle(theme),
  section: {
    padding: "70px 0",
    paddingBottom: "0"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navbar: {
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0",
      zIndex: "unset"
    }
  },
  navigation: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "0"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  imageDropdownButton: {
    padding: "0px",
    top: "4px",
    borderRadius: "50%",
    marginLeft: "5px"
  }
});

export default codeExecutionStyle;
