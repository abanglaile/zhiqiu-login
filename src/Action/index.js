import {push} from 'react-router-redux'
import config from '../utils/Config'
import { checkHttpStatus, parseJSON } from '../utils';
import axios from 'axios';
import { message } from 'antd';


// const AppID = 'wx6f3a777231ad1747';
// const AppSecret = '881a3265d13a362a6f159fb782f951f9';


let target = config.server_url;


/*-------------------------------------------------*/
//
/*-------------------------------------------------*/
//登录注册相关action  账户密码登录
export const loginUserSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: 'LOGIN_USER_SUCCESS',
    token: token,
  }
}

export const regUserSuccess = (token) =>  {
  localStorage.setItem('token', token);
  return {
    type: 'REG_USER_SUCCESS',
    payload: {
      token: token
    }
  }
}

export const loginUserFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: 'LOGIN_USER_FAILURE',

  }
}

export const loginUserRequest = () => {
  return {
    type: 'LOGIN_USER_REQUEST',
  }
}

export const loginUser = (username, password, redirect) => {
   
    let path = '/login';
    let url = target + path;
    console.log("redirect:",redirect);
    return (dispatch) => {
        // return axios.post(url,{username,password})
        dispatch(loginUserRequest());
        return axios.post(url,{username,password})
        .then(function (response) {
            if(response.data){
                console.log("loginUser response.data :",response.data);
                dispatch(loginUserSuccess(JSON.stringify(response.data)));
                window.location.href = "http://www.zhiqiu.pro"+redirect;
                // dispatch(push(redirect));
            }else{
                message.error('用户名或密码错误');
            }
        })
        .catch(function (error) {
            dispatch(loginUserFailure(error));
        });
    }
}

export const regUser = (username, password, redirect) => {
    let url = target + "/signup";
    return dispatch => {
        return axios.post(url,{username,password})
        .then(function (response) {
            console.log("response.data :",JSON.stringify(response.data));
            if(response.data.signMsg == 'failed'){
                // alert("注册失败！");
                message.error('注册失败');
            }else if(response.data.signMsg == 'existed'){
                // alert("用户已存在");
                message.warning('账户名已存在，请重新输入');
            }else{
                // alert("注册成功");
                message.success('注册成功');
                window.location.href = "http://www.zhiqiu.pro"+redirect;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}


//登录注册相关结束
/*-------------------------------------------------*/
//微信鉴权相关

export const getWxUserInfoSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: "GET_WX_USERINFO_SUCCESS",
        token: token,
    }
}
const saveTempWxInfo = (wx_info) => {
    return {
        type: "SAVE_TEMP_WX_INFO",
        wx_info,
    }
}


export const getWxAuth = (code,state) => {
    let url = target + "/get_wx_auth";
    return (dispatch) => {
        // alert(JSON.stringify(code));
        return axios.get(url,{
                params:{
                   code,
                   state,
                }
        })
        .then(function (response) {
            if(response.data.newuser){
                // alert('newuser');  
                // alert('wx_info:'+JSON.stringify(response.data.wx_info));  
                dispatch(saveTempWxInfo(response.data.wx_info));
            }else{
                // alert('olduser');
                dispatch(getWxUserInfoSuccess(JSON.stringify(response.data.user_info)));
                window.location.href = "http://www.zhiqiu.pro"+state;
            }
        })
        .catch(function (error) {
            alert('error getWxAuth' + JSON.stringify(error));
        });
    }
}

export const logoutwx = () => {
    // localStorage.removeItem('token');
    return {
        type: 'LOGOUT_WX_USER',
    }
}

export const logoutwxAndRedirect = () => {
    return (dispatch) => {
        dispatch(logoutwx());
        dispatch(push('/mobile-reveal/login'));
    }
}

export const setUserInfo = (wx_info,realname,stu,groupValue,redirectRoute) => {
    let url = target + "/set_userinfo";
    return (dispatch) => {
        return axios.post(url,{wx_info,realname,stu,groupValue})
        .then(function (response) {
            dispatch(getWxUserInfoSuccess(JSON.stringify(response.data)));
            // dispatch(push(redirectRoute));
            window.location.href = "http://www.zhiqiu.pro"+redirectRoute;
        })
        .catch(function (error) {
            alert('error setUserInfo' + JSON.stringify(error));
        });
    }
}

export const getSclGroup = (school_id) => {
    let url = target + "/getSclGroup";
    return (dispatch) => {
        return axios.get(url,{
            params:{
                school_id : school_id,
            }
        })
        .then(function (response) {
            dispatch({
                type: 'GET_SCHOOL_GROUP',
                json: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
