import {
  container,
  main,
  mainRaised,
} from '../../jss/style'

const outputAreaStyle = theme => ({
  container: {
    color: '#FFFFFF',
    ...container,
    zIndex: '2',
    opacity: 0.5,
  },
  main: {
    ...main,
    opacity: 0.5,
  },
  mainRaised: {
    ...mainRaised,
    opacity: 0.5,
  },
})

export default outputAreaStyle
