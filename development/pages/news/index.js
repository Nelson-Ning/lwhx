import * as React from 'react';
import {
    Table,
    Icon,
    Divider,
    Button,
    Modal,
    Checkbox,
    Input,
    Row,
    Col,
    message
} from 'antd';
import './index.scss';
import CONST from '../../utils/const';
import {
    AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
const {
    TextArea
} = Input;
export default class News extends React.Component {

    constructor(props) {
        super(props);
        this.pushonClick = this.pushonClick.bind(this);
        this.pushonOk = this.pushonOk.bind(this);
        this.pushonCancel = this.pushonCancel.bind(this);
        this.titleonChange = this.titleonChange.bind(this);
        this.contentonChange = this.contentonChange.bind(this);
        this.checkBoxOnchange = this.checkBoxOnchange.bind(this);
        this.Reedit = this.Reedit.bind(this);
        this.addNotice = this.addNotice.bind(this);
        this.getNotice = this.getNotice.bind(this);
        this.recallNotice = this.recallNotice.bind(this);
        this.state = {
            visible: false,
            data: [],
            params: {
                publisher: '',
                content: '',
                channel: '',
                title: '',
                id: ''
            }
        };
        this.columns = [{
            title: '消息标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '消息内容',
            dataIndex: 'content',
            key: 'content'
        }, {
            title: '消息状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (CONST.MESSAGE_STATUS.filter((value) => (value[0] == text))[0][1])
        }, {
            title: '发布渠道',
            dataIndex: 'channel',
            key: 'channel',
            render: (text, record) => (record.channel.split(',').map((items) => (CONST.MESSAGE_CODE.filter((value) => (value[0] === items))[0][1])).join('；'))
        }, {
            title: '发布人',
            dataIndex: 'publisher',
            key: 'publisher'
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                if (record.status == "0") {
                    return (
                        <span><a
                     href="javascript: void(0)"
                     onClick={ this.Reedit }
                     id={ record.id }>重新编辑</a></span>
                    )
                } else {
                    return (
                        <span><a
                     href="avascript: void(0)"
                     notice_id={ record.id }
                     onClick={ this.recallNotice }>撤回</a></span>
                    )

                }
            },
        }];
    }

    Reedit(e) {
        const data = this.state.data.filter((val) => (val.id == e.target.id));
        let obj = {};
        obj.id = data[0].id;
        obj.publisher = data[0].publisher;
        obj.content = data[0].content;
        obj.channel = data[0].channel.split(',');
        obj.title = data[0].title;
        this.setState({
            visible: true,
            params: obj
        });
    }

    pushonClick() {
        this.setState({
            visible: true,
        })
    }

    componentDidMount() {
        this.getNotice();
    }

    getNotice() {
        let level = sessionStorage.getItem("level");
        let channel = [];
        switch (level) {
            case 'A':
                {
                    channel = [1, 2, 3, 4, 5];
                    break;
                }
            case 'B':
                {
                    channel = [4, 5];
                    break;
                }
            default:
                break;
        }
        Ajax.get({
            url: 'api/notice/getNotice',
            data: {
                "channel": channel
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    data: result.ret || []
                })
            } else {
                message.error('服务器请求失败');
            }
        });
    }

    addNotice(params = {}) {
        Ajax.post({
            url: 'api/notice/addNotice',
            data: params
        }).then(result => {
            if (0 === +result.errno) {
                message.success('发送 / 更新成功');
                this.getNotice();
                this.setState({
                    visible: false
                });
            } else {
                message.error('服务器请求失败');
            }
        })
    }

    pushonOk() {
        const {
            content,
            channel,
            title
        } = this.state.params;
        if (channel.length === 0) {
            message.error('请输入消息接受者');
            return;
        } else if (title == '') {
            message.error('请输入标题');
            return;
        } else if (content == '') {
            message.error('请输入内容');
            return;
        }
        let obj = Object.assign({}, this.state.params);
        obj.publisher = sessionStorage.getItem("name");
        this.setState({
            params: obj
        }, this.addNotice(obj))
    }

    recallNotice(e) {
        Ajax.get({
            url: 'api/notice/recallNotice',
            data: {
                "id": e.target.getAttribute('notice_id')
            },
        }).then(result => {
            if (0 === +result.errno) {
                message.success('撤回成功');
                this.getNotice();
            } else {
                message.error('服务器请求失败');
            }
        });
    }

    pushonCancel() {
        this.setState({
            visible: false
        })
    }

    titleonChange(e) {
        let obj = Object.assign({}, this.state.params);
        obj.title = e.target.value;
        this.setState({
            params: obj
        })
    }

    contentonChange(e) {
        let obj = Object.assign({}, this.state.params);
        obj.content = e.target.value;
        this.setState({
            params: obj
        })
    }

    checkBoxOnchange(checkedValues) {
        let obj = Object.assign({}, this.state.params);
        obj.channel = checkedValues;
        this.setState({
            params: obj
        })
    }

    render() {
        let level = sessionStorage.getItem("level");
        const {
            data
        } = this.state;
        const {
            content,
            channel,
            title
        } = this.state.params;
        return (
            <div className="details-content">
        <Table
               className="data-table"
               columns={ this.columns }
               dataSource={ data }
               rowKey="id"
               title={ () => <div style={ { "overflow": "hidden" } }>
                               <Button
                                       type="primary"
                                       className="data-table-title-button"
                                       onClick={ this.pushonClick }>
                                 发布信息
                               </Button>
                             </div>
        }
        /> <
        Modal
        title = "发布消息"
        visible = {
            this.state.visible
        }
        onOk = {
            this.pushonOk
        }
        onCancel = {
            this.pushonCancel
        }
        okText = "发送消息"
        cancelText = "取消" >
            <p className="news-modal-title">
            发送到：
          </p> <
            Checkbox.Group
        style = {
            {
                width: '100%'
            }
        }
        onChange = {
            this.checkBoxOnchange
        }
        value = {
                channel
            } >
            <Row
                 type="flex"
                 justify="start">
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' ? 'block' : 'none' } }>
                <Checkbox value="0">
                  登录页公告
                </Checkbox>
              </Col>
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' ? 'block' : 'none' } }>
                <Checkbox value="1">
                  公共首页公告
                </Checkbox>
              </Col>
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' ? 'block' : 'none' } }>
                <Checkbox value="2">
                  全部总权限管理员
                </Checkbox>
              </Col>
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' ? 'block' : 'none' } }>
                <Checkbox value="3">
                  全部学院管理员
                </Checkbox>
              </Col>
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' || level == 'B' ? 'block' : 'none' } }>
                <Checkbox value="4">
                  全部教师
                </Checkbox>
              </Col>
              <Col
                   span={ 8 }
                   style={ { 'display': level == 'A' || level == 'B' ? 'block' : 'none' } }>
                <Checkbox value="5">
                  全部学生
                </Checkbox>
              </Col>
            </Row> <
            /Checkbox.Group> <
        p className = "news-modal-title" >
            标题： <
            /p> <
        TextArea
        placeholder = "请输入标题..."
        autosize
        onChange = {
            this.titleonChange
        }
        value = {
            title
        }
        /> <
        p className = "news-modal-title" >
            内容： <
            /p> <
        TextArea
        placeholder = "请输入内容..."
        autosize = {
            {
                minRows: 4
            }
        }
        onChange = {
            this.contentonChange
        }
        value = {
            content
        }
        /> < /
        Modal > <
            /div>
    )
}
}