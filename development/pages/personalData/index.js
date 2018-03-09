import * as React from 'react';
import moment from 'moment';
import {
    Row,
    Col,
    Input,
    Button
} from 'antd';
export default class PersonalData extends React.Component {

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
                        <Col span={3}>姓名</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>个人简介</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>职称</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>擅长方向</Col>
                        <Col span={14}>
                            <Input />
                        </Col>
                    </Row>
                    <p>
                        <Button type="primary" onClick={null}>保存</Button>
                    </p>
                </div>
            </div>
        )
    }
}