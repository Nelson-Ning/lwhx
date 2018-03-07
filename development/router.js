import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import Login from './pages/login/index.js';
import layout from './components/layout/layout.js'; // 布局界面
import News from './pages/news/index.js';
class Routers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/:params" component={layout} />
                </div>
            </Router>
        )
    }
}
export default Routers;