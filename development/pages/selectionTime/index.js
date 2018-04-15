import * as React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  message,
  DatePicker,
  TimePicker,
  Button,
  Input,
  Modal
} from 'antd';
import './index.scss';
import {
  AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
moment.locale('zh-cn');
const confirm = Modal.confirm;
export default class SelectionTime extends React.Component {

  constructor(props) {
    super(props);
    this.onsubmit = this.onsubmit.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.state = {
      'beginday': '',
      'begintime': '',
      'endday': '',
      'endtime': '',
      'second': 5,
    }
  }

  DatePickeronChange(id, val) {
    if (id === 'begin') {
      this.setState({
        beginday: val.format('YYYY-MM-DD')
      })
    } else {
      this.setState({
        endday: val.format('YYYY-MM-DD')
      })
    }
  }

  TimePickeronChange(id, val) {
    if (id === 'begin') {
      this.setState({
        begintime: val.format('LTS')
      })
    } else {
      this.setState({
        endtime: val.format('LTS')
      })
    }
  }

  onsubmit() {
    const {
      beginday,
      begintime,
      endday,
      endtime,
      second
    } = this.state
    for (var props in this.state) {
      if (this.state[props] === '') {
        message.error('请补全发布信息 发布失败');
        return;
      }
    }
    let obj = {};
    obj.begintime = beginday + ' ' + begintime;
    obj.endtime = endday + ' ' + endtime;
    this.showConfirm();
  }

  inputOnChange(e) {
    const {
      value
    } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        second: value
      })
    }
  }

  showConfirm() {
    let _this = this;
    confirm({
      title: '请确定发布时间信息（本操作不可撤回）',
      content: (
        <div>
        <p>
          1. 将会通知所有本学院的学生和教师
        </p>
        <p>
          2. 请确认是否总论文题目是否大于学生总数量
        </p>
      </div>
      ),
      onOk() {
        let obj = {};
        obj.begintime = _this.state.beginday + ' ' + _this.state.begintime;
        obj.endtime = _this.state.endday + ' ' + _this.state.endtime;
        obj.second = _this.state.second;
        obj.id = sessionStorage.getItem("user_id");
        Ajax.post({
          url: 'api/college/addTime',
          data: obj
        }).then(result => {
          if (0 === +result.errno) {
            message.success('选课时间发布成功');
            let obj_ = {};
            obj_.publisher = sessionStorage.getItem("user_id");
            obj_.content = `同学们好, 学院管理员已经将选题时间更新为 开始时间： ${obj.begintime} 结束时间： ${obj.endtime}  每轮次时间： ${obj.second} 分钟,请及时选题！`;
            obj_.receiver = `c_${sessionStorage.getItem("college")}`;
            obj_.id = '';
            Ajax.post({
              url: 'api/message/callMessage',
              data: obj_
            }).then(result => {
              if (0 === +result.errno) {
                message.success('消息已发送');
              } else {
                message.error('服务器请求失败');
              }
            })
          } else {
            message.error('服务器请求失败');
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div className="details-content">
        <div className="details-content-selTime">
          <p>
            开始时间设置
          </p>
          <div className="details-content-div">
            <div className="details-content-selTime-left">
              <DatePicker
                          onChange={ this.DatePickeronChange.bind(this, 'begin') }
                          format={ dateFormat } />
            </div>
            <div className="details-content-selTime-right">
              <TimePicker
                          allowEmpty={ false }
                          onChange={ this.TimePickeronChange.bind(this, 'begin') }
                          defaultOpenValue={ moment('00:00:00', 'HH:mm:ss') } />
            </div>
          </div>
          <p>
            结束时间设置
          </p>
          <div className="details-content-div">
            <div className="details-content-selTime-left">
              <DatePicker
                          onChange={ this.DatePickeronChange.bind(this, 'end') }
                          format={ dateFormat } />
            </div>
            <div className="details-content-selTime-right">
              <TimePicker
                          allowEmpty={ false }
                          onChange={ this.TimePickeronChange.bind(this, 'end') }
                          defaultOpenValue={ moment('00:00:00', 'HH:mm:ss') } />
            </div>
          </div>
          <p>
            每轮互选时间
          </p>
          <Row
               type="flex"
               justify="center"
               style={ { 'lineHeight': '32px' } }>
            <Col span={ 3 }>
              <Input
                     onChange={ this.inputOnChange }
                     placeholder="5"
                     maxLength="2"
                     value={ this.state.second } />
            </Col>
            <Col span={ 3 }>
              <span>分钟</span>
            </Col>
          </Row>
          <p>
            <Button
                    type="primary"
                    onClick={ this.onsubmit }>
              提交
            </Button>
          </p>
        </div>
      </div>
    )
  }
}