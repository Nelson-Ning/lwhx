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
export default class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'data': []
        };
        this.columns = [{
            title: '论文id',
            dataIndex: 'id',
            key: 'id',
            width: 150
        }, {
            title: '论文题目',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '教师用户名',
            dataIndex: 'teacher_name',
            key: 'teacher_name'
        }, {
            title: '学生用户名',
            dataIndex: 'student_name',
            key: 'student_name'
        }];
    }

    componentWillMount() {
        Ajax.get({
            url: 'api/topic/getCompleteTopic',
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    data: result.ret
                })
            } else {
                message.error('服务器请求失败');
            }
        })
    }

    render() {
        const {
            data
        } = this.state;
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={data}
                    rowKey="id" 
                    title={() => 
                        <div>
                            <span>互选结果查看</span>
                            
                        </div>
                        }
                />
            </div>
        )
    }
}