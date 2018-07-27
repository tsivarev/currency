import * as VKConnect from '@vkontakte/vkui-connect';
import * as types from './actionTypes';

const API_VERSION = '5.80';

export function fetchAccessToken() {
    return async () => {
        let appId = process.env.NODE_ENV === 'production' ? 6625834 : 6625863;
        VKConnect.send('VKWebAppGetAuthToken', {'app_id': appId});
    }
}

export function fetchNotificationStatus(accessToken) {
    return async (dispatch) => {
        apiRequest('apps.isNotificationsAllowed', {}, accessToken, response => {
            dispatch({
                type: types.VK_NOTIFICATION_STATUS_FETCHED,
                notificationStatus: response['is_allowed'],
            });
        }, error => {
            dispatch({type: types.VK_NOTIFICATION_STATUS_FAILED, error: error});
        });
    }
}

export function denyNotifications() {
    return async () => {
        VKConnect.send('VKWebAppDenyNotifications', {});
    }
}

export function allowNotifications() {
    return async () => {
        VKConnect.send('VKWebAppAllowNotifications', {});
    }
}

export function initApp() {
    return async (dispatch) => {
        VKConnect.subscribe(e => {
            let vkEvent = e.detail;
            if (!vkEvent) {
                console.error('invalid event', e);
                return;
            }

            let type = vkEvent['type'];
            let data = vkEvent['data'];

            switch (type) {
                case 'VKWebAppAllowNotificationsResult':
                    dispatch({
                        type: types.VK_NOTIFICATION_STATUS_FETCHED,
                        notificationStatus: true,
                    });
                    break;

                case 'VKWebAppDenyNotificationsResult':
                    dispatch({
                        type: types.VK_NOTIFICATION_STATUS_FETCHED,
                        notificationStatus: false,
                    });
                    break;

                case 'VKWebAppAccessTokenReceived':
                    dispatch({
                        type: types.VK_GET_ACCESS_TOKEN_FETCHED,
                        accessToken: data['access_token']
                    });
                    break;

                default:
                //nop;
            }
        });

        VKConnect.send('VKWebAppInit', {'no_toolbar': true});
    }
}

function apiRequest(method, params = {}, accessToken = '', successCallback = undefined, errorCallback = undefined) {
    if (successCallback !== undefined || errorCallback !== undefined) {
        function callback(e) {
            let vkEvent = e.detail;
            if (!vkEvent) {
                console.error('invalid event', e);
                return;
            }

            let type = vkEvent['type'];
            let data = vkEvent['data'];

            let found = false;
            if ('VKWebAppCallAPIMethodResult' === type) {
                if (successCallback !== undefined) {
                    //Dirty hack
                    let isClient = typeof window !== 'undefined';
                    let isAndroidBridge = isClient && window.AndroidBridge;

                    let response = isAndroidBridge ? data['response']['response'] : data['response'];
                    successCallback(response);
                }

                found = true;
            } else if ('VKWebAppCallAPIMethodFailed' === type) {
                if (errorCallback !== undefined) {
                    errorCallback(data);
                }

                found = true;
            }

            if (found) {
                VKConnect.unsubscribe(callback);
            }

        }

        VKConnect.subscribe(callback);
    }

    params['access_token'] = accessToken;

    if (params['v'] === undefined) {
        params['v'] = API_VERSION;
    }

    VKConnect.send('VKWebAppCallAPIMethod', {
        'method': method, 'params': params
    });
}
