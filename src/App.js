import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24NotificationDisable from '@vkontakte/icons/dist/24/notification_disable';
import logo from './logo.svg';
import CurrencyRateDashboard from './containers/CurrencyRateDashboard';
import CurrencyConverter from './containers/CurrencyConverter';
import * as vkSelectors from './store/vk/reducer';
import * as vkActions from './store/vk/actions';
import * as currencyRatesActions from './store/currency_rates/actions';

class App extends Component {

    componentDidMount() {
        if (this.props.accessToken) {
            this.props.dispatch(vkActions.fetchNotificationStatus(this.props.accessToken));
        }

        this.props.dispatch(currencyRatesActions.fetchUsdEurRate());
        this.props.dispatch(currencyRatesActions.fetchCbrCurrencyRates());
    }

    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Div style={{textAlign: 'center'}}>
                            <img width={96} height={96} src={logo} alt="logo"/>
                        </UI.Div>
                        <UI.Group title="Курс ЦБ РФ">
                            <CurrencyRateDashboard/>
                            {this.renderNotificationButton()}
                        </UI.Group>
                        <UI.Group title="Калькулятор">
                            <CurrencyConverter/>
                        </UI.Group>
                        <UI.Button type="cell" align="center" onClick={this.openAbout.bind(this)}>О
                            программе</UI.Button>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }

    renderNotificationButton() {
        const {notificationStatus} = this.props;
        if (notificationStatus === undefined) {
            return (null);
        }

        return (<UI.Div>
            <UI.Button
                before={notificationStatus ? <Icon24NotificationDisable/> : <Icon24Notification/>}
                level={notificationStatus ? '2' : '1'}
                size="xl"
                onClick={this.toggleNotifications.bind(this)}
            >{notificationStatus ? 'Отписаться' : 'Подписаться'}</UI.Button>
        </UI.Div>);
    }

    toggleNotifications() {
        const {notificationStatus} = this.props;

        if (notificationStatus) {
            this.props.dispatch(vkActions.denyNotifications());
        } else {
            this.props.dispatch(vkActions.allowNotifications());
        }
    }

    openAbout() {
        this.props.dispatch(push('/about'));
    }
}

function mapStateToProps(state) {
    return {
        notificationStatus: vkSelectors.getNotificationStatus(state),
    };
}

export default connect(mapStateToProps)(App);
