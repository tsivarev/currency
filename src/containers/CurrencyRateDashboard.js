import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, Cell, Div } from '@vkontakte/vkui';
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
            return (<Div/>);
        }

        let currentDate = this.getPrettyDate(this.props.rates.Date);
        let previousDate = this.getPrettyDate(this.props.rates.PreviousDate);

        return (
            <List>
                <Cell before={<div className="currency_rate_dashboard__item_before"/>}>
                    <div className="currency_rate_dashboard__item">
                        <div
                            className="currency_rate_dashboard__item__column currency_rate_dashboard__header">{currentDate}</div>
                        <div
                            className="currency_rate_dashboard__item__column currency_rate_dashboard__header">{previousDate}</div>
                    </div>
                </Cell>

                {this.renderRow('$', this.props.cbrCurrencies['USD'])}
                {this.renderRow('€', this.props.cbrCurrencies['EUR'])}
            </List>
        );
    }

    renderRow(symbol, currency) {
        
        let isMore = currency.Value > currency.Previous;
        let color = isMore ? '#1BEA60' : '#FF0000';
        let arrow = isMore ? '↑' : '↓';

        return (
            <Cell before={<div className="currency_rate_dashboard__item_before">{symbol}</div>}>
                <div className="currency_rate_dashboard__item">
                    <div className="currency_rate_dashboard__item__column" style={{color: color}}>
                        {currency.Value} ₽ {arrow}
                    </div>
                    <div className="currency_rate_dashboard__item__column">
                        {currency.Previous} ₽
                    </div>
                </div>
            </Cell>
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
