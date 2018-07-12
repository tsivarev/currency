import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24NotificationDisable from '@vkontakte/icons/dist/24/notification_disable';
import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon24User from '@vkontakte/icons/dist/24/user';
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
                        <UI.Div style={{display: 'flex', justifyContent: 'center'}}>
                            <UI.Button level="3" component="a"
                                       href="https://vk.me/currency_app" before={<Icon24Message/>}/>
                            <UI.Button level="3" component="a"
                                       href="https://vk.com/currency_app">Группа</UI.Button>
                            <UI.Button level="3" component="a" onClick={this.openAbout.bind(this)}>О
                                программе</UI.Button>
                        </UI.Div>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }

    renderNotificationButton() {
        const {notificationStatus} = this.props;
        if (!this.props.accessToken) {
            return (<UI.Div>
                <UI.Button
                    before={<Icon24User/>}
                    level='1'
                    size="xl"
                    onClick={this.authorize.bind(this)}
                >Авторизоваться</UI.Button>
            </UI.Div>);
        }

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


    authorize() {
        this.props.dispatch(vkActions.fetchAccessToken());
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
