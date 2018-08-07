import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Footer from './Footer';

class AboutPanel extends Component {

    render() {
        const osname = UI.platform();

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader
                    left={<UI.HeaderButton onClick={this.navigationBack.bind(this)}>{osname === UI.IOS ?
                        <Icon28ChevronBack/> : <Icon24Back/>}</UI.HeaderButton>}
                >
                    О программе
                </UI.PanelHeader>
                <UI.Group title="Исходный код">
                    <UI.Div>
                        Исходный код доступен на <UI.Link href="https://github.com/tsivarev/currency">GitHub</UI.Link>.
                        <br/>
                        <br/>
                        Документация <UI.Link href="https://vk.com/dev/vk_apps_docs">VK Apps платформы</UI.Link>.
                    </UI.Div>
                </UI.Group>
                <UI.Group title="Используемые ресурсы">
                    <UI.List>
                        <UI.ListItem multiline>
                            Иконки – <UI.Link href="https://www.flaticon.com/authors/smashicons">Smashicons</UI.Link>.
                            Лицензия <UI.Link
                            href="http://creativecommons.org/licenses/by/3.0/">CC
                            3.0 BY</UI.Link>.
                        </UI.ListItem>
                        <UI.ListItem multiline>
                            Курсы ЦБ РФ – <UI.Link href="https://www.cbr-xml-daily.ru/">API</UI.Link>.
                        </UI.ListItem>
                        <UI.ListItem multiline>
                            Курс USD/EUR – <UI.Link href="https://free.currencyconverterapi.com/">API</UI.Link>.
                        </UI.ListItem>
                    </UI.List>
                </UI.Group>
                <Footer/>
            </UI.Panel>
        );
    }

    navigationBack() {
        this.props.dispatch(goBack());
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AboutPanel);
