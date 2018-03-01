import * as React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Table,
    Button,
    Divider,
    Radio,
    Modal,
    Row,
    Col,
    Input,
    Dropdown,
    Menu
} from 'antd';
import {
    fromJS
} from 'immutable';
import {
    MemberListActions
} from './actions.js';
import './index.scss';
import CONST from '../../utils/const';
const RadioGroup = Radio.Group;
class MemberList extends React.Component {

    constructor(props) {
        super(props);
        this.addAccountNumber = this.addAccountNumber.bind(this);
        this.pushonCancel = this.pushonCancel.bind(this);
        this.pushonOk = this.pushonOk.bind(this);
        this.levelRadioOnchange = this.levelRadioOnchange.bind(this);
        this.usernameOnchange = this.usernameOnchange.bind(this);
        this.passwordOnchange = this.passwordOnchange.bind(this);
        this.instituteOnchange = this.instituteOnchange.bind(this);
        this.state = {
            visible: false,
            reeditid: ''
        };
        this.columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },{
            title: '权限',
            dataIndex: 'level',
            key: 'level'
        },{
            title: '学院',
            dataIndex: 'institute',
            key: 'institute'
        },{
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (
                    <span>
                        <a href="javascript: void(0)">删除</a>
                        <Divider type="vertical" />
                        <a href="javascript: void(0)">修改权限</a>
                    </span>
                    )
            }
        }];
        this.menu = () => {
            return (
                <Menu>
                    { CONST.INSTITUTE_CODE.map((currentValue, index, array)=> (
                        <Menu.Item key={currentValue[0]}>
                            <a target="javascript: void(0)" id={currentValue[0]} onClick={this.instituteOnchange}>{currentValue[1]}</a>
                        </Menu.Item>
                        ))}
                </Menu>
            )
        }
    }

    addAccountNumber(){
        this.setState({
            visible: true
        })
    }

    pushonOk() {

    }

    pushonCancel() {
        this.setState({
            visible: false
        })
    }

    levelRadioOnchange(e){
        this.props.MemberListActions.addAccountNumber(fromJS(this.props.memberList.params).merge({level: e.target.value}));
    }

    instituteOnchange(e){
        this.props.MemberListActions.addAccountNumber(fromJS(this.props.memberList.params).merge({institute: e.target.id}));
    }

    usernameOnchange(e){
        this.props.MemberListActions.addAccountNumber(fromJS(this.props.memberList.params).merge({username: e.target.value}));
    } 

    passwordOnchange(e){
        this.props.MemberListActions.addAccountNumber(fromJS(this.props.memberList.params).merge({password: e.target.value}));
    }

    render() {
        const data = this.props.memberList.data;
        const user_level = this.props.common.userInfo.level;
        const {level, username, password, institute} = this.props.memberList.params;
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={data}
                    rowKey="id" 
                    title={() => 
                        <div>
                            <span>学院管理员列表</span>
                            <Button type="primary" className="data-table-title-button" onClick={this.addAccountNumber}>添加帐号</Button>
                        </div>
                    }
                />
                <Modal
                    title = "添加帐号"
                    visible = {this.state.visible}
                    onOk = {this.pushonOk}
                    onCancel = {this.pushonCancel}
                    okText="确认添加"
                    cancelText="取消"
                >
                <Row type="flex" justify="space-around" className="memberList-modal-item">
                    <Col span={5}>
                        <span className="memberList-modal-title">帐号权限：</span>
                    </Col>
                    <Col span={18}>
                        <RadioGroup style={{ width: '100%' }} onChange={this.levelRadioOnchange} value={level}>
                            <Row type="flex" justify="start">
                                <Col span={12} style={{ 'display': user_level == 'A' ? 'block': 'none'}}>
                                    <Radio value="A">{CONST.USER_LEVEL.filter((value) => (value[0] == 'A'))[0][1]}</Radio>
                                </Col>
                                <Col span={12} style={{ 'display': user_level == 'A' ? 'block': 'none'}}>
                                    <Radio value="B">{CONST.USER_LEVEL.filter((value) => (value[0] == 'B'))[0][1]}</Radio>
                                </Col>
                                <Col span={12} style={{ 'display': user_level == 'A' || user_level == 'B' ? 'block': 'none'}}>
                                    <Radio value="C">{CONST.USER_LEVEL.filter((value) => (value[0] == 'C'))[0][1]}</Radio>
                                </Col>
                                <Col span={12} style={{ 'display': user_level == 'A' || user_level == 'B' || user_level == 'C'? 'block': 'none'}}>
                                    <Radio value="D">{CONST.USER_LEVEL.filter((value) => (value[0] == 'D'))[0][1]}</Radio>
                                </Col>
                            </Row>
                        </RadioGroup>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" className="memberList-modal-item">
                    <Col span={5}>
                        <span className="memberList-modal-title">帐号用户名：</span>
                    </Col>
                    <Col span={18}>
                        <Input placeholder="用户名" value={username} onChange={this.usernameOnchange}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" className="memberList-modal-item">
                    <Col span={5}>
                        <span className="memberList-modal-title">帐号密码：</span>
                    </Col>
                    <Col span={18}>
                        <Input placeholder="密码" value={password} onChange={this.passwordOnchange}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" className="memberList-modal-item" style={{'display' : (level === 'B' || level === 'C' ? 'block' : 'none')}}>
                    <Col span={5}>
                        <span className="memberList-modal-title">学院：</span>
                    </Col>
                    <Col span={18}>
                        <Dropdown overlay={this.menu()} trigger={['click', 'hover', 'contextMenu']} value={institute}>
                            <Button>{CONST.INSTITUTE_CODE.filter((value) => (value[0] == (institute ? institute : '0')))[0][1]}</Button>
                        </Dropdown>
                    </Col>
                </Row>
                </Modal> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {
        Common,
        MemberList
    } = state;
    return {
        common: Common,
        memberList:MemberList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        MemberListActions: bindActionCreators(MemberListActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberList);