import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Input, Button, Table, Divider, Icon, Popover, Modal, Radio } from 'antd';
import './index.scss';
const RadioGroup = Radio.Group;
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'beginday': '',
            'begintime': '',
            'endday': '',
            'endtime': '',
            'second': 5,
        };
        this.columns = [{
            title: '论文ID',
            dataIndex: 'id',
            key: 'id',
            width: 100
        }, {
            title: '论文题目',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '论文描述',
            dataIndex: 'describe',
            key: 'describe',
        }, {
            title: '论文要求',
            dataIndex: 'requirement',
            key: 'requirement',
        }, {
            title: '指导教师',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 100,
            render: (text, record) => {
                const content = (
                <div>
                        <p>教师名字:  {text.teacher_name}</p>
                        <p>教师简介:  {text.teacher_introduction}</p>
                        <p>教师职级:  {text.teacher_title}</p>
                        <p>研究方向:  {text.teacher_direction}</p>
                      </div>
                )
                return (
                    <Popover content={content} title="信息详情" trigger="hover">
                        <span>
                            <a href="javascript: void(0)">{text.teacher_name == "" ? text.username : text.teacher_name}</a>
                        </span>
                    </Popover>
                )
            }
        }, {
            title: '已选/可选',
            dataIndex: 'num',
            key: 'num',
            width: 100,
            render: (text, record) => {
                return (
                    <span>
                        {text} / 3
                    </span>
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return (
                    <span>
                        <a href="javascript: void(0)">选中</a>
                    </span>
                )
            }
        }]
    }


    render() {
        const {data} = this.props.main;
        return (
            <div className="details-content">
                <Table
            columns={this.columns}
            dataSource={data}
            rowKey="id"
            className="data-table"
            title={() => {
                return (
                    <div style={{
                        'overflow': 'hidden'
                    }}>
                        <div className="details-content-main-title">
                            <div className="details-content-main-title-left">
                                <Input className="index-content-input" onChange={null} />
                                <RadioGroup className="details-content-main-title-left-radio" onChange={null} >
                                    <Radio key="name" value="name">论文id</Radio>
                                    <Radio key="id" value="id">教师名字</Radio>
                                </RadioGroup>    
                            </div>
                            <Button type="primary" className="details-content-main-title-right" onClick={null}>搜索</Button>
                        </div>
                    </div>
                )
            }}
            ></Table> 
        </div>
        )
    }

}

function mapStateToProps(state) {
    let {Common, Main} = state;
    return {
        common: Common,
        main: Main
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         MemberListActions: bindActionCreators(MemberListActions, dispatch),
//     }
// }
export default connect(mapStateToProps, null)(Main);