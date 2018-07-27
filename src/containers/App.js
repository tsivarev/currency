import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import * as vkSelectors from '../store/vk/reducer';
import * as vkActions from '../store/vk/actions';
import AboutPanel from './AboutPanel';
import MainPanel from './MainPanel';

class App extends Component {

    componentWillMount() {
        this.props.dispatch(vkActions.initApp());
        this.props.dispatch(vkActions.fetchAccessToken());
    }

    render() {
        let activePanel = this.props.pageId === 'about' ? 'aboutPanel' : 'mainPanel';

        return (
            <UI.Root activeView="mainView">
                <UI.View id="mainView" activePanel={activePanel} header={false}>
                    <MainPanel id="mainPanel" accessToken={this.props.accessToken}/>
                    <AboutPanel id="aboutPanel"/>
                </UI.View>
            </UI.Root>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: vkSelectors.getVkAccessToken(state),
    };
}

export default connect(mapStateToProps)(App);
