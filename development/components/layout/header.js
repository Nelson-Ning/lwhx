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
    Input,
    message as antd_message
} from 'antd';
import './style/common.scss';
import CONST from '../../utils/const';
import icon_mail from '../../images/icon-mail.png';
import icon_star from '../../images/icon-star.png';
import icon_message from '../../images/icon-message.png';
import {
    getLocalTime
} from '../../utils/index.js';
import {
    AJAX
} from '../../utils/index.js';
import {
    fromJS
} from 'immutable';
const Ajax = new AJAX();
const {
    Header
} = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const {
    TextArea
} = Input;
export default class Top extends Component {
    constructor(props) {
        super(props);
        this.showNewsModel = this.showNewsModel.bind(this);
        this.modalOnCancel = this.modalOnCancel.bind(this);
        this.modalOnRelay = this.modalOnRelay.bind(this);
        this.changeReplyChange = this.changeReplyChange.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.state = {
            type: 'message',
            title: '',
            content: '',
            visible: false,
            showReply: false,
            isReply: false,
            replyText: '',
            message: [],
            receiver: '',
            message_id: '',
        }
    }

    showNewsModel(e) {
        let id = e.target.id;
        const {
            message
        } = this.state;
        let obj = message.filter((value) => value.id == id);
        this.setState({
            visible: true,
            type: 'news',
            title: obj[0].publisher,
            content: obj[0].content,
            receiver: obj[0].publisher_id,
            message_id: obj[0].id,
            isReply: false
        })
    }

    modalOnCancel() {
        this.setState({
            visible: false,
            content: '',
            title: '',
            type: '',
            isReply: false
        })
    }

    componentWillMount() {
        this.getMessage();
    }

    getMessage() {
        let user_id = sessionStorage.getItem("user_id");
        let college = sessionStorage.getItem("college");
        Ajax.get({
            url: 'api/message/getMessage',
            data: {
                "user_id": user_id,
                "college": college
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    message: result.ret
                })
            } else {
                antd_message.error('服务器请求失败');
            }
        })
    }

    modalOnRelay() {
        this.setState({
            showReply: true,
            content: '',
            isReply: true
        })
        if (this.state.isReply) {
            this.setState({
                replyText: '',
                visible: false
            });
            let obj = {};
            obj.publisher = sessionStorage.getItem("user_id");
            obj.content = this.state.replyText;
            obj.receiver = this.state.receiver;
            obj.id = this.state.message_id;
            Ajax.post({
                url: 'api/message/callMessage',
                data: obj
            }).then(result => {
                if (0 === +result.errno) {
                    antd_message.success('消息已发送');
                    this.setState({
                        showReply: false,
                    })
                    this.getMessage();
                } else {
                    antd_message.error('服务器请求失败');
                }
            })
        }
    }

    changeReplyChange(e) {
        this.setState({
            replyText: e.target.value
        })
    }

    render() {
        const name = sessionStorage.getItem("name")
        const level = sessionStorage.getItem("level")
        const {
            visible,
            type,
            title,
            content,
            showReply,
            isReply,
            replyText,
            message
        } = this.state;
        const count = message.length || 0;
        const pop_content = (
            <div style={ { 'width': '300px' } }>
      <Tabs
            defaultActiveKey="1"
            onChange={ null }>
        <TabPane
                 tab={ "消息" + "(" + count + ")" }
                 key="1">
          { count === 0 ?
            <p>
              您没有消息
            </p>
            :
            <List
                  itemLayout="horizontal"
                  dataSource={ message }
                  renderItem={ item => (
                                 <List.Item>
                                   <List.Item.Meta
                                                   avatar={ <Avatar src={ icon_message } /> }
                                                   title={ <a
                                                              href="javascript: void(0)"
                                                              id={ item.id }
                                                              onClick={ this.showNewsModel }>
                                                             { item.content }
                                                           </a> }
                                                   description={ item.time } />
                                 </List.Item>
                               ) } /> }
        </TabPane>
      </Tabs>
    </div>
        );
        return (
            <Header className="layout-header">
        <div className="layout-header-menu">
          <span className="layout-header-menu-title">帐号：</span>
          <span
                className="layout-header-menu-title"
                style={ { 'color': 'red' } }>{ name }</span>
          <span className="layout-header-menu-title">权限信息：</span>
          <span
                className="layout-header-menu-title"
                style={ { 'color': 'red' } }>{ CONST.USER_LEVEL.filter((value) => (value[0] == level)).length != 0 ? CONST.USER_LEVEL.filter((value) => (value[0] == level))[0][1] : '未查询到对应权限 请联系系统管理员' }</span>
          <Popover
                   content={ pop_content }
                   trigger="hover"
                   placement="bottomRight">
            <span className="layout-header-menu-mail"><Badge
                                                             count={ count }
                                                             overflowCount={ 99 }> <Icon
                                                                                                                                  type="mail"
                                                                                                                                  style={ { 'fontSize': '18px' } }/> </Badge></span>
          </Popover>
        </div>
        <Modal
               title={ type == 'notice' ? title : '来自' + title + '的消息' }
               visible={ visible }
               onCancel={ this.modalOnCancel }
               okText={ type == 'notice' ? '确定' : isReply ? '发送' : '回复' }
               cancelText="取消"
               onOk={ this.modalOnRelay }>
          { content }
          { showReply ? <TextArea
                                  value={ replyText }
                                  placeholder={ "回复给 " + title + " 的信息" }
                                  autosize={ { minRows: 5 } }
                                  onChange={ this.changeReplyChange } /> : '' }
        </Modal>
      </Header>
        )
    }
}