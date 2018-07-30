import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';


class NavigationBar extends Component {

    render() {
        const osname = UI.platform();

        return (
            <UI.FixedLayout vertical="bottom">
                <UI.Div style={{background: UI.colors.lightBlue, color: '#fff', height: 30}}>
                    <div style={{display: 'inline-block'}} onClick={this.props.onClick}>
                        {osname === UI.IOS ?
                            <Icon28ChevronBack/> :
                            <Icon24Back/>}
                    </div>
                </UI.Div>
            </UI.FixedLayout>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(NavigationBar);
