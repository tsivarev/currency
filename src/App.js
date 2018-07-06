import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import logo from './logo.svg';
import Icon24Forward from '@vkontakte/icons/dist/24/forward';
import CurrencyRateDashboard from "./containers/CurrencyRateDashboard";

//<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

class App extends Component {
    render() {
        return (
            <UI.Root activeView="main">
                <UI.View id="main" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Div style={{textAlign: 'center'}}>
                            <img width={96} height={96} src={logo}/>
                        </UI.Div>
                        <UI.Group title="Курс ЦБ РФ">
                            <CurrencyRateDashboard/>
                        </UI.Group>
                        <UI.Group title="Калькулятор">
                            <UI.FormLayout>
                                <div style={{display: "flex"}}>
                                    <div style={{flexGrow: 3}}  >
                                        <UI.Select defaultValue="rub">
                                            <option value="usd">$</option>
                                            <option value="eur">€</option>
                                            <option value="rub">₽</option>
                                        </UI.Select>
                                    </div>
                                    <div style={{flexGrow: 3, textAlign: "center", color: UI.colors.lightGray}}>
                                        >
                                    </div>
                                    <div style={{flexGrow: 3}} >
                                        <UI.Select defaultValue="usd">
                                            <option value="usd">$</option>
                                            <option value="eur">€</option>
                                            <option value="rub">₽</option>
                                        </UI.Select>
                                    </div>
                                </div>
                            </UI.FormLayout>
                        </UI.Group>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }
}

export default App;
