import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import '@vkontakte/vkui/dist/vkui.css';
import App from '../App';
import About from '../About';
import {Route} from 'react-router';
import * as vkActions from '../store/vk/actions';
import * as vkSelectors from '../store/vk/reducer';

class Root extends Component {

    componentWillMount() {
        this.props.dispatch(vkActions.initApp());
        let appId = process.env.NODE_ENV === 'production' ? 6625834 : 6625863;
        this.props.dispatch(vkActions.fetchAccessToken(appId));
    }

    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <div>
                    <Route exact path='/' component={() => <App accessToken={this.props.accessToken}/>}/>
                    <Route path='/about' component={About}/>
                </div>
            </ConnectedRouter>
        );
    }

}

function mapStateToProps(state) {
    return {
        accessToken: vkSelectors.getVkAccessToken(state),
    };
}

export default connect(mapStateToProps)(Root);
