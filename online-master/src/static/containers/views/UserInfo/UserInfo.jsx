/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footers from "../components/Footers.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from '../../../components/CustomInput/CustomInput'
import Parallax from "../../../components/Parallax/Parallax.jsx";
import Clearfix from "../../../components/Clearfix/Clearfix.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import christian from "../../../images/faces/christian.jpg";
import profilePageStyle from "../../../styles/views/profilePageStyle.jsx";
import MyHeader from '../components/MyHeader'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actionCreators from '../../../actions/UserInfo'

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
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={christian} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{data.name}</h3>
                      {
                        data.name === true ? <h6>{name}</h6> : null
                      }

                      <Button
                        justIcon
                        simple
                        color="dribbble"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fa fa-weixin"} />
                      </Button>
                      <Button
                        justIcon
                        simple
                        color="twitter"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fa fa-qq"} />
                      </Button>
                      <Button
                        justIcon
                        simple
                        color="pinterest"
                        className={classes.margin5}
                      >
                        <i className={classes.socials + " fa fa-weibo"} />
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>

              <div className={classNames(classes.description, classes.textCenter)}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={<span>ID: {data.id}</span>}

                      id="school"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => this.change(event, "school"),

                        type: "text",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={<span>Name: {data.name}</span>}
                      id="grade"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => this.change(event, "grade"),

                        type: "text",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText={<span>mobile: {data.mobile}</span>}
                      id="classroom"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => this.change(event, "classroom"),

                        type: "text",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={<span>photo: {data.photo}</span>}
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => this.change(event, "name"),

                        type: "text",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button color="rose" size="lg">
                      查看信息是否正确,如果有任何疑问请联系我们工作人员
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
              <Clearfix />
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
