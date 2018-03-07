import * as React from 'react';
import moment from 'moment';
import {
    Row,
    Col,
    Input,
    Button
} from 'antd';
import './index.scss';
export default class ReleaseSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'beginday': '',
            'begintime': '',
            'endday': '',
            'endtime': '',
            'second': 5,
        }
    }


    render() {
        return (
            <div className="details-content">
                <div className="details-content-release">
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>论文题目</Col>
                        <Col span={14}>
                            <Input placeholder="必填"/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>论文描述</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>论文要求</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <p>
                        <Button type="primary" onClick={null}>提交至学院管理员审批</Button>
                    </p>
                </div>
            </div>
        )
    }
}