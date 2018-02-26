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
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import './index.scss';
import {
    NewsActions
} from './actions.js';
import {
    CommonActions
} from '../../redux/action/index.js';
import {
    fromJS
} from 'immutable';
import CONST from '../../utils/const';
const { TextArea } = Input;
class News extends React.Component {

    constructor(props) {
        super(props);
        this.pushonClick = this.pushonClick.bind(this);
        this.pushonOk = this.pushonOk.bind(this);
        this.pushonCancel = this.pushonCancel.bind(this);
        this.titleonChange = this.titleonChange.bind(this);
        this.contentonChange = this.contentonChange.bind(this);
        this.checkBoxOnchange = this.checkBoxOnchange.bind(this);
        this.state = {
            visible: false,
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
            render: (text, record) => (CONST.MESSAGE_STATUS.filter((value) => (value[0] === text))[0][1])
        }, {
            title: '消息类型',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (CONST.MESSAGE_CODE.filter((value) => (value[0] === text))[0][1])
        }, {
            title: '发布渠道',
            dataIndex: 'channel',
            key: 'channel',
            render: (text, record) => ( record.channel.map((items) => (CONST.MESSAGE_CODE.filter((value) => (value[0] === items))[0][1])).join('；') )
        }, {
            title: '发布人',
            dataIndex: 'publisher',
            key: 'publisher'
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (
                    <span>
                      <a href="#">撤回</a>
                      <Divider type="vertical" />
                      {record.istop == true ? <a href="#">取消置顶</a> : <a href="#">置顶</a>}
                    </span>
                    )
            },
        }];

        this.data = [{
            id: '1',
            title: 'John Brown',
            content: 32,
            status: "0",
            channel: ["1","2"],
            publisher: 'zhangsan',
            istop: true,
            type: "0"
        },{
            id: '2',
            title: 'John Brown',
            content: 32,
            status: "1",
            channel: ["1","2"],
            publisher: 'zhangsan',
            istop: false,
            type: "4"
        },{
            id: '3',
            title: 'John Brown',
            content: 32,
            status: "0",
            channel: ["1","2"],
            publisher: 'zhangsan',
            istop: true,
            type: "1"
        }];
    }

    pushonClick() {
        this.setState({
            visible: true
        })
    }

    pushonOk() {
        if(this.state.channel == []) {
             message.error('请输入消息接受者');
             return;
        } else if(this.state.title == '') {
             message.error('请输入标题');
             return;
        } else if(this.state.content == '') {
             message.error('请输入内容');
             return;
        }
    }

    pushonCancel() {
        this.setState({
            visible: false
        })
    }

    titleonChange(e) {
        this.props.NewsActions.changeParams(fromJS(this.props.news.params).merge({title: e.target.value}));
    }

    contentonChange(e) {
        this.props.NewsActions.changeParams(fromJS(this.props.news.params).merge({content: e.target.value}));
    }

    checkBoxOnchange(checkedValues) {
        this.props.NewsActions.changeParams(fromJS(this.props.news.params).merge({channel: checkedValues.sort()}));
    }

    render() {
        const level = this.props.common.userInfo.level;
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={this.data} 
                    title={() => 
                        <div>
                            <span>sad</span>
                            <Button type="primary" className="data-table-title-button" onClick={this.pushonClick}>发布信息</Button>
                        </div>
                    }
                /> 
                <Modal
                    title = "发布消息"
                    visible = {this.state.visible}
                    onOk = {this.pushonOk}
                    onCancel = {this.pushonCancel}
                    okText="发送消息"
                    cancelText="取消"
                >
                <p className="news-modal-title">发送到：</p>
                <Checkbox.Group style={{ width: '100%' }} onChange={this.checkBoxOnchange} value={this.props.news.params.channel}>
                    <Row type="flex" justify="start">
                        <Col span={8} style={{ 'display': level == 'A' ? 'block': 'none'}}>
                            <Checkbox value="0">登录页公告</Checkbox>
                        </Col>
                        <Col span={8} style={{ 'display': level == 'A' ? 'block': 'none'}}>
                            <Checkbox value="1">公共首页公告</Checkbox>
                        </Col>
                        <Col span={8} style={{ 'display': level == 'A' ? 'block': 'none'}}>
                            <Checkbox value="2">全部总权限管理员</Checkbox>
                        </Col>
                        <Col span={8} style={{ 'display': level == 'A' ? 'block': 'none'}}>
                            <Checkbox value="3">全部学院管理员</Checkbox>
                        </Col>
                        <Col span={8} style={{ 'display': level == 'A' || level == 'B' ? 'block': 'none'}}>
                            <Checkbox value="4">全部教师</Checkbox>
                        </Col>
                        <Col span={8} style={{ 'display': level == 'A' || level == 'B' ? 'block': 'none'}}>
                            <Checkbox value="5">全部学生</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
                <p className="news-modal-title">标题：</p>
                <TextArea placeholder="请输入标题..." autosize onChange={this.titleonChange} value={this.props.news.params.title}/>
                <p className="news-modal-title">内容：</p>
                <TextArea placeholder="请输入内容..." autosize={{ minRows: 4}} onChange={this.contentonChange} value={this.props.news.params.content}/>
                </Modal> 
            </div>
    )
}
}

function mapStateToProps(state) {
    let {
        Common,
        News
    } = state;
    return {
        common: Common,
        news:News
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CommonActions: bindActionCreators(CommonActions, dispatch),
        NewsActions: bindActionCreators(NewsActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News);