import * as React from 'react';
import {
    Row,
    Col,
    message,
    Table,
    Divider
} from 'antd';
import {
    AJAX
} from '../../utils/index.js';
const Ajax = new AJAX();
export default class Shenpi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                id: '',
                isreview: ''
            }
        }
        this.columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: 150
        }, {
            title: '论文题目',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '论文描述',
            dataIndex: 'describe',
            key: 'describe'
        }, {
            title: '学生要求',
            dataIndex: 'demand',
            key: 'demand'
        }, {
            title: '操作',
            key: 'operation',
            width: 150,
            render: (text, record) => {
                return (
                    <span>
                        <a href="javascript: void(0)" id= {record.id} name="1" onClick={this.changeTopicStatus}>同意</a>
                        <Divider type="vertical" />
                        <a href="javascript: void(0)" id= {record.id} name="0" onClick={this.changeTopicStatus}>拒绝</a>
                    </span>
                )
            }
        }];
        this.getTopic = this.getTopic.bind(this);
        this.changeTopicStatus = this.changeTopicStatus.bind(this);
    }

    changeTopicStatus(e) {
        let obj = {};
        obj.isreview = e.target.getAttribute('name');
        obj.id = e.target.getAttribute('id');
        Ajax.post({
            url: 'api/topic/changeTopicStatus',
            data: obj
        }).then(result => {
            if (0 === +result.errno) {
                message.success('审批成功');
                this.getTopic();
            } else {
                message.error('服务器请求失败');
            }
        });
    }

    componentDidMount() {
        this.getTopic();
    }

    getTopic() {
        const college = sessionStorage.getItem("college");
        Ajax.get({
            url: 'api/topic/getTopic',
            data: {
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

    render() {
        const data = this.state.data
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={data}
                    rowKey="id" 
                    title={() => 
                        <div>
                            <span>教师选题审批</span>
                            
                        </div>
                        }
                />
            </div>
        )
    }
}