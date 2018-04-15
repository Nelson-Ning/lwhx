import * as React from 'react';
import {
  List,
  Row,
  Col,
  Card,
  Modal,
  message
} from 'antd';
import {
  fromJS
} from 'immutable';
import {
  AJAX
} from '../../utils/index.js';
import './index.scss';
const Ajax = new AJAX();
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.showNewsConent = this.showNewsConent.bind(this);
    this.modalOnCancel = this.modalOnCancel.bind(this);
    this.state = {
      "message": [],
      "visible": false,
      "content": "",
      "title": ""
    }
  }

  componentDidMount() {
    let level = sessionStorage.getItem("level");
    let channel = '';
    switch (level) {
      case 'A':
        {
          channel = [1, 2];
          break;
        };
      case 'B':
        {
          channel = [1, 3];
          break;
        };
      case 'C':
        {
          channel = [1, 4];
          break;
        };
      case 'D':
        {
          channel = [1, 5];
          break;
        };
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
          message: result.ret || []
        })
      } else {
        message.error('服务器请求失败');
      }
    });
  }

  showNewsConent(e) {
    let id = e.target.id;
    let obj = this.state.message.filter((value) => value.id == id);
    this.setState({
      visible: true,
      content: obj[0].content,
      title: obj[0].title
    })
  }

  modalOnCancel() {
    this.setState({
      visible: false,
      content: '',
      title: ''
    })
  }

  render() {
    const {
      title,
      content,
      visible,
      message
    } = this.state;
    return (
      <div className="details-content">
        <div className="details-content-home">
          <Row
               type="flex"
               justify="space-around">
            <Col span={ 22 }>
              <Card
                    title="公告栏"
                    bordered={ false }>
                <List
                      size="large"
                      bordered={ false }
                      dataSource={ message }
                      renderItem={ item => (
                                     <List.Item>
                                       <div className="details-content-home-items">
                                         <div className="details-content-home-items-title">
                                           <a
                                              onClick={ this.showNewsConent }
                                              id={ item.id }>
                                             { item.title }
                                           </a>
                                         </div>
                                         <div className="details-content-home-items-right">
                                           <span>发布人:</span><span>{ item.publisher }</span><span>时间:</span><span>{ item.time }</span>
                                         </div>
                                       </div> <
      /List.Item>
    )
  }
  /> < /
  Card > <
    /Col> < /
  Row > <
    Modal
  title = {
    title
  }
  visible = {
    visible
  }
  footer = {
    null
  }
  onCancel = {
    this.modalOnCancel
  }
  okText = "确认"
  cancelText = "取消" > {
      content
    } <
    /Modal> < /
  div > <
    /div>
)
}
}