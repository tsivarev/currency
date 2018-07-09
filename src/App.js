import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import logo from './logo.svg';
import CurrencyRateDashboard from './containers/CurrencyRateDashboard';
import CurrencyConverter from './containers/CurrencyConverter';
import * as currencyRatesActions from './store/currency_rates/actions';
import {connect} from 'react-redux';

//<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

class App extends Component {

    componentDidMount() {
        this.props.dispatch(currencyRatesActions.fetchUsdEurRate());
        this.props.dispatch(currencyRatesActions.fetchCbrCurrencyRates());
    }

    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Div style={{textAlign: 'center'}}>
                            <img width={96} height={96} src={logo}/>
                        </UI.Div>
                        <UI.Group title="Курс ЦБ РФ">
                            <CurrencyRateDashboard/>
                        </UI.Group>
                        <UI.Group title="Калькулятор">
                            <CurrencyConverter/>
                        </UI.Group>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }
}


// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(App);
