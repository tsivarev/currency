import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import {connect} from 'react-redux';

class About extends Component {

    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel">
                    <UI.Panel id="mainPanel">
                        <UI.PanelHeader>О программе</UI.PanelHeader>
                        <UI.Group title="Лицензии">
                            <UI.List>
                                <UI.ListItem multiline>
                                    Иконки – <a href="https://www.flaticon.com/authors/smashicons"
                                                title="Smashicons">Smashicons</a>. Лицензия <a
                                    href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC
                                    3.0 BY</a>.
                                </UI.ListItem>
                            </UI.List>
                        </UI.Group>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }
}


// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(About);
