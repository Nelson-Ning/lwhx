import React, {
    Component
} from 'react';
import {
    Layout,
    Icon,
    Menu,
    Badge,
    Popover
} from 'antd';
import './style/common.scss';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    CommonActions
} from '../../redux/action/index.js';
import CONST from '../../utils/const';
const {
    Header
} = Layout;
const SubMenu = Menu.SubMenu;
class Top extends Component {
    constructor(props) {
        super(props);
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse() {
        const {
            changeAside
        } = this.props.CommonActions;
        changeAside(!this.props.common.hide);
    }

    render() {
        const {
            name,
            level
        } = this.props.common.userInfo;
        const content = (
          <div>
            <p>Content</p>
            <p>Content</p>
          </div>
        );
        return (
            <Header className="layout-header">
                <Icon className="trigger" type={this.props.common.hide ? 'menu-unfold' : 'menu-fold'} onClick={this.onCollapse} />
                <div className="layout-header-menu">
                    <span className="layout-header-menu-title">帐号：</span>
                    <span className="layout-header-menu-title" style={{ 'color': 'red'}}>{name}</span>
                    <span className="layout-header-menu-title">权限信息：</span>
                    <span className="layout-header-menu-title" style={{ 'color': 'red'}}>{CONST.USER_LEVEL.filter((value) => (value[0] == level)).length != 0 ? CONST.USER_LEVEL.filter((value) => (value[0] == level))[0][1] : '未查询到对应权限 请联系系统管理员'}</span>
                    <Popover content={content} title="消息盒子" trigger="hover" placement="bottomRight">
                        <span className="layout-header-menu-mail">
                            <Badge count={1} overflowCount={99}>
                                <Icon type="mail" style={{ 'fontSize': '18px'}}/>
                            </Badge>
                        </span>
                    </Popover>
                </div>
            </Header>
        )
    }
}

function mapStateToProps(state) {
    return {
        common: state.Common,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CommonActions: bindActionCreators(CommonActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Top);