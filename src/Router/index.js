import React from 'react';


import login from '../Component/login.js'
import pcLogin from '../Component/pcLogin.js'
import UserInfo from '../Component/userinfo.js'
import UserTest from '../Component/usertest.js'

import { Route, IndexRoute } from 'react-router';
import { requireAuthentication } from '../utils';

export default (
  	<Route path="zhiqiu-login">
        <Route path="login" component={login} />
        <Route path="pc_login" component={pcLogin} />
        <Route path="userinfo" component={UserInfo} />
        <Route path="usertest" component={UserTest} />
   
    </Route>
);
