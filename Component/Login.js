import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, InputItem} from 'antd-mobile-rn';
import {login} from '../api/api';
import MySorage from '../api/storage';
import config from '../api/serviceAPI.config';
import {BaseComponent} from './base/BaseComponent';
import {LocalStorage} from '../api/local_storage';


const isDev = process.env.NODE_ENV === 'development';

export default class Login extends BaseComponent {
  constructor(props) {
    super(props);
    MySorage._getStorage();
    this.state = {
      http: jconfig.netWorkIp ? jconfig.netWorkIp : config.URL,
      user: 'qhhnadmin',
      pass: '123456',
      result: {},
      loading: false,
    };
  }

  componentDidMount() {

    this.viewDidAppear = this.props.navigation.addListener('didFocus', async (obj) => {
      MySorage._load('netWorkIp', (ress) => {
        if (!ress) return;
        this.setState({
          http: ress,
        });
      });
    });
  }

  componentWillUnmount() {
    // 添加监听登陆页界面被销毁之后恢复返回键的效果
    this.setState({loading: false});
  }


  opntion2Selected = () => {
    return true;
  };

  async submitgo() {
    let {user, pass} = this.state;
    if (!user) {
      ToastAndroid.show('请输入账号', ToastAndroid.SHORT);
      return;
    }
    if (!pass) {
      ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
      return;
    }
    try {
      this.setState({loading: true});
      const datas = {username: user, password: pass};
      const result = await login(datas);
      console.log(result)
      if (result.isSuccess()) {
        MySorage._sava('userinfo', result);
        MySorage._sava('isFirst', true);
        MySorage._sava('light', {X: null, Y: null});
        MySorage._sava('XY', {X: null, Y: null});
      
        await LocalStorage.set('user:token', result.data.token);
        await LocalStorage.set('user:project', result.data.project||[]);

        window.jconfig.userinfo = result.data;
        window.jconfig.token = result.data.token;
        window.jconfig.project = result.data.project;

        ToastAndroid.show('登录成功', ToastAndroid.SHORT);
        this.setState({loading: false});
        this.props.navigation.navigate('App')
      } else {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        this.setState({loading: false});
      }
    } catch (e) {
      console.log(e)
      this.setState({loading: false});
      ToastAndroid.show('网络或服务器错误', ToastAndroid.SHORT);
    }
  }

  handleInput(k, v) {
    this.setState({
      [k]: v,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true}/>
        <View style={styles.bgImage}>
          <Image source={require('../images/cc.jpg')} style={styles.fullWH}/>
        </View>
        <View style={styles.centers}>
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <TouchableOpacity style={{marginRight: 5}} onPress={() => this.props.navigation.push('Networks')}>
              <Text style={{color: 'white', fontSize: 15}}>网络配置</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topTitle}>
            <Text style={styles.topTitleText}>智慧工地一体化</Text>
          </View>

          <View style={styles.usertyle}>
            <Image source={require('../images/login-username.png')} style={{width: 20, left: 8}} resizeMode='contain'/>
            <InputItem editable={!this.state.loading} placeholder="账号" defaultValue={this.state.user}
                       onChange={(v) => this.handleInput('user', v)} style={{width: '85%'}}/>
          </View>

          <View style={styles.passtyle}>
            <Image source={require('../images/login-password.png')} style={{width: 20, left: 8}} resizeMode='contain'/>
            <InputItem editable={!this.state.loading} type="password" defaultValue={this.state.pass} placeholder="密码"
                       onChange={(v) => this.handleInput('pass', v)} style={{width: '85%'}}/>
          </View>
          <TouchableOpacity onPress={() => !this.state.loading && this.submitgo()} style={styles.loginin}>
            <Text style={{color: 'white', fontSize: 20}}>登录</Text>
          </TouchableOpacity>
        </View>

        {
          this.state.loading &&
          <View style={{alignItems: 'center', top: '30%'}}>
            <View style={styles.islogining}>
              <ActivityIndicator color="white"/>
              <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>登录中...</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fullWH: {
    width: '100%',
    height: '100%',
  },
  centers: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  topTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  topTitleText: {
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
  },
  usertyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  passtyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    top: 20,
  },
  codetyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    top: 40,
  },
  loginin: {
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#00a6e7',
    borderRadius: 5,
    height: 40,
  },
  islogining: {
    borderRadius: 4,
    borderColor: 'rgba(255,255,255,.5)',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    width: 80,
    height: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
    paddingTop: 10,
    zIndex: 10000000000,
  },
});