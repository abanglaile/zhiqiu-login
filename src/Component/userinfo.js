import { Tabs, WingBlank, WhiteSpace, List, Toast, InputItem, Button, ActivityIndicator } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';

import *as action from '../Action/';
import {connect} from 'react-redux';


class UserInfo extends React.Component {
  constructor(props) { 
    super(props);
    const {code,state} = this.props.location.query;
    console.log('code:'+code);
    console.log('state:'+state);

    if(code){
      this.props.getWxAuth(code,state);
    }
  }

  componentDidMount(){
   
  }

  handleSubmit(e){
    e.preventDefault();
    const {wx_info} = this.props;
    const {state} = this.props.location.query;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // alert('values.realname:'+values.realname);
        this.props.setUserInfo(wx_info, values.realname, state);
      }
    });
  }

  render(){
    const {hascode} = this.props;
    const { getFieldProps } = this.props.form;

    return(
      <div style={{margin:'100px auto',padding:'0 20px 20px 20px'}}>
        <form>
          <List>
            <InputItem
              {...getFieldProps('realname', {
                rules: [
                  { required: true, message: '请输入真实姓名' },
                ],
              })}
              placeholder="请输入真实姓名"
            >姓名：</InputItem>
          </List>
        </form>
         <WhiteSpace />
          <WingBlank>
          <div style={{marginTop: '0.5rem'}}>
            <Button type="primary" style={{lineHeight:'47px'}} onClick={(e)=>this.handleSubmit(e)}>提交</Button>
            <WhiteSpace />
          </div>
          </WingBlank>
      </div>
    );
    
  }

}

const  UserInfoWapper = createForm()(UserInfo);
export default connect(state => {
  const authData = state.AuthData.toJS();
  return {
    hascode: authData.hascode,
    wx_info: authData.wx_info,

  }
}, action)(UserInfoWapper);