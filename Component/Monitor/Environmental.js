/**
 * 
 * 环境监测
 */
import React from 'react';
import {Text,View,Image,ToastAndroid,StyleSheet,ScrollView} from 'react-native';
import {localdayMsgnew} from '../../api/api'
import HeaderBar from './../common/HeaderBar';
import { Tabs } from 'antd-mobile-rn';
import config from '../../api/serviceAPI.config'
export default class Environmental extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        data:[{
            name:"1555W (Y#14-56) 水位监测点 0",
            mincheng:'水位传感器 - 0',
            id:'#V-1234654897',
            xuliNum:"adsgfdhfhfgh",
            nowState:"未连接",
            nowName:"0.01米",
            newTime:"2018-12-12 12:30:15"
           }
        ],
        datas:{}
    }
  }

  componentDidMount(){
      this.getDayMSG();
  }
  
  getDayMSG=async()=>{
    let datas = await localdayMsgnew()

    console.log(datas,"获取环境监测数据")
    if(datas.isCanUse()){
        ToastAndroid.show(datas.message,ToastAndroid.SHORT)
    }else{
        this.setState({
           datas:datas.data,
        })   
    }
    
  }

  render() {
    const tabs = [
        { title: '水位监测',id:'141' },
        { title: '气象数据',id:'57' },
    ];
let {datas} = this.state;
      return (<View style={{backgroundColor:"#ffffff",flex:1}}>
               <HeaderBar parent={this} name="环境监测" />
                <View style={{width:'100%',height:'90%'}}>
               <Tabs tabs={tabs}>
                    <ScrollView>
                    {this.state.data.map((item,index)=>{
                        return <View style={{flexDirection:'column',justifyContent:'center',width:'100%'}} key={index}>
                        <View style={styles.jianceItem}>
                            <View style={styles.jianceSubItem}>
                                <Text style={{color:"#000000"}}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>设备</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.mincheng}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>设备ID</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.id}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>监测点</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.mincheng}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>序列号</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.xuliNum}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>当前状态</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.nowState}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>监测深度</Text>
                                <Text style={{color:"#FB7273",fontSize:12}}>{item.nowName}</Text>
                        </View>
                        <View style={styles.SubItem}>
                                <Text style={{color:"#000000",fontSize:12}}>最新更新时间</Text>
                                <Text style={{color:"#000",fontSize:12}}>{item.newTime}</Text>
                        </View>
                    </View>
                    })}
                    </ScrollView>
                    <ScrollView>
                    <View style={{flexDirection:'column',justifyContent:'center',width:'100%'}}>
                                    <View style={[styles.SubItem,{backgroundColor:"#d6E7F7"}]}>
                                            <Text style={{color:"#000000",fontSize:12}}>设备名称</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{'气温监测'}</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>PM2.5</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.pm25}ug/m3</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>PM10</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.pm10}ug/m3</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>噪声</Text>
                                            <Text style={{color:"#FB7273",fontSize:12}}>{datas.noise}DB</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>温度</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.temperature}℃</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>湿度</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.humidity}%RH</Text>
                                    </View>

                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>风速</Text>
                                            <Text style={{color:"#FB7273",fontSize:12}}>{datas.windSpeed}m/s</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>风向</Text>
                                            <Text style={{color:"#FB7273",fontSize:12}}>{datas.windDirection}</Text>
                                    </View>
                                    
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>扬尘(TSP)</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.tsp}ug/m3</Text>
                                    </View>
                                    <View style={styles.SubItem}>
                                            <Text style={{color:"#000000",fontSize:12}}>最新时间</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{datas.createTime}</Text>
                                    </View>
                                </View>
                    </ScrollView>
                </Tabs>  
               </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      marginTop:5,
      paddingBottom:10
    },
    jianceItem:{
        width:"100%",
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
    },
    jianceSubItem:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"#d6E7F7",
        borderBottomWidth:2,
        borderStyle:'solid',
        borderColor:"#4787CB",
        padding:10
    },
    SubItem:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:"#000",
        padding:10
    }
  })