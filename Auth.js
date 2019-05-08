import React from 'react';
import MySorage from './api/storage';
import {StatusBar} from 'react-native';
import config from './api/serviceAPI.config';

import {LocalStorage} from './api/local_storage';


MySorage._getStorage();
window.jconfig = {
  userinfo: {},
  netWorkIp: '',
  token: null,
  projects: null,
};

export default class AuthLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
    }
  }
  
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      MySorage._load('netWorkIp',(data)=>{
        window.jconfig.netWorkIp=data
      });
      MySorage._load('userinfo',async (data) => {
        console.log(data,"666666666666666")
          window.jconfig.token = await LocalStorage.get('user:token');
          window.jconfig.projects = await LocalStorage.get('user:project');
          this.props.navigation.navigate(data?'App':'LoginPage');
      });
    } catch (e) {
      return;
    }
  };

  render() {
    return (<React.Fragment>
      <StatusBar backgroundColor='transparent' translucent={true}/>
    </React.Fragment>);
  }
}