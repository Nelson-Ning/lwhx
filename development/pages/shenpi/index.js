import * as React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Row,
    Col,
    message,
    Table,
    Divider
} from 'antd';
class Shenpi extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            width: 150
        }, {
            title: '论文题目',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '学生要求',
            dataIndex: 'requirement',
            key: 'requirement'
        }, {
            title: '操作',
            key: 'operation',
            width: 150,
            render: (text, record) => {
                return (
                    <span>
                        <a href="javascript: void(0)">同意</a>
                        <Divider type="vertical" />
                        <a href="javascript: void(0)">拒绝</a>
                    </span>
                )
            }
        }];
    }


    render() {
        const data = this.props.shenpi.data
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

function mapStateToProps(state) {
    let {
        Common,
        shenpi
    } = state;
    return {
        common: Common,
        shenpi: shenpi
    }
}

function mapDispatchToProps(dispatch) {
    // return {
    //     MemberListActions: bindActionCreators(MemberListActions, dispatch),
    // }
}
export default connect(mapStateToProps, null)(Shenpi);