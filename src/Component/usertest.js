import { WingBlank, WhiteSpace, List, InputItem, Button,Picker } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';

import *as action from '../Action/';
import {connect} from 'react-redux';


class UserTest extends React.Component {
  constructor(props) { 
    super(props);
    const {code,state} = this.props.location.query;
    console.log('code:'+code);
    console.log('state:'+state);
    this.state = {
        stu : true,
        display : 'block',
        groupValue: [],
    };
    if(code){
      this.props.getWxAuth(code,state);
    }
  }

  componentDidMount(){
    var school_id = 2; //星海附中 
    this.props.getSclGroup(school_id);
  }

  changeIden(oldstu,olddisplay){
      this.setState({
          stu : !oldstu,
          display : olddisplay == 'block' ? 'none' : 'block',
      });
  }

  handleSubmit(e){
    e.preventDefault();
    const {wx_info} = this.props;
    const {state} = this.props.location.query;
    var {stu, groupValue} = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // alert('values.realname:'+values.realname);
        this.props.setUserInfo(wx_info, values.realname, stu, groupValue, state);
      }
    });
  }

  onChangeGroup = (group) => {
    this.setState({
        groupValue: group,
    });
  };

  render(){
    const {sclgroup} = this.props;
    var {stu, display, groupValue} = this.state;
    console.log("groupValue:",groupValue);
    const { getFieldProps } = this.props.form;

    return(
      <div style={{margin:'100px auto',padding:'0 20px 20px 20px'}}>
        <Button onClick={(e) => this.changeIden(stu,display)} size="large" type={stu ? "primary" : "ghost"} inline style={{ marginLeft: '2.5rem',marginBottom :'3rem'}}>我是学生</Button>
        <Button onClick={(e) => this.changeIden(stu,display)} size="large" type={stu ? "ghost" : "primary"} inline style={{ marginLeft: '3rem',marginBottom :'3rem'}} className="am-button-borderfix">我是老师</Button>
        <div style={{display:display}}>
            <Picker
            data={sclgroup}
            value={this.state.groupValue}
            cols={1}
            onChange={this.onChangeGroup}
            >
            <List.Item arrow="horizontal">班级：</List.Item>
            </Picker>
        </div>
        <form>
          <List>
            <InputItem
              {...getFieldProps('realname', {
                rules: [
                  { required: true, message: '请输入真实姓名' },
                ],
              })}
              style={{textAlign:'right',paddingRight:'1.5rem'}}
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

const  UserInfoWapper = createForm()(UserTest);
export default connect(state => {
  const authData = state.AuthData.toJS();
  return {
    wx_info: authData.wx_info,
    sclgroup:  authData.sclgroup,

  }
}, action)(UserInfoWapper);