import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import CurrencyRateDashboard from "./containers/CurrencyRateDashboard";

class App extends Component {
    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Group title="Курс ЦБ РФ">
                            <CurrencyRateDashboard/>
                        </UI.Group>

                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }
}

export default App;
