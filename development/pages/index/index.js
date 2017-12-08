import React, {
	Component
} from "react";

import {
	Layout,
	Menu,
	Calendar,
	Card,
	Button,
	Modal
} from 'antd';
const {
	Header,
	Content,
	Footer,
} = Layout;

import './index.scss';

let lwDate = [{
	begin: '2017-11-16',
	end: '2017-11-19',
	times: 1
}]

export default class index extends Component {
	constructor(props) {
		super(props);
		this.dateCellRender = this.dateCellRender.bind(this);
		this.getListData = this.getListData.bind(this);
		this.showNotice = this.showNotice.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.state = {
			notice_visible: false,
			notice_item: {
				PublishTime: null,
				title: null,
				content: null
			},
			notice: [{
				PublishTime: '2017年11月16日',
				title: '关于查询竞买2017-2018学年第二学期课程选课积分奖惩计算表的通知',
				content: '<p>1212</p>'
			}, {
				PublishTime: '2017年11月16日',
				title: '关于启动2017级新生选课培训工作的通知',
				content: '<p>1212</p>'
			}, {
				PublishTime: '2017年11月16日',
				title: '关于重修大学体育课程的注意事项',
				content: '<p>1212</p>'
			}, {
				PublishTime: '2017年11月16日',
				title: '关于选课系统8月27日压力测试的通知',
				content: '<p>1212</p>'
			}, {
				PublishTime: '2017年11月16日',
				title: '试听阶段周一、周二抢课开始时间由12:40改为晚5:30',
				content: '<p>1212</p>'
			}]
		}
	}

	getListData(value) {
		//console.log(lwDate)

		let listData;
		switch (value.date()) {
			case 14:
				listData = [{
					type: 'first',
					content: 'This is warning event.'
				}, {
					type: 'first',
					content: 'This is usual event.'
				}, ];
				break;
			default:
		}
		return listData || [];
	}


	dateCellRender(value) {
		const listData = this.getListData(value);
		console.log(listData);

	}

	showNotice(e) {
		this.setState({
			notice_visible: true,
			notice_item: this.state.notice[e.target.parentNode.getAttribute("data-key")]
		})
	}

	handleCancel() {
		this.setState({
			notice_visible: false
		})
	}

	render() {
		return (
			<Layout>
			 		<Content style={{ padding: '0 50px', marginTop: 64 }}>
			   		<div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-content">
			   			<div className="content-content">
			   				<div className="cols-1-gg">
			   					<Card  title="公告栏" extra={<a href="#">More</a>} noHovering={true} bordered={false}>
			   						<ul className="list-group no-border">
			   							{
											this.state.notice.map((message, index) => (<li key={index} data-key={index} onClick={this.showNotice} className="list-group-item"><img style={{'float':'left','marginTop':'15px'}} src="http://xsxk.hlju.edu.cn/xsxk/images/news.gif" alt="通知" /><span className="notice_title">{message.title}</span><span>{message.PublishTime}</span></li>))
			   							}			   							
			   						</ul>
							    </Card>
							</div>
			   				<div className="cols-1-rl">
								<Card title="日历"  noHovering={true} bordered={false}>
			   					 <Calendar fullscreen={false} />
			   					</Card>
			   				</div>
			   			</div>
			   		</div>
			 		</Content>
			 		<Modal
			          title="公告详情"
			          okText="确定"
			          cancelText="取消"
			          onOk={this.handleCancel}
			          onCancel={this.handleCancel}
			          visible={this.state.notice_visible}
			        >
			        {this.state.notice_item.content}
			        </Modal>
			   <Footer style={{ textAlign: 'center' }}>
			     All Rights Reserved
			   </Footer>
					</Layout>
		)
	}

}