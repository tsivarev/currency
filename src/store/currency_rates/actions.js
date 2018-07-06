import * as types from './actionTypes';
import CBR from '../../services/cbr';

export function fetchCurrencyRates() {
    return async (dispatch, getState) => {
        try {
            const daily = await CBR.getDaily();
            dispatch({type: types.DAILY_FETCHED, daily: daily});
        } catch (error) {
            console.error(error);
        }
    };
}
