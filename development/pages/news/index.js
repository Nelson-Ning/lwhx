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
        this.Reedit = this.Reedit.bind(this);
        this.state = {
            visible: false,
            reeditid: ''
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
                if(record.status === "0"){
                    return (
                        <span>
                            <a href="javascript: void(0)" onClick={this.Reedit} id={record.id}>重新编辑</a>
                        </span>
                        )
                } else {
                    return (                 
                        <span>
                            <a href="avascript: void(0)">撤回</a>
                            <Divider type="vertical" />
                            {record.istop == true ? <a href="#">取消置顶</a> : <a href="#">置顶</a>}
                        </span>
                        )

                }
            },
        }];
    }

    Reedit(e){
        this.setState({
            visible: true,
            reeditid: e.target.id
        });
        const params = this.props.news.message.filter((val) => (val.id === e.target.id));
        this.props.NewsActions.changeParams(fromJS(this.props.news.params).merge(params[0]));  
    }  

    pushonClick() {
        this.setState({
            visible: true,
            reeditid: ''
        })
    }

    pushonOk() {
        if(this.props.news.params.channel.length === 0) {
             message.error('请输入消息接受者');
             return;
        } else if(this.props.news.params.title == '') {
             message.error('请输入标题');
             return;
        } else if(this.props.news.params.content == '') {
             message.error('请输入内容');
             return;
        }
        const params = this.props.news.params;
        params.id = this.state.reeditid === '' ? '' : this.state.reeditid;
        params.status = "1";
        params.publisher = this.props.common.userInfo.name;
        params.istop = false;
        this.props.NewsActions.changeParams(fromJS(this.props.news.params).merge(params));
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
        const message = this.props.news.message;
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={message}
                    rowKey="id" 
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