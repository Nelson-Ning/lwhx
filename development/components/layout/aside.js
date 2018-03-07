import React, {
    Component
} from 'react';
import {
    Layout,
    Icon,
    Menu,
} from 'antd';
import './style/common.scss';
import {
    CommonActions
} from '../../redux/action/index.js';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Link,
} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const {
    Sider
} = Layout;
class Aside extends Component {

    constructor(props) {
        super(props);
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(collapsed) {
        const {
            changeAside
        } = this.props.CommonActions;
        changeAside(collapsed);
    }

    render() {
        const level = this.props.Common.userInfo.level || '';
        let content;
        switch (level) {
            case 'A':
                {
                    content = (
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/home">
                                    <Icon type="desktop" />
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/news">
                                    <Icon type="mail" />
                                    <span>消息发布与管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/memberList">
                                    <Icon type="team" />
                                    <span>人员查看与添加</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/?from=logout">
                                    <Icon type="logout" />
                                    <span>注销</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    );
                    break;
                }
            case 'B':
                {
                    content = (
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/home">
                                    <Icon type="desktop" />
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/news">
                                    <Icon type="mail" />
                                    <span>消息发布与管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/memberList">
                                    <Icon type="team" />
                                    <span>人员查看与添加</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/selectionTime">
                                    <Icon type="team" />
                                    <span>选题时间设置</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/shenpi">
                                    <Icon type="team" />
                                    <span>教师选题审批</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/progress">
                                    <Icon type="team" />
                                    <span>查看选题统计</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/?from=logout">
                                    <Icon type="logout" />
                                    <span>注销</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    );
                    break;
                }
            case 'C':
                {
                    content = (
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/home">
                                    <Icon type="desktop" />
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/memberList">
                                    <Icon type="team" />
                                    <span>人员查看与添加</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/releasesubject">
                                    <Icon type="team" />
                                    <span>发布选题</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/ss">
                                    <Icon type="team" />
                                    <span>个人资料设置</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/progress">
                                    <Icon type="team" />
                                    <span>查看选题统计</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/?from=logout">
                                    <Icon type="logout" />
                                    <span>注销</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    );
                    break;
                }
            case 'D':
                {
                    content = (
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="desktop" />
                                <span>首页</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="team" /><span>选题中心</span></span>}
                            >
                            <Menu.Item key="4">查看清单</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="team" /><span>个人资料设置</span></span>}
                            >
                            <Menu.Item key="6">选题审批</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub6"
                                title={<span><Icon type="team" /><span>查看选题进度</span></span>}
                            >
                            <Menu.Item key="8">进度列表</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <Link to="/?from=logout">
                                    <Icon type="logout" />
                                    <span>注销</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    );
                    break;
                }
            default:
                break;
        }
        return (
            <Sider
              collapsible
              collapsed={this.props.Common.hide}
              onCollapse={this.onCollapse}
            >
                <div className="logo" />
                {content}
            </Sider>
        )
    }
}

function mapStateToProps(state) {
    return {
        Common: state.Common,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CommonActions: bindActionCreators(CommonActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Aside);