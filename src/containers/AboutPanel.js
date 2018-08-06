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
                        Исходный код доступен на <a href="https://github.com/tsivarev/currency"
                                                    title="Github">GitHub</a>.
                        <br/>
                        <br/>
                        Документация <a href="https://vk.com/dev/vk_apps_docs">VK Apps платформы</a>.
                    </UI.Div>
                </UI.Group>
                <UI.Group title="Используемые ресурсы">
                    <UI.List>
                        <UI.ListItem multiline>
                            Иконки – <a href="https://www.flaticon.com/authors/smashicons"
                                        title="Smashicons">Smashicons</a>. Лицензия <a
                            href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC
                            3.0 BY</a>.
                        </UI.ListItem>
                        <UI.ListItem multiline>
                            Курсы ЦБ РФ – <a href="https://www.cbr-xml-daily.ru/">API</a>.
                        </UI.ListItem>
                        <UI.ListItem multiline>
                            Курс USD/EUR – <a href="https://free.currencyconverterapi.com/">API</a>.
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
