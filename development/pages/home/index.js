import * as React from 'react';
import {
    List,
    Row,
    Col,
    Card,
    Modal
} from 'antd';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    fromJS
} from 'immutable';
import './index.scss';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "data" : [{
                "title": "阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }]
        }
    }

    render() {
        return (
            <div className="details-content">
                <div className="details-content-home">
                    <Row type="flex" justify="space-around">
                        <Col span={22}>
                            <Card title="Card title" bordered={false}>
                                <List
                                  size="large"
                                  bordered={false}
                                  dataSource={this.state.data}
                                  renderItem={item => (
                                        <List.Item>
                                            <div className="details-content-home-items">
                                                <div className="details-content-home-items-title"><a>{item.title}</a></div>
                                                <div className="details-content-home-items-right"><span>发布人:</span><span>{item.publisher}</span><span>时间:</span><span>{item.time}</span></div>
                                            </div>

                                        </List.Item>
                                        )}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Modal
                        title = "查看消息"
                        visible = {true}
                        onOk = {null}
                        onCancel = {null}
                        okText="确认"
                        cancelText="取消"
                    >
                    </Modal>
                </div>
        </div>
        )
    }
}