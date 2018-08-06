import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './Footer.css'
import Icon24Message from '@vkontakte/icons/dist/24/message';

class Footer extends Component {

    render() {
        return (
            <UI.Div className="footer">
                <UI.Button level="3" component="a"
                           href="https://vk.me/currency_app" before={<Icon24Message/>}/>
                <UI.Button level="3" component="a"
                           href="https://vk.com/currency_app">Группа</UI.Button>
                <UI.Button level="3" component="a" onClick={this.openAbout.bind(this)}>О
                    программе</UI.Button>
            </UI.Div>
        );
    }

    openAbout() {
        this.props.dispatch(push('/about'));
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Footer);
