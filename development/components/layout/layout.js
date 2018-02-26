import Top from "./header.js";
import Aside from "./aside.js";
import Bottom from "./footer.js";
import React, {
  Component
} from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon
} from 'antd';
const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
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
    console.log(this.props);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Aside />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Top />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
              {this.props.children}
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