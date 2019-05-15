import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import * as vkSelectors from '../store/vk/reducer';

class Logger extends Component {

    render() {
        return (
            <Div>
                {this.props.logs}
            </Div>
        );
    }
}

function mapStateToProps(state) {
    return {
        logs: vkSelectors.getLogs(state),
    };
}

export default connect(mapStateToProps)(Logger);
