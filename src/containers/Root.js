import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import '@vkontakte/vkui/dist/vkui.css';
import App from './App';
import {Route} from 'react-router';
import * as vkActions from '../store/vk/actions';
import * as vkSelectors from '../store/vk/reducer';

class Root extends Component {

    componentWillMount() {
        this.props.dispatch(vkActions.initApp());
        this.props.dispatch(vkActions.fetchAccessToken());
    }

    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <div>
                    <Route path='/:pageId(about|)?' component={(props) => <App accessToken={this.props.accessToken}
                                                                               pageId={props.match.params.pageId}/>}/>
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
