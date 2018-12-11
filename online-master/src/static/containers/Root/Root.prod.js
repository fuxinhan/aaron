import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  lightBlue,
  deepPurple,
  red,
  green,
  yellow,
  deepOrange,
  pink,
  cyan,
} from '@material-ui/core/colors'
import { BrowserRouter } from 'react-router-dom'
import { Provider as MobxProvider } from 'mobx-react'
import AppState from '../../mobx/app-state'

import routes from '../../routes';
import App from '../../app';

const theme = createMuiTheme({ // 主题颜色
  palette: {
    primary: deepPurple, // 主要颜色
    secondary: lightBlue, // 次要颜色
    error: pink,
    info: cyan,
    success: green,
    warning: yellow,
    danger: red,
    rose: deepOrange,
    type: 'light',
  },
})

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.shape().isRequired,
        history: PropTypes.shape().isRequired
    };

    render() {
        return (
          <div>
            <MobxProvider appState={AppState}>
                <Provider store={this.props.store}>
                    <BrowserRouter>
                        <MuiThemeProvider theme={theme}>
                    <App>
                        <ConnectedRouter history={this.props.history}>
                            {routes}
                        </ConnectedRouter>
                    </App>
                        </MuiThemeProvider>
                    </BrowserRouter>
                </Provider>
            </MobxProvider>
          </div>
        );
    }
}
