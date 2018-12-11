import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';

import MyHeader from '../views/components/MyHeader'


class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        return (
            <div>
            <MyHeader />
            <br />
            <br />

            <br />

            <div className="container">
                <div className="margin-top-medium text-center">
                    <img className="page-logo margin-bottom-medium"
                        src={reactLogo}
                        alt="ReactJs"
                    />
                    <img className="page-logo margin-bottom-medium"
                        src={reduxLogo}
                        alt="Redux"
                    />
                </div> 
                
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
