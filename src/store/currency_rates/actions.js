import * as types from './actionTypes';
import CBR from '../../services/CBR';
import CurrencyConverter from '../../services/CurrencyConverter';

export function fetchCbrCurrencyRates() {
    return async (dispatch, getState) => {
        try {
            let date = new Date();
            const daily = await CBR.getDaily(date);
            dispatch({type: types.CBR_DAILY_FETCHED, daily: daily});
        } catch (error) {
            console.error(error);
        }
    };
}

export function fetchUsdEurRate() {
    return async (dispatch, getState) => {
        try {
            const daily = await CurrencyConverter.getUsdEurRate();
            dispatch({type: types.USD_EUR_RATE_FETCHED, daily: daily});
        } catch (error) {
            console.error(error);
        }
    };
}
