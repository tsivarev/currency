import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    vk: undefined,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.VK_GET_ACCESS_TOKEN_FETCHED:
            return state.merge({
                accessToken: action.accessToken
            });
        case types.VK_NOTIFICATION_STATUS_FETCHED:
            return state.merge({
                notificationStatus: action.notificationStatus
            });
        case types.VK_GET_ACCESS_TOKEN_FAILED:
            return state.merge({
                accessTokenError: action.error
            });
        case types.VK_NOTIFICATION_STATUS_FAILED:
            return state.merge({
                notificationStatusError: action.error
            });
        default:
            return state;
    }
}

export function getVkAccessToken(state) {
    return state.vk.accessToken;
}

export function getNotificationStatus(state) {
    return state.vk.notificationStatus;
}

