import React, {Component} from 'react';
import {push} from 'react-router-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import logo from './logo.svg';
import CurrencyRateDashboard from './containers/CurrencyRateDashboard';
import CurrencyConverter from './containers/CurrencyConverter';
import {connect} from 'react-redux';

class App extends Component {

    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Div style={{textAlign: 'center'}}>
                            <img width={96} height={96} src={logo} alt="logo"/>
                        </UI.Div>
                        <UI.Group title="Курс ЦБ РФ">
                            <CurrencyRateDashboard/>
                        </UI.Group>
                        <UI.Group title="Калькулятор">
                            <CurrencyConverter/>
                        </UI.Group>
                        <UI.Button type="cell" align="center" onClick={this.openAbout.bind(this)}>О
                            программе</UI.Button>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }

    openAbout() {
        this.props.dispatch(push('/about'));
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(App);
