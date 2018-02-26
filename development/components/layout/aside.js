import React, {
    Component
} from 'react';
import {
    Layout,
    Icon,
    Menu,
} from 'antd';
import './style/header.scss';
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
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="team" /><span>学院管理员权限</span></span>}
                            >
                            <Menu.Item key="5">查看清单</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6">
                                <Link to="/">
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
                                <Icon type="desktop" />
                                <span>首页</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="mail" /><span>消息发布与管理</span></span>}
                            >
                            <Menu.Item key="2">发布</Menu.Item>
                            <Menu.Item key="3">管理</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="team" /><span>教师权限管理</span></span>}
                            >
                            <Menu.Item key="4">查看清单</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="team" /><span>选题时间设置</span></span>}
                            >
                            <Menu.Item key="5">设置时间</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="team" /><span>教师选题审批</span></span>}
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
                                <Link to="/">
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
                                <Icon type="desktop" />
                                <span>首页</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="mail" /><span>消息发布与管理</span></span>}
                            >
                            <Menu.Item key="2">发布</Menu.Item>
                            <Menu.Item key="3">管理</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="team" /><span>学生权限管理</span></span>}
                            >
                            <Menu.Item key="4">查看清单</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="team" /><span>发布选题计划</span></span>}
                            >
                            <Menu.Item key="5">设置时间</Menu.Item>
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
                                <Link to="/">
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
                                key="sub2"
                                title={<span><Icon type="mail" /><span>消息查看</span></span>}
                            >
                            <Menu.Item key="2">查看</Menu.Item>
                            </SubMenu>
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
                                <Link to="/">
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