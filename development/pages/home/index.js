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
        this.showNewsConent = this.showNewsConent.bind(this);
        this.modalOnCancel = this.modalOnCancel.bind(this);
        this.state = {
            "data" : [{
                "id": "1",
                "title": "阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算阿斯范德萨打算",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦"
            }, {
                "id": "2",
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦撒旦"
            }, {
                "id": "3",
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "id": "4",
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "id": "5",
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }, {
                "id": "6",
                "title": "21345678",
                "time": "2018年2月27日 11:29:01",
                "publisher": "2999",
                "content":"好久好久回"
            }],
            "visible": false,
            "content": "",
            "title":""
        }
    }


    showNewsConent(e){
        let id = e.target.id;
        let obj = this.state.data.filter( (value)=> value.id === id)
        this.setState({
            visible: true,
            content: obj[0].content,
            title: obj[0].title
        })
    }

    modalOnCancel(){
        this.setState({
            visible: false,
            content: '',
            title: ''
        })   
    }

    render() {
        const {data, title, content, visible} = this.state;
        return (
            <div className="details-content">
                <div className="details-content-home">
                    <Row type="flex" justify="space-around">
                        <Col span={22}>
                            <Card title="公告栏" bordered={false}>
                                <List
                                  size="large"
                                  bordered={false}
                                  dataSource={data}
                                  renderItem={item => (
                                        <List.Item>
                                            <div className="details-content-home-items">
                                                <div className="details-content-home-items-title"><a onClick={this.showNewsConent} id={item.id}>{item.title}</a></div>
                                                <div className="details-content-home-items-right"><span>发布人:</span><span>{item.publisher}</span><span>时间:</span><span>{item.time}</span></div>
                                            </div>

                                        </List.Item>
                                        )}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Modal
                        title = {title}
                        visible = {visible}
                        footer={null}
                        onCancel = {this.modalOnCancel}
                        okText="确认"
                        cancelText="取消"
                    >
                    {content}
                    </Modal>
                </div>
        </div>
        )
    }
}