import Top from "./header.js";
import Aside from "./aside.js";
import Bottom from "./footer.js";
import React, {
  Component
} from 'react';
import {
  Layout,
  Menu,
  Icon
} from 'antd';
const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import home from '../../pages/home/index.js';
import news from '../../pages/news/index.js';
import MemberList from '../../pages/memberlist/index.js'; 
import './style/common.scss';
const SubMenu = Menu.SubMenu;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }
  onCollapse(collapsed) {
    this.setState({
      collapsed
    });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Aside />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Top />
          </Header>
          <Content>
            <div className="layout-content" >
              <Switch>
                <Route exact path="/home" component={home}/>
                <Route exact path="/news" component={news}/>
                <Route exact path="/memberList" component={MemberList}/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Bottom />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}