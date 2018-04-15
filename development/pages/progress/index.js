import * as React from 'react';
import {
    Row,
    Col,
    message,
    Table,
    Divider
} from 'antd';
export default class Progress extends React.Component {

    constructor(props) {
        super(props);
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


    render() {
        //const data = this.props.shenpi.data
        return (
            <div className="details-content">
                <Table 
                    className="data-table"
                    columns={this.columns} 
                    dataSource={null}
                    rowKey="id" 
                    title={() => 
                        <div>
                            <span>选题进度</span>
                            
                        </div>
                        }
                />
            </div>
        )
    }
}