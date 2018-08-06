import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24NotificationDisable from '@vkontakte/icons/dist/24/notification_disable';
import Icon24User from '@vkontakte/icons/dist/24/user';
import logo from '../logo.svg';
import CurrencyRateDashboard from './CurrencyRateDashboard';
import CurrencyConverter from './CurrencyConverter';
import * as vkSelectors from '../store/vk/reducer';
import * as vkActions from '../store/vk/actions';
import * as currencyRatesActions from '../store/currency_rates/actions';
import Footer from './Footer';
import Logger from './Logger';

class MainPanel extends Component {

    componentWillMount() {
        this.props.dispatch(currencyRatesActions.fetchUsdEurRate());
        this.props.dispatch(currencyRatesActions.fetchCbrCurrencyRates());
    }

    componentDidUpdate() {
        if (this.props.accessToken) {
            this.props.dispatch(vkActions.fetchNotificationStatus(this.props.accessToken));
        }
    }

    render() {
        const isProduction = process.env.NODE_ENV === 'production';
        let logger = null;
        if (!isProduction) {
            logger = <Logger/>;
        }

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader>
                    Курсы валют
                </UI.PanelHeader>
                <UI.Div style={{textAlign: 'center', marginTop: 10}}>
                    <img width={96} height={96} src={logo} alt="logo"/>
                </UI.Div>
                <UI.Group title="Курс ЦБ РФ">
                    <CurrencyRateDashboard/>
                    {this.renderNotificationButton()}
                </UI.Group>
                <UI.Group title="Калькулятор">
                    <CurrencyConverter/>
                </UI.Group>
                <Footer/>
                {logger}
            </UI.Panel>
        );
    }

    renderNotificationButton() {
        const {notificationStatus} = this.props;
        if (!this.props.accessToken || notificationStatus === undefined) {
            return (<UI.Div>
                <UI.Button
                    before={<Icon24User/>}
                    level='1'
                    size="xl"
                    onClick={this.authorize.bind(this)}
                >Авторизоваться</UI.Button>
            </UI.Div>);
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
}

function mapStateToProps(state) {
    return {
        notificationStatus: vkSelectors.getNotificationStatus(state),
    };
}

export default connect(mapStateToProps)(MainPanel);
