import * as VKConnect from '@vkontakte/vkui-connect';
import * as types from './actionTypes';

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
                case 'VKWebAppUpdateInsets':
                    dispatch({
                        type: types.VK_INSETS_FETCHED,
                        insets: data.insets
                    });
                    break;

                default:
                //nop;
            }
        });

        VKConnect.send('VKWebAppInit', {'no_toolbar': true});
    }
}
