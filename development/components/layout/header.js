import React, {
    Component
} from 'react';
import {
    Layout,
    Icon,
    Menu,
    Badge,
    Popover,
    List,
    Divider,
    Tabs,
    Avatar,
    Modal,
    Input
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
import icon_mail from '../../images/icon-mail.png';
import icon_star from '../../images/icon-star.png';
import icon_message from '../../images/icon-message.png';
import { 
    getLocalTime
} from '../../utils/index.js';
const {
    Header
} = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
class Top extends Component {
    constructor(props) {
        super(props);
        this.onCollapse = this.onCollapse.bind(this);
        this.showNewsModel = this.showNewsModel.bind(this);
        this.showNoticeModel = this.showNoticeModel.bind(this)
        this.modalOnCancel = this.modalOnCancel.bind(this);
        this.modalOnRelay = this.modalOnRelay.bind(this);
        this.changeReplyChange = this.changeReplyChange.bind(this); 
        this.state = {
            type: 'notice',
            title: '',
            content: '',
            visible: false,
            showReply: false,
            isReply: false,
            replyText: ''
        }
    }

    onCollapse() {
        const {
            changeAside
        } = this.props.CommonActions;
        changeAside(!this.props.common.hide);
    }

    showNoticeModel(e) {
        let id = e.target.id;
        let obj = this.props.common.userInfo.message.filter( (value)=> value.id === id);
        console.log(obj);
        this.setState({
            visible: true,
            type: 'notice',
            title: obj[0].title,
            content: obj[0].content,
            showReply: false,
            isReply: false
        })
    }

    showNewsModel(e) {
        let id = e.target.id;
        let obj = this.props.common.userInfo.message.filter( (value)=> value.id === id)
        this.setState({
            visible: true,
            type: 'news',
            title: obj[0].publisher,
            content: obj[0].title,
            isReply: false
        })
    }

    modalOnCancel(){
        this.setState({
            visible: false,
            content: '',
            title: '',
            type: '',
            isReply: false
        })  
    }

    modalOnRelay(){
        if (this.state.type === 'notice'){
            this.setState({
                visible: false,
                content: '',
                title: '',
                type: '',
                showReply: false,
                isReply: false
            })  
        } else {
            this.setState({
                showReply: true,
                content: '',
                isReply: true
            })  
        }
        if (this.state.isReply){
            console.log(this.state);
            this.setState({
                replyText: '',
                visible: false
            })
        }
    }

    changeReplyChange(e){
        this.setState({
            replyText: e.target.value
        })
    }

    render() {
        const {
            name,
            level,
            message
        } = this.props.common.userInfo;
        const {
            visible,
            type,
            title,
            content,
            showReply,
            isReply,
            replyText
        } = this.state;
        const count = message.filter((value) => (value.isRead === false)).length || 0;
        const notice = message.filter((value) => (value.message_type === '1' || value.message_type === '2'));
        const unread_notice = notice.filter((value) => (value.isRead === false)).length || 0;
        const news = message.filter((value) => (value.message_type === '0'));
        const unread_news = news.filter((value) => (value.isRead === false)).length || 0;
        const pop_content = (
          <div style={{ 'width': '300px'}}>
              <Tabs defaultActiveKey="1" onChange={null}>
                <TabPane tab={"通知" + "(" + unread_notice + ")"} key="1">
                    {notice.length === 0 ? 
                        <p>您没有通知</p>
                        :
                        <List
                            itemLayout="horizontal"
                            dataSource={notice}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar src={item.message_type === '1' ? icon_mail : icon_star} />}
                                  title={<a href="javascript: void(0)" id={item.id} onClick={this.showNoticeModel}>{item.title}</a>}
                                  description={getLocalTime(item.time)}
                                />
                              </List.Item>
                            )}
                        />
                    }
                </TabPane>
                <TabPane tab={"消息" + "(" + unread_news + ")"} key="2">
                    {notice.length === 0 ? 
                        <p>您没有消息</p>
                        :
                        <List
                            itemLayout="horizontal"
                            dataSource={news}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar src={icon_message} />}
                                  title={<a href="javascript: void(0)" id={item.id} onClick={this.showNewsModel}>{item.title}</a>}
                                  description={getLocalTime(item.time)}
                                />
                              </List.Item>
                            )}
                        />
                    }
                </TabPane>
              </Tabs>
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
                    <Popover content={pop_content} trigger="hover" placement="bottomRight">
                        <span className="layout-header-menu-mail">
                            <Badge count={count} overflowCount={99}>
                                <Icon type="mail" style={{ 'fontSize': '18px'}}/>
                            </Badge>
                        </span>
                    </Popover>
                </div>
                <Modal
                    title = {type == 'notice' ? title  : '来自' + title +'的消息'}
                    visible = {visible}
                    onCancel = {this.modalOnCancel}
                    okText = {type == 'notice' ? '确定' : isReply ? '发送' : '回复'}
                    cancelText ="取消"
                    onOk = {this.modalOnRelay}
                >
                {content}
                {showReply ? <TextArea value={replyText} placeholder={ "回复给 " + title +" 的信息"} autosize={{ minRows: 5 }} onChange={this.changeReplyChange} /> : '' }
                </Modal>
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