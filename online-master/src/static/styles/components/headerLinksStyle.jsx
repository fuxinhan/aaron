// ##############################
// // // HeaderLinks styles
// #############################

import {
  container,
  title,
  cardTitle,
  description,
  mlAuto,
  mrAuto,
} from '../jss/style'
import tooltipsStyle from '../jss/tooltipsStyle'
import modalStyle from '../jss/modalStyle'
import popoverStyles from '../jss/popoverStyles'
import customCheckboxRadioSwitch from '../jss/customCheckboxRadioSwitchStyle'


const headerLinksStyle = theme => ({
  list: {
    [theme.breakpoints.up('md')]: {
      WebkitBoxAlign: 'center',
      MsFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxOrient: 'horizontal',
      WebkitBoxDirection: 'normal',
      MsFlexDirection: 'row',
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    marginTop: '0px',
    display: 'flex',
    paddingLeft: '0',
    marginBottom: '0',
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      '& ul': {
        maxHeight: '400px',
        overflow: 'scroll',
      },
      width: '100%',
      '&:not(:last-child)': {
        '&:after': {
          width: 'calc(100% - 30px)',
          content: '""',
          display: 'block',
          height: '1px',
          marginLeft: '15px',
          backgroundColor: '#e5e5e5',
        },
      },
    },
  },
  listItemText: {
    padding: '0 !important',
  },
  navLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    '&:hover,&:focus': {
      color: 'inherit',
    },
    '& .fab,& .far,& .fal,& .fas': {
      position: 'relative',
      top: '2px',
      marginTop: '-4px',
      marginRight: '4px',
      marginBottom: '0px',
      fontSize: '1.25rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start',
      },
    },
    '& svg': {
      marginRight: '3px',
      width: '20px',
      height: '20px',
    },
  },
  navLinkJustIcon: {
    '& .fab,& .far,& .fal,& .fas': {
      marginRight: '0px',
    },
    '& svg': {
      marginRight: '0px',
    },
  },
  navButton: {
    position: 'relative',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '5px',
      marginTop: '5px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start',
      },
    },
    '& $icons': {
      marginRight: '3px',
    },
  },
  notificationNavLink: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    top: '4px',
  },
  registerNavLink: {
    top: '3px',
    position: 'relative',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
  },
  navLinkActive: {
    '&, &:hover, &:focus,&:active ': {
      color: 'inherit',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  icons: {
    width: '20px',
    height: '20px',
    marginRight: '14px',
  },
  dropdownIcons: {
    width: '24px',
    height: '24px',
    marginRight: '14px',
    opacity: '0.5',
    marginTop: '-4px',
    top: '1px',
    verticalAlign: 'middle',
    fontSize: '24px',
    position: 'relative',
  },
  socialIcons: {
    position: 'relative',
    fontSize: '1.25rem',
    maxWidth: '24px',
  },
  socialIconsButton: {
    top: '4px',
    [theme.breakpoints.down('sm')]: {
      top: '0',
    },
  },
  dropdownLink: {
    '&,&:hover,&:focus': {
      color: 'inherit',
      textDecoration: 'none',
      display: 'flex',
      padding: '0.75rem 1.25rem 0.75rem 0.75rem',
    },
  },
  ...tooltipsStyle,
  marginRight5: {
    marginRight: '5px',
  },
  collapse: {
    [theme.breakpoints.up('md')]: {
      display: 'flex !important',
      MsFlexPreferredSize: 'auto',
      flexBasis: 'auto',
    },
    WebkitBoxFlex: '1',
    MsFlexPositive: '1',
    flexGrow: '1',
    WebkitBoxAlign: 'center',
    MsFlexAlign: 'center',
    alignItems: 'center',
  },

  // login
  container,
  description,
  cardTitle,
  mlAuto,
  mrAuto,
  ...tooltipsStyle,
  ...popoverStyles,
  ...modalStyle(theme),
  ...customCheckboxRadioSwitch,
  section: {
    padding: '70px 0 0',
  },
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  icon: {
    width: '24px',
    height: '24px',
    color: '#495057',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0',
  },
  textCenter: {
    textAlign: 'center',
  },
  cardTitleWhite: {
    ...cardTitle,
    color: '#FFFFFF !important',
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0',
  },
  socialLineButton: {
    '&, &:hover': { color: '#fff' },
    marginLeft: '5px',
    marginRight: '5px',
  },
  cardLoginHeader: {
    marginTop: '-40px',
    padding: '20px 0',
    width: '100%',
    marginBottom: '15px',
  },
  cardLoginBody: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  justifyContentCenter: {
    WebkitBoxPack: 'center !important',
    MsFlexPack: 'center !important',
    justifyContent: 'center !important',
  },
  infoArea: {
    padding: '0px 0px 20px !important',
  },
  space50: {
    height: '50px',
    display: 'block',
  },
})

export default headerLinksStyle