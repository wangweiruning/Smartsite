import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,Button} from 'react-native';
import JPushModule from 'jpush-react-native'
import HeaderBar from './common/HeaderBar';


export default class Litile extends React.Component {

  constructor(props){
    super(props)
    this.state={
       time:new Date(new Date().getTime()),
       now:'2019-02-15 14:30',
    }
  }

  componentDidMount(){
    this.formatDateTime(this.state.time)>this.state.now?this.tuiss():null
  }

  tuiss(){
    JPushModule.sendLocalNotification({
      buildId: 2, // 设置通知样式
      id:3, // 通知的 id, 可用于取消通知
      extra: { key1: 'value1', key2: 'value2' }, // extra 字段 就是我们需要传递的参数
      fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
      badge: 8, // 本地推送触发后应用角标的 badge 值 （iOS Only）
      subtitle: 'subtitle',  // 子标题 （iOS10+ Only）
      title: '通知',
      content: '超时未完成',
    })
  }

  tuis(){
    JPushModule.sendLocalNotification({
      buildId: 2, // 设置通知样式
      id:4, // 通知的 id, 可用于取消通知
      extra: { key1: 'value1', key2: 'value2' }, // extra 字段 就是我们需要传递的参数
      fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
      badge: 8, // 本地推送触发后应用角标的 badge 值 （iOS Only）
      subtitle: 'subtitle',  // 子标题 （iOS10+ Only）
      title: '通知',
      content: this.formatDateTime(this.state.time)<this.state.now?'当前施工进度已提前完成':this.formatDateTime(this.state.time)==this.state.now?'按时完成':'超时完成',
    })
  }

  formatDateTime(theDate) {

    var _hour = theDate.getHours();
    
    var _minute = theDate.getMinutes();
    
    var _second = theDate.getSeconds();
    
    var _year = theDate.getFullYear()
    
    var _month = theDate.getMonth();
    
    var _date = theDate.getDate();
    
    if(_hour<10){_hour="0"+_hour ;}
    
    if(_minute<10){_minute="0"+_minute;  }
    
    if(_second<10){_second="0"+_second  }
    
    _month = _month + 1;
    
    if(_month < 10){_month = "0" + _month;}
    
    if(_date<10){_date="0"+_date  }
    
    return  _year + "-" + _month + "-" + _date + " " + _hour + ":" + _minute;
    
    }

  render() {
      return (<View style={{alignItems:'center'}}>
                <HeaderBar  rightText='回到首頁' rightRouteTo={"login"} parent={this} name="流程管理"/>
                <Text>Litile</Text>
                <TouchableOpacity style={{width:60,height:60,backgroundColor:'#11A6FF',justifyContent:'center',alignItems:'center'}} onPress={()=>this.tuis()}>
                  <Text style={{color:'white'}}>确认完成</Text>
                </TouchableOpacity>
        </View> );
    }
  }