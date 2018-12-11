import {
  section,
  container,
  cardTitle,
  coloredShadow,
  main,
  mainRaised,
  title,
  mlAuto
} from "../../../material-kit-pro-react.jsx";


import tooltipsStyle from "../../../material-kit-pro-react/tooltipsStyle.jsx";

const styles = {
  main,
  mainRaised,
  cardTitle,
  container,
  ...tooltipsStyle,
  section: {
    ...section,
    // padding: "70px 0px"
  },
  coloredShadow,
  cardDescription: {
    color: "#999",
    textAlign: "center"
  },
  mlAuto,
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: "#9a9a9a"
  },
  priceOld: {
    fontSize: "16px",
    textDecoration: "line-through"
  },
  priceNew: {
    color: "#f44336"
  },
  stats: {
    color: "#999"
  },
  textCenter: {
    textAlign: "center"
  },
  parallax: {
    height: "60vh",
    overflow: "hidden"
  },
  parallax90:{
    height: "90vh",
    overflow: "hidden"
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative"
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "center",
    "& h1": {
      fontSize: "4.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    },
    "& h3": {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
    }
  },
  proBadge: {
    position: "absolute",
    fontSize: "22px",
    textTransform: "uppercase",
    fontWeight: "bold",
    right: "-90px",
    top: "-3px",
    padding: "10px 18px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    color: "#444",
    lineHeight: "22px",
    boxShadow: "0px 5px 5px -2px rgba(31,31,31,0.4)"
  },
  title: {
    ...title,
    color: "#FFFFFF !important"
  },
  divHW:{
    lineHeight:'1.5em',
    color:'#666',
    textAlign:'center',
    padding:'4rem 0'
  },
  spanQian:{
    fontSize:'1.5em',
    marginRight:'1em'
  },
  spanZh:{
    fontSize:'1.5em'
  },
  spanHou:{
    marginLeft:'1em',
    lineHeight:'1.5em'
  },
  textWhite:{
    color:"white"
  },
  width70:{
    width:"70%"
  }
};

export default styles;
