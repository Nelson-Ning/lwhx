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
import SelectionTime from '../../pages/selectionTime/index.js';
import ShenPi from '../../pages/shenpi/index.js';
import Progress from '../../pages/progress/index.js';
import ReleaseSubject from '../../pages/releaseSubject/index.js';
import personalData from '../../pages/personalData/index.js';
import Main from '../../pages/main/index.js';
import './style/common.scss';
const SubMenu = Menu.SubMenu;
export default class Mylayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeAside: false,
        }
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(changeAside) {
        this.setState({
            changeAside: !changeAside
        });
    }

    render() {
        return (
            <Layout>
        <Aside onCollapse = {this.onCollapse}/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, transition: 'all 0.3s', marginLeft: this.state.changeAside ? '80px' : '200px'  }}>
            <Top />
          </Header>
          <Content style={{ transition: 'all 0.3s', marginLeft: this.state.changeAside ? '80px' : '200px'}}>
            <div className="layout-content" >
              <Switch>
                <Route exact path="/home" component={home}/>
                <Route exact path="/news" component={news}/>
                <Route exact path="/memberList" component={MemberList}/>
                <Route exact path="/shenpi" component={ShenPi}/>
                <Route exact path="/selectionTime" component={SelectionTime}/>
                <Route exact path="/progress" component={Progress}/>
                <Route exact path="/releasesubject" component={ReleaseSubject}/>
                <Route exact path="/personalData" component={personalData}/>
                <Route exact path="/main" component={Main}/>
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