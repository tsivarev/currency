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

class About extends Component {

    componentDidMount() {
        this.props.dispatch(currencyRatesActions.fetchUsdEurRate());
        this.props.dispatch(currencyRatesActions.fetchCbrCurrencyRates());
    }

    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel">
                    <UI.Panel id="mainPanel">
                        <UI.PanelHeader>О программе</UI.PanelHeader>
                        <UI.Group title="Лицензии">
                            <UI.List>
                                <UI.ListItem multiline>
                                    Иконки – <a href="http://www.freepik.com" title="Freepik">Freepik</a>. Лицензия <a
                                    href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                                    target="_blank">CC 3.0 BY</a>.
                                </UI.ListItem>
                                <UI.ListItem multiline>
                                    Звуки – <a href="http://www.freesfx.co.uk/" title="freesfx.co.uk">freesfx.co.uk</a>.
                                </UI.ListItem>
                            </UI.List>
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

export default connect(mapStateToProps)(About);
