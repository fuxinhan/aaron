import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons

import Phone from "@material-ui/icons/Phone"

import LockOutlined from "@material-ui/icons/LockOutlined";

// import HeaderLinks from "../../../components/Header/HeaderLinks.jsx";

import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../../../assets/jss/material-kit-pro-react/views/loginPageStyle";
import MyHeader from '../components/MyHeader'
import Footers from '../components/Footers'
// import Footer from "../../../components/Footer/Footer.jsx";

import image from "../../../../assets/img/bg7.jpg";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../actions/login';


class LoginPageView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    statusText: PropTypes.string,
    actions: PropTypes.shape({
      authLoginUser: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    statusText: '',
    location: null
  };

  constructor(props) {
    super(props);

    const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/ProductList' : '/login';
    this.state = {

      phone: "",
      password: "",

      phoneState: "",
      passwordState: "",

      redirectTo: redirectRoute
    };
  }

  extractRedirect = (string) => {
    const match = string.match(/next=(.*)/);
    return match ? match[1] : '/userinfo';
  };

  login = (e) => {
    e.preventDefault();
    // const value = this.loginForm.getValue();
    // if (value) {
    return this.props.actions.authLoginUser(
      this.state.phone, 
      this.state.password, 
      this.state.redirectTo
    )
    .catch((error) => {
      console.log(error);
    })
    // }
  };

  // 验证手机号
  verifyPhone(value) {
    var phoneRex = /^1[358]\d{9}$|^147\d{8}$|^176\d{8}$/;
    if (phoneRex.test(value)) {
      return true;
    }
    return false;
  }

  // 验证长度，密码不得少于6个字符
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "phone":
        if (this.verifyPhone(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }

  isValidated() {
    if (
      this.state.phoneState === "success" &&
      this.state.passwordState === "success"
    ) {
      return true;
    } else {
      if (this.state.phoneState !== "success") {
        this.setState({ phoneState: "error" });
      }
      if (this.state.passwordState !== "success") {
        this.setState({ passwordState: "error" });
      }
    }
    return false;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (this.props.isAuthenticated) {
      this.props.dispatch(push('/login'));
    }
  }
  render() {
    const { classes } = this.props;
    const { password, phone, phoneState, passwordState } = this.state
    return (
      <div>
        <MyHeader />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader
                      color="primary"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-weixin" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-qq" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-weibo" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p
                      className={`${classes.description} ${classes.textCenter}`}
                    >
                      Or Be Classical
                    </p>
                    <CardBody signup>
                      
                      <CustomInput
                        success={this.state.phoneState === "success"}
                        error={this.state.phoneState === "error"}
                        labelText={
                          <span>
                            手机号 <small>(必填)</small>
                          </span>
                        }
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "phone", "phone"),
                          placeholder: "Phone...",
                          type: "phone",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        success={this.state.passwordState === "success"}
                        error={this.state.passwordState === "error"}
                        labelText={
                          <span>
                            密码 <small>(必填)</small>
                          </span>
                        }
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "password", "length", 6),
                          placeholder: "Password",
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <span id="loginPswErr"></span>
                    </CardBody>
                    <div className={classes.textCenter}>
                      <Button simple color="primary" size="lg" onClick={this.login}>
                        登录
                      </Button>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footers/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageView);
export default withStyles(loginPageStyle)(LoginPage);