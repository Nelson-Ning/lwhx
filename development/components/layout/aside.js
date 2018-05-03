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
    Link,
} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const {
    Sider
} = Layout;
export default class Aside extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeAside: false,
            level: ''
        }
        this.onCollapse = this.onCollapse.bind(this);
        this.level = sessionStorage.getItem("level");
        this.getlevel = this.getlevel.bind(this);
    }

    onCollapse(collapsed) {
        const changeAside = this.state.changeAside;
        this.setState({
            changeAside: !changeAside
        })
        // 通知父元素
        this.props.onCollapse(changeAside);
    }

    componentDidMount() {
        let _this = this;
        let level = sessionStorage.getItem("level");
        _this.setState({
            level: level
        })
        if (!level) {
            window.onload = function() {　　
                level = sessionStorage.getItem("level");
                if (level) {　　
                    _this.setState({
                        level: level
                    })
                }
            };

        }
    }

    getlevel() {
        let level = sessionStorage.getItem("level");
        if (level) {　　
            this.setState({
                level: level
            })
        }
    }

    render() {
        let {
            level
        } = this.state;
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
                                    <span>论文进度查询</span>
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
                                <Link to="/personalData">
                                    <Icon type="team" />
                                    <span>个人资料设置</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/main">
                                    <Icon type="team" />
                                    <span>论文互选大厅</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/progress">
                                    <Icon type="team" />
                                    <span>互选结果查看</span>
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
                                <Link to="/home">
                                    <Icon type="desktop" />
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/main">
                                    <Icon type="team" />
                                    <span>论文互选大厅</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/progress">
                                    <Icon type="team" />
                                    <span>互选结果查看</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5">
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
            collapsed={this.state.changeAside}
            onCollapse={this.onCollapse}
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            >
                <div className="logo" />
                {content}
            </Sider>
        )
    }
}