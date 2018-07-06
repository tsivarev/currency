import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const initialState = Immutable({
    currencyRates: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.DAILY_FETCHED:
            return state.merge({
                daily: action.daily
            });
        default:
            return state;
    }
}

export function getDailyCurrencyRates(state) {
    return state.currencyRates.daily;
}

export function getCurrencyRateByCode(state) {
    if (!state.currencyRates.daily) {
        return [];
    }
    return _.keyBy(state.currencyRates.daily.Valute, (currency) => currency.CharCode);
}
