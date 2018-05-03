import * as React from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    Table,
    Divider,
    Icon,
    Popover,
    Modal,
    Radio,
    Alert,
    message
} from 'antd';
import './index.scss';
import {
    AJAX,
    toTime
} from '../../utils/index.js';
const Ajax = new AJAX();
const RadioGroup = Radio.Group;
export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.getAllTopic = this.getAllTopic.bind(this);
        this.teacheronClick = this.teacheronClick.bind(this);
        this.teacherselect = this.teacherselect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            'beginday': '',
            'begintime': '',
            'endday': '',
            'endtime': '',
            'second': 5,
            'tips': [],
            'data': [],
            'visible': false,
            'student_data': []
        };
    }

    onClick(e) {
        let topic_id = e.target.getAttribute('topic_id');
        let teacher_id = e.target.getAttribute('teacher_id');
        let user_id = sessionStorage.getItem("user_id");
        let optional = e.target.getAttribute('optional');
        if (optional === "false") {
            message.error('当前不在选课日期');
            return;
        }
        Ajax.post({
            url: 'api/topic/selectedTopic',
            data: {
                "topic_id": topic_id,
                "teacher_id": teacher_id,
                "student_id": user_id
            },
        }).then(result => {
            if (0 === +result.errno) {
                if (result.ret.code == 200) {
                    message.success(result.ret.message);
                    this.getAllTopic();
                } else if (result.ret.code == 500) {
                    message.error(result.ret.message);
                    this.getAllTopic();
                }
            } else {
                message.error('服务器请求失败');
            }
        })
    }
    componentWillMount() {
        let college = sessionStorage.getItem("college");
        Ajax.get({
            url: 'api/college/getTime',
            data: {
                "college": college
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    tips: result.ret
                })
            } else {
                message.error('服务器请求失败');
            }
        }).then(() => {
            this.getAllTopic();
        });

    }
    getAllTopic() {
        let college = sessionStorage.getItem("college");
        Ajax.get({
            url: 'api/topic/getAllTopic',
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
    teacheronClick(e) {
        let topic_id = e.target.getAttribute('topic_id');
        this.setState({
            visible: true
        })
        Ajax.get({
            url: 'api/topic/getselectedStudent',
            data: {
                "topic_id": topic_id
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    student_data: result.ret
                })
            } else {
                message.error('服务器请求失败');
            }
        });
    }
    teacherselect(e) {
        let id = e.target.getAttribute('id');
        let topic_id = e.target.getAttribute('topic_id');
        this.setState({
            visible: false
        })
        Ajax.get({
            url: 'api/topic/getselectStudent',
            data: {
                "id": id,
                "topic_id": topic_id
            },
        }).then(result => {
            if (0 === +result.errno) {
                message.success('互选成功');
                this.getAllTopic();
            } else {
                message.error('服务器请求失败');
            }
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    render() {
        const {
            tips,
            data,
            visible,
            student_data
        } = this.state;
        let begintime = '';
        let endtime = '';
        let second = '';
        let display = tips.length !== 0 && tips[0].second;
        let optional = false;
        if (display) {
            begintime = tips[0].begintime;
            endtime = tips[0].endtime;
            second = tips[0].second;
            if (new Date(begintime) < new Date() && new Date() < new Date(endtime)) {
                optional = true;
            }
        }
        let columns = [{
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
            dataIndex: 'demand',
            key: 'demand',
        }, {
            title: '指导教师',
            dataIndex: 'username',
            key: 'username',
            width: 100,
            render: (text, record) => {
                const content = (
                    <div>
                        <p>教师名字:  {record.teacher_name}</p>
                        <p>教师简介:  {record.teacher_summary}</p>
                        <p>教师职级:  {record.teacher_title}</p>
                        <p>研究方向:  {record.teacher_good}</p>
                    </div>
                )
                return (
                    <Popover content={content} title="信息详情" trigger="hover">
                        <span>
                            <a href="javascript: void(0)">{text}</a>
                        </span>
                    </Popover>
                )
            }
        }, {
            title: '已选/可选',
            dataIndex: 'optional_num',
            key: 'optional_num',
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
                let level = sessionStorage.getItem("level");
                return (
                    <span>
                        <a href="javascript: void(0)" topic_id={record.id} teacher_id={record.teacher_id} onClick={level === 'C' ? this.teacheronClick: this.onClick} optional={optional.toString()} style={{'color': optional ? '#1890ff' : '#ccc'}}>{level === 'C' ? '查看已选择学生': '选中'}</a>
                    </span>
                )
            }
        }]
        let student_columns = [{
            title: '学生名字',
            dataIndex: 'username',
            key: 'username',
            width: 100
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <span>
                        <a href="javascript: void(0)" id={record.id} topic_id={record.topic_id} onClick={this.teacherselect}>选中</a>
                    </span>
                )
            }
        }]
        return (
            <div className="details-content">
                <Alert
                  message="选题时间"
                  description={`本学院管理员已经开放选题, 开始时间为${begintime} 结束时间为：${endtime} 选题间隔为：${second} 分钟 。请大家做好准备`}
                  type="info"
                  showIcon
                  closable
                  style={{'display': display ? 'block': 'none'}}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    className="data-table"
                >
                </Table>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                <Table
                    columns={student_columns}
                    dataSource={student_data}
                    rowKey="user_id"
                    className="data-table"
                >
                </Table>
                </Modal>
            </div>
        )
    }

}