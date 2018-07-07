import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const initialState = Immutable({
    currencyRates: undefined,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CBR_DAILY_FETCHED:
            return state.merge({
                cbrDaily: action.daily
            });
        case types.USD_EUR_RATE_FETCHED:
            return state.merge({
                usdEurRate: action.daily
            });
        default:
            return state;
    }
}

export function getCbrDailyCurrencyRates(state) {
    return state.currencyRates.cbrDaily;
}

export function getUsdEurRate(state) {
    return state.currencyRates.usdEurRate;
}

export function getCbrCurrencyRateByCode(state) {
    if (!state.currencyRates.cbrDaily) {
        return [];
    }
    return _.keyBy(state.currencyRates.cbrDaily.Valute, (currency) => currency.CharCode);
}
