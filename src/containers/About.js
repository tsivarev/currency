import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {connect} from 'react-redux';

class About extends Component {

    render() {
        return (
            <UI.Panel id={this.props.id}>
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
            </UI.Panel>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(About);
