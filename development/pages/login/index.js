import * as React from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {
    Spin,
    Form,
    Input,
    Button,
    message,
    Icon,
    Checkbox,
    Tooltip,
    Divider,
    Popover,
    notification
} from 'antd';
import {
    fromJS
} from 'immutable';
import {
    LoginActions
} from './actions.js';
import {
    CommonActions
} from '../../redux/action/index.js';
import './login.scss';
import {
    isIE,
    IEVersion,
    AJAX,
    setCookie,
    getCookie,
    removeCookie
} from '../../utils/index.js';
const FormItem = Form.Item;
const Ajax = new AJAX();
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
            loginBtnText: '登录'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            doLogin
        } = this.props.LoginActions;
        const {
            changeLoading
        } = this.props.CommonActions;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.doLogin(values);
                changeLoading(true);
                //this.props.history.push('/home');
            }
        });
    }

    componentWillMount() {
        if (getCookie('token')) {
            let hash = location.hash.split('?')
            if (hash[1] == 'from=logout') {
                removeCookie('token');
            } else {
                Ajax.get({
                    url: 'api/user/judgeToken',
                }).then(result => {
                    if (0 === +result.errno) {
                        if (result.ret.userInfo.code === 200) {
                            const {
                                name,
                                level,
                                message
                            } = result.ret.userInfo;
                            const userInfo = fromJS(this.props.common.userInfo).merge({
                                'name': name,
                                'level': level,
                                //'message': message
                            })
                            this.props.CommonActions.changeUserInfo(userInfo.toJS());
                            this.props.history.push('/home');
                        }
                    }
                })
            }
        }
    }

    doLogin(value) {
        const {
            changeLoading
        } = this.props.CommonActions;
        Ajax.post({
            url: 'api/user/doLogin',
            data: {
                "username": value.username,
                "password": value.password
            },
        }).then(result => {
            if (0 === +result.errno) {
                changeLoading(false);
                const code = result.ret.userInfo.code
                if (code === 403) {
                    message.error(result.ret.userInfo.tip)
                } else if (code === 200) {
                    const {
                        name,
                        level,
                        message
                    } = result.ret.userInfo;
                    const userInfo = fromJS(this.props.common.userInfo).merge({
                        'name': name,
                        'level': level,
                        //'message': message
                    })
                    this.props.CommonActions.changeUserInfo(userInfo.toJS());
                    this.props.history.push('/home');
                } else {
                    message.error('服务器请求失败');
                }
            } else {
                console.log(result.errmsg)
            }
        }, e => {
            message.error('服务器请求失败');
        })
    }

    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        const args = {
            message: '浏览器兼容性警告',
            description: '您正在使用的浏览器版本过低，将不能正常浏览和使用本系统',
            duration: 0,
        };
        isIE() ? notification.warning(args) : '';
        const forgot_content = (
            <div>
                忘记密码请联系：撒旦撒旦
            </div>
        );
        const guide_content = (
            <div>
                登录指引
            </div>
        );
        return (
            <div className="login-container">
                <div className="login-content">
                    <Spin tip="载入中..." spinning={this.props.loading}>
                        <div className="login-logo">
                            <img src={"https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"} />
                            <span>Ant Design</span>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                                </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                                <Popover overlayClassName="popover-content" content={forgot_content} title="忘记密码" trigger="hover">
                                    <a className="login-form-forgot" href="javascript: void(0)">忘记密码</a>
                                </Popover>
                                <span className="login-form-forgot">|</span>
                                <Popover overlayClassName="popover-content" content={forgot_content} title="登录指引" trigger="hover">
                                    <a className="login-form-forgot" href="javascript: void(0)">登录指引</a>
                                </Popover>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                        <div className="login-account" style={{'display': 'block'}}>
                        <Tooltip title="测试紧急公告--关于关闭的通知关于关闭的通知关于关闭的通知关于关闭的通知关于关闭的通知" placement="top" arrowPointAtCenter={true}>
                            <div className="login-account-list">
                                <img src="http://xsxk.hlju.edu.cn/xsxk/images/news.gif" alt="通知" />
                                <a>测试紧急公告--关于本系统开发中的通知</a>
                            </div>
                        </Tooltip>   
                        </div>
                    </Spin>
                </div>
            </div>
        )
    }
}

const LoginForm = Form.create()(Login);

function mapStateToProps(state) {
    let {
        Login,
        Common
    } = state;
    return {
        loading: Common.loading,
        loginInfo: Login.loginInfo,
        common: Common
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CommonActions: bindActionCreators(CommonActions, dispatch),
        LoginActions: bindActionCreators(LoginActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);