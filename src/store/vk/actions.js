import * as VKConnect from '@vkontakte/vkui-connect';
import * as types from './actionTypes';

export function fetchAccessToken(appId) {
    return async (dispatch, getState) => {
        sendEvent('VKWebAppGetAuthToken', {'app_id': appId},
            data => {
                dispatch({type: types.VK_GET_ACCESS_TOKEN_FETCHED, accessToken: data['access_token']});
            }, error => {
                dispatch({type: types.VK_GET_ACCESS_TOKEN_FAILED, error: error});
            });
    }
}

export function fetchNotificationStatus(accessToken) {
    return async (dispatch, getState) => {
        sendEvent('VKWebAppCallAPIMethod', {
            'method': 'apps.isNotificationsAllowed', 'params': {
                'access_token': accessToken,
                'v': '5.80'
            }
        }, data => {
            //Dirty hack
            let isClient = typeof window !== 'undefined';
            let androidBridge = isClient && window.AndroidBridge;

            dispatch({
                type: types.VK_NOTIFICATION_STATUS_FETCHED,
                notificationStatus: androidBridge ? data['response']['response']['is_allowed'] : data['response']['is_allowed'],
            });
        }, error => {
            dispatch({type: types.VK_NOTIFICATION_STATUS_FAILED, error: error});
        });
    }
}

export function denyNotifications() {
    return async (dispatch, getState) => {
        sendEvent('VKWebAppDenyNotifications', {}, () => {
            dispatch({
                type: types.VK_NOTIFICATION_STATUS_FETCHED,
                notificationStatus: false,
            });
        }, error => {
            dispatch({type: types.VK_NOTIFICATION_STATUS_FAILED, error: error});
        });
    }
}

export function allowNotifications() {
    return async (dispatch, getState) => {
        sendEvent('VKWebAppAllowNotifications', {}, () => {
            dispatch({
                type: types.VK_NOTIFICATION_STATUS_FETCHED,
                notificationStatus: true,
            });
        }, error => {
            dispatch({type: types.VK_NOTIFICATION_STATUS_FAILED, error: error});
        });
    }
}

export function initApp() {
    sendEvent('VKWebAppInit');
}

function sendEvent(sendType, params = {}, successCallback = () => {
}, errorCallback = () => {
}) {
    VKConnect.subscribe(e => {
        let vkEvent = e.detail;
        let type = vkEvent['type'];
        let data = vkEvent['data'];

        switch (sendType) {
            case 'VKWebAppCallAPIMethod':
                if (type === 'VKWebAppCallAPIMethodResult') {
                    successCallback(data);
                } else if (type === 'VKWebAppCallAPIMethodFailed') {
                    errorCallback(data);
                }
                break;

            case 'VKWebAppGetAuthToken':
                if (type === 'VKWebAppAccessTokenReceived') {
                    successCallback(data);
                } else if (type === 'VKWebAppAccessTokenFailed') {
                    errorCallback(data);
                }
                break;

            case 'VKWebAppAllowNotifications':
                if (type === 'VKWebAppAllowNotificationsResult') {
                    successCallback(data);
                } else if (type === 'VKWebAppAllowNotificationsFailed') {
                    errorCallback(data);
                }
                break;

            case 'VKWebAppDenyNotifications':
                if (type === 'VKWebAppDenyNotificationsResult') {
                    successCallback(data);
                } else if (type === 'VKWebAppDenyNotificationsFailed') {
                    errorCallback(data);
                }
                break;
        }
    });

    VKConnect.send(sendType, params);
}
