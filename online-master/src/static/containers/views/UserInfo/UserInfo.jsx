/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import DoneAll from "@material-ui/icons/DoneAll";

// core components
import Footers from "../components/Footers.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from '../../../components/CustomInput/CustomInput'
import Badge from "../../../components/Badge/Badge.jsx";
import Parallax from "../../../components/Parallax/Parallax.jsx";
import Clearfix from "../../../components/Clearfix/Clearfix.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import christian from "../../../images/faces/christian.jpg";
import profilePageStyle from "../../../../assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";
import MyHeader from '../components/MyHeader'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actionCreators from '../../../actions/UserInfo'
 
import cardBlog5 from '../../../../assets/img/bg.jpg'
// import { getUserDataFetch} from '../../../actions/UserInfo'

class UserinfoView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object,
    token: PropTypes.string.isRequired,
    action: PropTypes.shape({
        getUserDataFetch: PropTypes.func.isRequired
    })
  }

  static defaultProps = {
    data: ''
  };

  componentWillMount() {
    const token = this.props.token
    this.props.actions.getUserDataFetch(token)
  }


  render() {
    const { classes, data, isFetching, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );

    
    console.log("data: ", this.props.data)
    return (
      <div>
        <MyHeader />

        <Parallax
          image={require("../../../images/examples/city.jpg")}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          {data === null ?
            <CircularProgress className={classes.progress} color="secondary" size={50} /> :

            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <header className={classes.headerInfo}>
                    <div className={classes.headerLeft}>
                      <div style={{
                          backgroundImage: `url(${cardBlog5})`
                        }} className={classes.headerLeftIcon}></div>
                      <div className={classes.headerName}>
                        <div className={classes.headerNameT}>Name</div>
                        <Badge color="warning" className={classes.headerB}>推荐入门</Badge>
                      </div>
                    </div>
                    <div className={classes.headerRight}>
                      <Button color="primary" round>
                        <DoneAll/> 关注
                      </Button>
                    </div>
                  </header>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <h3>jajjfj</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <h3>asdfasdfasdf</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <h3>sdfasdfsd</h3>
                </GridItem>
              </GridContainer>
            </div>
          }
        </div>

        <Footers />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      data: state.userdata.data,
      isFetching: state.userdata.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

const UserInfo =  withStyles(profilePageStyle)(UserinfoView)

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
