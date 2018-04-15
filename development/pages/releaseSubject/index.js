import * as React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Input,
  Button,
  message
} from 'antd';
import './index.scss';
import {
  AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
const {
  TextArea
} = Input;
export default class ReleaseSubject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        'title': '',
        'describe': '',
        'demand': '',
        'user_id': ''
      },
      topic_status: {
        'isreview': 0,
        'notreview': 0,
        'rejectreview': 0,
      }
    }
    this.inputOnchange = this.inputOnchange.bind(this);
    this.submit = this.submit.bind(this);
    this.getTopicStatus = this.getTopicStatus.bind(this);
  }

  componentDidMount() {
    this.getTopicStatus();
  }

  getTopicStatus() {
    let user_id = sessionStorage.getItem("user_id");
    Ajax.get({
      url: 'api/topic/getTopicStatus',
      data: {
        user_id: user_id
      }
    }).then(result => {
      if (0 === +result.errno) {
        this.setState({
          topic_status: result.ret || {}
        })
      } else {
        message.error('服务器请求失败');
      }
    })
  }

  inputOnchange(e) {
    let obj = Object.assign({}, this.state.params);
    let name = e.target.name;
    switch (name) {
      case 'title':
        {
          obj.title = e.target.value;
          break;
        }
      case 'describe':
        {
          obj.describe = e.target.value;
          break;
        }
      case 'demand':
        {
          obj.demand = e.target.value;
          break;
        }
      default:
        break;
    }
    this.setState({
      params: obj
    })
  }

  submit() {
    let obj = Object.assign({}, this.state.params);
    obj.user_id = sessionStorage.getItem("user_id");
    Ajax.post({
      url: 'api/topic/addTopic',
      data: obj
    }).then(result => {
      if (0 === +result.errno) {
        message.success('发布成功, 请等待学院管理员审批');
        this.setState({
          params: {}
        });
        this.getTopicStatus();
      } else {
        message.error('服务器请求失败');
      }
    })
  }

  render() {
    const {
      topic_status
    } = this.state;
    const {
      title,
      describe,
      demand
    } = this.state.params;
    return (
      <div className="details-content">
        <div className="details-content-release">
          <Row
               type="flex"
               justify="space-around"
               className="details-content-release-title">
            <Col span={ 10 }>
              <div>
                <span>未审核 / 已审核 / 已拒绝</span>
              </div>
              <div>
                <span>{topic_status.notreview}</span>
                <span>/</span>
                <span>{topic_status.isreview}</span>
                <span>/</span>
                <span>{topic_status.rejectreview}</span>
              </div>
            </Col>
          </Row>
          <Row
               type="flex"
               justify="space-around"
               className="details-content-release-title">
            <Col span={ 3 }>
              论文题目
            </Col>
            <Col span={ 14 }>
              <Input
                     placeholder="必填"
                     onChange={ this.inputOnchange }
                     name="title"
                     value={ title } />
            </Col>
          </Row>
          <Row
               type="flex"
               justify="space-around"
               className="details-content-release-title">
            <Col span={ 3 }>
              论文描述
            </Col>
            <Col span={ 14 }>
              <TextArea
                        placeholder="必填"
                        autosize={ { minRows: 2, maxRows: 6 } }
                        onChange={ this.inputOnchange }
                        name="describe"
                        value={ describe } />
            </Col>
          </Row>
          <Row
               type="flex"
               justify="space-around"
               className="details-content-release-title">
            <Col span={ 3 }>
              论文要求
            </Col>
            <Col span={ 14 }>
              <TextArea
                        placeholder="必填"
                        autosize={ { minRows: 2, maxRows: 6 } }
                        onChange={ this.inputOnchange }
                        name="demand"
                        value={ demand } />
            </Col>
          </Row>
          <p>
            <Button
                    type="primary"
                    onClick={ this.submit }>
              提交至学院管理员审批
            </Button>
          </p>
        </div>
      </div>
    )
  }
}