import React, {Component} from 'react';
import { Div, Input, Select } from '@vkontakte/vkui';
import './CurrencyConverter.css';
import {connect} from 'react-redux';
import * as currencyRatesSelectors from '../store/currency_rates/reducer';

const USD = 'USD';
const RUB = 'RUB';
const EUR = 'EUR';

class CurrencyConverter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sourceCurrencyCode: USD,
            targetCurrencyCode: RUB,
            amount: 0,
            convertedAmount: '0',
        };

        this.changeSourceCurrencyCode = this.changeSourceCurrencyCode.bind(this);
        this.changeTargetCurrencyCode = this.changeTargetCurrencyCode.bind(this);
        this.changeAmount = this.changeAmount.bind(this);

        this.getCurrencyRate = this.getCurrencyRate.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
    }

    changeSourceCurrencyCode(e) {
        let newTargetCurrencyCode = this.state.targetCurrencyCode;
        let newSourceCurrencyCode = e.target.value;

        if (this.state.targetCurrencyCode === e.target.value) {
            newTargetCurrencyCode = this.state.sourceCurrencyCode;
        }

        this.setState({
            sourceCurrencyCode: newSourceCurrencyCode,
            targetCurrencyCode: newTargetCurrencyCode,
            convertedAmount: this.calculateAmount(this.state.amount, newSourceCurrencyCode, newTargetCurrencyCode)
        });
    }

    changeTargetCurrencyCode(e) {
        let newTargetCurrencyCode = e.target.value;
        let newSourceCurrencyCode = this.state.sourceCurrencyCode;

        if (this.state.sourceCurrencyCode === e.target.value) {
            newSourceCurrencyCode = this.state.targetCurrencyCode;
        }

        this.setState({
            sourceCurrencyCode: newSourceCurrencyCode,
            targetCurrencyCode: newTargetCurrencyCode,
            convertedAmount: this.calculateAmount(this.state.amount, newSourceCurrencyCode, newTargetCurrencyCode)
        });
    }

    getCurrencyRate(sourceCurrencyCode, targetCurrencyCode) {
        if (!this.props.cbrCurrencies) {
            //not loaded yet
            return 1;
        }

        if (sourceCurrencyCode === RUB) {
            if (this.props.cbrCurrencies[targetCurrencyCode]) {
                return 1 / this.props.cbrCurrencies[targetCurrencyCode].Value;
            } else {
                return 1;
            }
        }

        if (targetCurrencyCode === RUB) {
            if (this.props.cbrCurrencies[sourceCurrencyCode]) {
                return this.props.cbrCurrencies[sourceCurrencyCode].Value;
            } else {
                return 1;
            }
        }

        if (targetCurrencyCode === USD) {
            return 1 / this.props.usdEurRate.USD_EUR.val;
        }

        if (targetCurrencyCode === EUR) {
            return this.props.usdEurRate.USD_EUR.val;
        }

        return 1;
    }

    calculateAmount(sourceAmount, sourceCurrencyCode, targetCurrencyCode) {
        return this.getCurrencyRate(sourceCurrencyCode, targetCurrencyCode) * sourceAmount;
    }

    getPrettyAmount(amount) {
        return (Math.round(amount * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    changeAmount(e) {
        this.setState({
            amount: e.target.value,
            convertedAmount: this.calculateAmount(e.target.value, this.state.sourceCurrencyCode, this.state.targetCurrencyCode)
        });
    }

    getCurrencySymbol(code) {
        switch (code) {
            case USD:
                return '$';
            case EUR:
                return '€';
            case RUB:
                return '₽';

            default:
                return '';
        }
    }

    render() {
        return (
            <Div className="currency_converter">
                <div style={{color: '#71757A'}}>
                    Курс
                    1 {this.getCurrencySymbol(this.state.sourceCurrencyCode)} = {this.getPrettyAmount(this.getCurrencyRate(this.state.sourceCurrencyCode, this.state.targetCurrencyCode))} {this.getCurrencySymbol(this.state.targetCurrencyCode)}
                </div>
                <div className="currency_converter__amount_input">
                    <div className="currency_converter__amount_input__input">
                        <Input type="number" placeholder="0" pattern="\d*"
                                  value={this.state.amount ? this.state.amount.toLocaleString() : ''} alignment="right"
                                  onChange={this.changeAmount}/>
                    </div>
                    <div className="currency_converter__amount_input__selector">
                        <Select value={this.state.sourceCurrencyCode} onChange={this.changeSourceCurrencyCode}>
                            <option value={USD}>{this.getCurrencySymbol(USD)}</option>
                            <option value={EUR}>{this.getCurrencySymbol(EUR)}</option>
                            <option value={RUB}>{this.getCurrencySymbol(RUB)}</option>
                        </Select>
                    </div>
                </div>
                <div className="currency_converter__amount_input">
                    <div className="currency_converter__amount_input__input">
                        <Input type="text" alignment="right" disabled
                                  value={this.getPrettyAmount(this.state.convertedAmount)}/>
                    </div>
                    <div className="currency_converter__amount_input__selector">
                        <Select value={this.state.targetCurrencyCode} onChange={this.changeTargetCurrencyCode}>
                            <option value={USD}>{this.getCurrencySymbol(USD)}</option>
                            <option value={EUR}>{this.getCurrencySymbol(EUR)}</option>
                            <option value={RUB}>{this.getCurrencySymbol(RUB)}</option>
                        </Select>
                    </div>
                </div>
            </Div>);
    }
}

function mapStateToProps(state) {
    return {
        cbrCurrencies: currencyRatesSelectors.getCbrCurrencyRateByCode(state),
        usdEurRate: currencyRatesSelectors.getUsdEurRate(state)
    };
}

export default connect(mapStateToProps)(CurrencyConverter);
