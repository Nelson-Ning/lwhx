import React, {
	Component
} from "react";
import './header.scss';
import {
	Menu,
	Icon,
	Layout,
	Card,
	Button,
	Modal,
	Input
} from 'antd';
import {
	Link
} from 'react-router-dom'
const {
	Header
} = Layout
const SubMenu = Menu.SubMenu
const {
	TextArea
} = Input;
export default class Top extends Component {
	constructor(props) {
		super(props);
		this.state = {
			IsLogin: true,
			messageBox_visible: false,
			LoginBox_visible: false,
			LoginBox_Loading: false,
			messageBox_reply: false,
			messageReply_content: null,
			message: [{
				Publisher: '小王',
				content: '你做的不错'
			}, {
				Publisher: '小张',
				content: '你做很差asdasd你做很差asdasd你做很差asdasd你做很差asdasd你做很差asdasd'
			}],
			message_details: {
				Publisher: null,
				content: null
			}
		};
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.showLoginModal = this.showLoginModal.bind(this);
		this.doLogin = this.doLogin.bind(this);
		this.messageReply = this.messageReply.bind(this);
		this.getmessageReply = this.getmessageReply.bind(this);
	}

	showModal(e) {
		this.setState({
			messageBox_visible: true,
			message_details: this.state.message[e.key]
		});
	}

	handleCancel() {
		this.setState({
			messageBox_visible: false,
			LoginBox_visible: false,
			LoginBox_Loading: false,
			messageBox_reply: false
		})
	}

	showLoginModal(e) {
		this.setState({
			LoginBox_visible: true
		})
	}

	doLogin() {
		this.setState({
			IsLogin: true,
			LoginBox_Loading: true
		})
	}

	messageReply(e) {
		let replyFlag = this.state.messageBox_reply; //true是回复状态,false是展示状态
		this.setState({
			messageBox_reply: true
		})
		if (replyFlag) {
			this.setState({
				messageBox_reply: false
			})
			console.log("回复信息" + this.state.messageReply_content)
		}
	}

	getmessageReply(e) {
		this.setState({
			messageReply_content: e.target.value
		})
	}
	render() {
		return (
			<Layout>
			<Header>
			  <div className='container'>
				<div className='user-menu-left' style={{"display": this.state.IsLogin == true ? 'block' : 'none'}}>
					<ul>
						<li>                
							<Menu mode="horizontal" class='user-menu-zx'>
                    			<SubMenu title={<span><Icon type="user" />个人中心</span>} >
									<Menu.Item key="key1">个人资料设置</Menu.Item>
									<Menu.Item key="key2">个人资料设置</Menu.Item>
									<Menu.Item key="key3">个人资料设置</Menu.Item>
									<Menu.Item key="key4">个人资料设置</Menu.Item>
                    			</SubMenu>
                			</Menu>
                		</li>
						<li>                
							<Menu mode="horizontal" onClick={this.showModal}>
                    			<SubMenu title={<span><Icon type="message" />消息(<span style={{'color':'red'}}>{this.state.message.length}</span>)</span>} >
                    					{
											this.state.message.map((message,index) => (<Menu.Item key={index} onTitleClick={this.showModal}>{message.Publisher}给您发送信息</Menu.Item>))
                    					}
                    			</SubMenu>
                			</Menu>
                		</li>
					</ul>
				</div>
				<div className='user-menu-right'>
					{this.state.hasLogin == true ? <span>欢迎XX登录</span> : <span>欢迎您进入系统！ 请先<a href="javascript:void(0)" onClick={this.showLoginModal} id='login'>登陆</a></span>}
				</div>
				<div className='message-dialog'>
					<Modal
			          title={"来自" + this.state.message_details.Publisher + "的消息"}
			          visible={this.state.messageBox_visible}
			          onOk={this.messageReply}
			          onCancel={this.handleCancel}
			          okText={this.state.messageBox_reply == true ? '发送' : '回复'}
			          cancelText="取消"
			        >
			        {this.state.messageBox_reply == true ? <TextArea  rows={4} onChange={this.getmessageReply}/> : <p>{this.state.message_details.content}</p>}
       				</Modal>
				</div>
				<div className='login-dialog'>
					<Modal
			          title="欢迎登录"
			          visible={this.state.LoginBox_visible}
			          onOk={this.doLogin}
			          onCancel={this.handleCancel}
			          confirmLoading={this.state.LoginBox_Loading}
			          okText="登录"
			          cancelText="取消"
			        >	
					<div className='login-dialog-content'>
						<div className='login-dialog-content-col'>
						<span style={{'float':'left'}}>用户名</span>
			        	<Input
			        	 placeholder="Enter your username"
       					 prefix={<Icon type="user" />}
			        	/>
			        	</div>
						<div className='login-dialog-content-col'>
			        	<span>密&nbsp;&nbsp;&nbsp;码</span>
			        	<Input
			        	 type="password"
			        	 placeholder="Enter your password"
       					 prefix={<Icon type="lock" />}
			        	/>
			        	</div>
			        	</div>
			        </Modal>

				</div>
			  </div> < /Header>
			  <div className="container-menu">
				<div className="header-menu">
			  	<div className="header-menu-left">
			  		<div className="header-menu-left-logo">
    					<a href="javascript:void(0)"></a>
    				</div>
			  	</div>
			  	<div className="header-menu-right">
    				<ul>
    					<li><Link to="/index" >首页</Link></li>
    					<li><a href="javascript:void(0)">互选规则</a></li>
    					<li><a href="javascript:void(0)">互选中心</a></li>
    				</ul>
    				</div>
			  </div>
			  <div className="header-menu-bottom"></div>
			  </div>


 </Layout>
		)
	}
}