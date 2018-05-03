import * as React from 'react';
import moment from 'moment';
import {
    Row,
    Col,
    Input,
    Button,
    message
} from 'antd';
import {
    AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
export default class PersonalData extends React.Component {

    constructor(props) {
        super(props);
        this.inputonChange = this.inputonChange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            params: {
                'user_id': '',
                'name': '',
                'summary': '',
                'title': '',
                'good': ''
            }
        };
    }

    inputonChange(e) {
        let name = e.target.getAttribute('name');
        let user_id = sessionStorage.getItem("user_id");
        const params = Object.assign({}, this.state.params);
        params.user_id = user_id;
        switch (name) {
            case 'name':
                {
                    params.name = e.target.value;
                    break;
                }
            case 'summary':
                {
                    params.summary = e.target.value;
                    break;
                }
            case 'title':
                {
                    params.title = e.target.value;
                    break;
                }
            case 'good':
                {
                    params.good = e.target.value;
                    break;
                }
            default:
                break;
        }
        this.setState({
            params: params
        })
    }

    componentWillMount() {
        let user_id = sessionStorage.getItem("user_id");
        Ajax.get({
            url: 'api/user/getTeacherInformation',
            data: {
                user_id: user_id
            }
        }).then(result => {
            if (0 === +result.errno) {
                if (result.ret.length === 1) {
                    const params = Object.assign({}, this.state.params);
                    params.name = result.ret[0].name;
                    params.summary = result.ret[0].summary;
                    params.good = result.ret[0].good;
                    params.title = result.ret[0].title;
                    this.setState({
                        params: params
                    })
                }
            } else {
                message.error('服务器请求失败');
            }
        })
    }
    onsubmit() {
        const params = Object.assign({}, this.state.params);
        Ajax.post({
            url: 'api/user/addTeacherInformation',
            data: params
        }).then(result => {
            if (0 === +result.errno) {
                message.success('更新成功');
            } else {
                message.error('服务器请求失败');
            }
        })
    }

    render() {
        const {
            name,
            summary,
            title,
            good
        } = this.state.params;
        return (
            <div className="details-content">
                <div className="details-content-release">
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>姓名</Col>
                        <Col span={14}>
                            <Input name="name" onChange={this.inputonChange} value={name}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>个人简介</Col>
                        <Col span={14}>
                            <Input name="summary" onChange={this.inputonChange} value={summary}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>职称</Col>
                        <Col span={14}>
                            <Input name="title" onChange={this.inputonChange} value={title}/>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" className="details-content-release-title">
                        <Col span={3}>擅长方向</Col>
                        <Col span={14}>
                            <Input name="good" onChange={this.inputonChange} value={good}/>
                        </Col>
                    </Row>
                    <p>
                        <Button type="primary" onClick={this.onsubmit}>保存</Button>
                    </p>
                </div>
            </div>
        )
    }
}