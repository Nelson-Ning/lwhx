import * as React from 'react';
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
            loginBtnText: '登录',
            message: [],
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.doLogin(values);
            }
        });
    }

    componentDidMount() {
        if (getCookie('token')) {
            let hash = location.hash.split('?')
            if (hash[1] == 'from=logout') {
                removeCookie('token');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('level');
                sessionStorage.removeItem('college');
                sessionStorage.removeItem('user_id');
            }
        }
        let user_id = sessionStorage.getItem("user_id");
        let level = sessionStorage.getItem("level");
        let college = sessionStorage.getItem("college");
        let name = sessionStorage.getItem("name");
        if (user_id && level && college && name) {
            this.props.history.push('/home');
            message.success('自动登陆');
            return
        }
        Ajax.get({
            url: 'api/notice/getNotice',
            data: {
                "channel": 0
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    message: result.ret[0] || []
                })
            } else {
                message.error('服务器请求失败');
            }
        });
    }



    doLogin(value) {
        Ajax.post({
            url: 'api/user/doLogin',
            data: {
                "username": value.username,
                "password": value.password
            },
        }).then(result => {
            if (0 === +result.errno) {
                this.setState({
                    loading: false
                })
                const code = result.ret.userInfo.code
                if (code === 403) {
                    message.error(result.ret.userInfo.tip)
                } else if (code === 200) {
                    const {
                        name,
                        level,
                        college,
                        user_id
                    } = result.ret.userInfo;
                    sessionStorage.setItem("name", name);
                    sessionStorage.setItem("level", level);
                    sessionStorage.setItem("college", college);
                    sessionStorage.setItem("user_id", user_id);
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
        const {
            title,
            content
        } = this.state.message;
        const {
            loading
        } = this.state;
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
          <Spin
                tip="载入中..."
                spinning={ loading }>
            <div className="login-logo">
              <img src={ "https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" } />
              <span>Ant Design</span>
            </div>
            <Form
                  onSubmit={ this.handleSubmit }
                  className="login-form">
              <FormItem>
                { getFieldDecorator('username', {
                    rules: [{
                      required: true,
                      message: '请输入用户名'
                    }],
                  })(
                    <Input
                           prefix={ <Icon
                                          type="user"
                                          style={ { color: 'rgba(0,0,0,.25)' } } /> }
                           placeholder="用户名" />
                  ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: '请输入密码'
                    }],
                  })(
                    <Input
                           prefix={ <Icon
                                          type="lock"
                                          style={ { color: 'rgba(0,0,0,.25)' } } /> }
                           type="password"
                           placeholder="密码" />
                  ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>
                      记住我
                    </Checkbox>
                  ) }
                <Popover
                         overlayClassName="popover-content"
                         content={ forgot_content }
                         title="忘记密码"
                         trigger="hover">
                  <a
                     className="login-form-forgot"
                     href="javascript: void(0)">忘记密码</a>
                </Popover>
                <span className="login-form-forgot">|</span>
                <Popover
                         overlayClassName="popover-content"
                         content={ forgot_content }
                         title="登录指引"
                         trigger="hover">
                  <a
                     className="login-form-forgot"
                     href="javascript: void(0)">登录指引</a>
                </Popover>
                <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>
            <div
                 className="login-account"
                 style={ { 'display': 'block' } }>
              <Tooltip
                       title={ content }
                       placement="top"
                       arrowPointAtCenter={ true }>
                <div className="login-account-list">
                  <img
                       src="http://xsxk.hlju.edu.cn/xsxk/images/news.gif"
                       alt="通知" />
                  <a>
                    { title }
                  </a>
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

export default LoginForm;