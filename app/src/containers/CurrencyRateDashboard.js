import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import './CurrencyRateDashboard.css';
import * as currencyRatesSelectors from '../store/currency_rates/reducer';

class CurrencyRateDashboard extends Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    getPrettyDate(stringDate) {
        let date = new Date(Date.parse(stringDate));
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return ('0' + day).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year.toString().substr(-2);
    }

    render() {
        if (!this.props.rates) {
            return (<UI.Div/>);
        }

        let currentDate = this.getPrettyDate(this.props.rates.Date);
        let previousDate = this.getPrettyDate(this.props.rates.PreviousDate);

        return (
            <UI.List>
                <UI.ListItem before={<div className="currency_rate_dashboard__item_before"/>}>
                    <div className="currency_rate_dashboard__item">
                        <div
                            className="currency_rate_dashboard__item__column currency_rate_dashboard__header">{currentDate}</div>
                        <div
                            className="currency_rate_dashboard__item__column currency_rate_dashboard__header">{previousDate}</div>
                    </div>
                </UI.ListItem>

                {this.renderRow('$', this.props.cbrCurrencies['USD'])}
                {this.renderRow('€', this.props.cbrCurrencies['EUR'])}
            </UI.List>
        );
    }

    renderRow(symbol, currency) {
        let isMore = currency.Value > currency.Previous;
        let color = isMore ? UI.colors.green : UI.colors.red;
        let arrow = isMore ? '↑' : '↓';
        return (
            <UI.ListItem before={<div className="currency_rate_dashboard__item_before">{symbol}</div>}>
                <div className="currency_rate_dashboard__item">
                    <div className="currency_rate_dashboard__item__column" style={{color: color}}>
                        {currency.Value} ₽ {arrow}
                    </div>
                    <div className="currency_rate_dashboard__item__column">
                        {currency.Previous} ₽
                    </div>
                </div>
            </UI.ListItem>
        );
    }
}

function mapStateToProps(state) {
    return {
        rates: currencyRatesSelectors.getCbrDailyCurrencyRates(state),
        cbrCurrencies: currencyRatesSelectors.getCbrCurrencyRateByCode(state),
    };
}

export default connect(mapStateToProps)(CurrencyRateDashboard);
