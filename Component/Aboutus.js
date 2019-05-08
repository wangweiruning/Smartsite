/****关于我们 */

import React from 'react';
import {View,Text,TouchableOpacity,Alert,StyleSheet,Image,ToastAndroid} from 'react-native';
import HeaderBar from './common/HeaderBar';
import {CommonItemTo} from './common/CommonItemTo';
import TouchBotton from './common/TouchBotton';
import DeviceInfo from 'react-native-device-info';
import * as CacheManager from 'react-native-http-cache';
export default class Aboutus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            device:{},
        }
    }
    componentDidMount(){
        this.getCacheSize();
        let device = {};
        device.AppVersion = DeviceInfo.getVersion();//APP版本
        device.AppReadableVersion = DeviceInfo.getReadableVersion();
        
        this.setState({
          device:device
        })
      }

    // 获得缓存大小
    async getCacheSize() {
        const data = await CacheManager.getCacheSize();
        const size = data / (1024 * 1024);
        this.setState({ cacheSize: size.toFixed(2) + 'M'});
    }
    clean= async()=> {
        CacheManager.clearCache();
        this.getCacheSize();
        ToastAndroid.show('缓存已清除', ToastAndroid.SHORT);
    } 
    render(){ 
        return(<View style={{alignItems:'center'}}>
            <HeaderBar parent={this} name="关于我们"/>    
            <View style={styles.main}>
                    <CommonItemTo iconHeight={20} parent={this} leftIcon={require('../images/huancun.png')} height={20} leftName={"清除缓存"} rightText={this.state.cacheSize} isGoto={true} clear={this.clean}/>
                    <CommonItemTo iconHeight={20} parent={this} leftIcon={require('../images/banbenhao.png')} height={20} leftName={"版本号"} rightText={`v${this.state.device.AppVersion}`} goreturn={false}/>
            </View>
        </View>)
    }

}

const styles = StyleSheet.create({
main:{
    width:'100%',
    justifyContent:"center",
    alignItems:'center',
},

})