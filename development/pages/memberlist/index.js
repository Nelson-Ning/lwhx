import * as React from 'react';
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
  Menu,
  message
} from 'antd';
import './index.scss';
import CONST from '../../utils/const';
import {
  AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
const RadioGroup = Radio.Group;
export default class MemberList extends React.Component {

  constructor(props) {
    super(props);
    this.addAccountNumber = this.addAccountNumber.bind(this);
    this.pushonCancel = this.pushonCancel.bind(this);
    this.pushonOk = this.pushonOk.bind(this);
    this.levelRadioOnchange = this.levelRadioOnchange.bind(this);
    this.usernameOnchange = this.usernameOnchange.bind(this);
    this.passwordOnchange = this.passwordOnchange.bind(this);
    this.instituteOnchange = this.instituteOnchange.bind(this);
    this.delUser = this.delUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      visible: false,
      data: [],
      params: {
        username: '',
        password: '',
        level: '',
        college: '',
      }
    };
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '权限',
      dataIndex: 'level',
      key: 'level'
    }, {
      title: '学院',
      dataIndex: 'college',
      key: 'college'
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return (
          <span><a
                   href="javascript: void(0)"
                   user_id = { record.user_id }
                   onClick={ this.delUser }>删除</a></span>
        )
      }
    }];
    this.menu = () => {
      return (
        <Menu>
          { CONST.INSTITUTE_CODE.map((currentValue, index, array) => (
              <Menu.Item key={ currentValue[0] }>
                <a
                   target="javascript: void(0)"
                   id={ currentValue[0] }
                   onClick={ this.instituteOnchange }>
                  { currentValue[1] }
                </a>
              </Menu.Item>
            )) }
        </Menu>
      )
    }
  }

  addAccountNumber() {
    this.setState({
      visible: true
    })
  }

  pushonOk() {
    let obj = Object.assign({}, this.state.params);
    this.setState({
      params: obj,
      visible: false
    });
    Ajax.post({
      url: 'api/user/addUser',
      data: obj
    }).then(result => {
      if (0 === +result.errno) {
        message.success('添加成功');
        this.getUser();
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

  delUser(e) {
    Ajax.get({
      url: 'api/user/delUser',
      data: {
        "user_id": e.target.getAttribute('user_id')
      },
    }).then(result => {
      if (0 === +result.errno) {
        message.success('删除用户成功');
        this.getUser();
      } else {
        message.error('服务器请求失败');
      }
    });
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const college = sessionStorage.getItem("college");
    let level = sessionStorage.getItem("level");
    level = String.fromCharCode(level.charCodeAt() + 1);
    Ajax.get({
      url: 'api/user/getUser',
      data: {
        "level": level,
        "college": college
      },
    }).then(result => {
      if (0 === +result.errno) {
        this.setState({
          data: result.ret
        })
      } else {
        message.error('服务器请求失败');
      }
    });
  }

  levelRadioOnchange(e) {
    let obj = Object.assign({}, this.state.params);
    obj.level = e.target.value;
    this.setState({
      params: obj
    })
  }

  instituteOnchange(e) {
    let obj = Object.assign({}, this.state.params);
    obj.college = e.target.id;
    this.setState({
      params: obj
    })
  }

  usernameOnchange(e) {
    let obj = Object.assign({}, this.state.params);
    obj.username = e.target.value;
    this.setState({
      params: obj
    })
  }

  passwordOnchange(e) {
    let obj = Object.assign({}, this.state.params);
    obj.password = e.target.value;
    this.setState({
      params: obj
    })
  }

  render() {
    const {
      data
    } = this.state;
    const user_level = sessionStorage.getItem("level");
    const {
      level,
      username,
      password,
      college
    } = this.state.params;
    let title = '';
    switch (user_level) {
      case 'A':
        {
          title = '学院管理员权限列表';
          break;
        }
      case 'B':
        {
          title = '教师权限列表';
          break;
        }
      case 'C':
        {
          title = '学生权限列表';
          break;
        }
      default:
        break;
    }
    return (
      <div className="details-content">
        <Table
               className="data-table"
               columns={ this.columns }
               dataSource={ data }
               rowKey="user_id"
               title={ () => <div style={ { "overflow": "hidden" }}>
                               <span>{ title }</span>
                               <Button
                                       type="primary"
                                       className="data-table-title-button"
                                       onClick={ this.addAccountNumber }>
                                 添加帐号
                               </Button>
                             </div>
    }
    /> <
    Modal
    title = "添加帐号"
    visible = {
      this.state.visible
    }
    onOk = {
      this.pushonOk
    }
    onCancel = {
      this.pushonCancel
    }
    okText = "确认添加"
    cancelText = "取消" >
      <Row
               type="flex"
               justify="space-around"
               className="memberList-modal-item">
            <Col span={ 5 }>
              <span className="memberList-modal-title">帐号权限：</span>
            </Col>
            <Col span={ 18 }>
              <RadioGroup
                          style={ { width: '100%' } }
                          onChange={ this.levelRadioOnchange }
                          value={ level }>
                <Row
                     type="flex"
                     justify="start">
                  <Col
                       span={ 12 }
                       style={ { 'display': user_level == 'A' ? 'block' : 'none' } }>
                    <Radio value="A">
                      { CONST.USER_LEVEL.filter((value) => (value[0] == 'A'))[0][1] }
                    </Radio>
                  </Col>
                  <Col
                       span={ 12 }
                       style={ { 'display': user_level == 'A' ? 'block' : 'none' } }>
                    <Radio value="B">
                      { CONST.USER_LEVEL.filter((value) => (value[0] == 'B'))[0][1] }
                    </Radio>
                  </Col>
                  <Col
                       span={ 12 }
                       style={ { 'display': user_level == 'A' || user_level == 'B' ? 'block' : 'none' } }>
                    <Radio value="C">
                      { CONST.USER_LEVEL.filter((value) => (value[0] == 'C'))[0][1] }
                    </Radio>
                  </Col>
                  <Col
                       span={ 12 }
                       style={ { 'display': user_level == 'A' || user_level == 'B' || user_level == 'C' ? 'block' : 'none' } }>
                    <Radio value="D">
                      { CONST.USER_LEVEL.filter((value) => (value[0] == 'D'))[0][1] }
                    </Radio>
                  </Col>
                </Row>
              </RadioGroup>
            </Col>
          </Row> <
      Row
    type = "flex"
    justify = "space-around"
    className = "memberList-modal-item" >
      <Col span={ 5 }>
              <span className="memberList-modal-title">帐号用户名：</span>
            </Col> <
      Col span = {
        18
      } >
      <Input
                     placeholder="用户名"
                     value={ username }
                     onChange={ this.usernameOnchange } /> <
      /Col> < /
    Row > <
      Row
    type = "flex"
    justify = "space-around"
    className = "memberList-modal-item" >
      <Col span={ 5 }>
                      <span className="memberList-modal-title">帐号密码：</span>
                    </Col> <
      Col span = {
        18
      } >
      <Input
                             placeholder="密码"
                             value={ password }
                             onChange={ this.passwordOnchange } /> <
      /Col> < /
    Row > <
      Row
    type = "flex"
    justify = "space-around"
    className = "memberList-modal-item"
    style = {
        {
          'display': (level === 'B' || level === 'C' || level === 'D' ? 'block' : 'none')
        }
      } >
      <Col span={ 5 }>
                              <span className="memberList-modal-title">学院：</span>
                            </Col> <
      Col span = {
        18
      } >
      <Dropdown
                                        overlay={ this.menu() }
                                        trigger={ ['click', 'hover', 'contextMenu'] }
                                        value={ college }>
                                <Button>
                                  { CONST.INSTITUTE_CODE.filter((value) => (value[0] == (college ? college : '0')))[0][1] }
                                </Button>
                              </Dropdown> <
      /Col> < /
    Row > <
      /Modal> < /
    div >
  )
}
}