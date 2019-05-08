import React from 'react';
import {Text,View,TouchableOpacity,Image,ScrollView,Modal,RefreshControl,Animated,Easing,ToastAndroid} from 'react-native';
import NavigationBar from './common/NavigationBar';
import JPushModule from 'jpush-react-native'
import {structItem,checkquestion,tpmateriallistall,localdayMsgnew} from '../api/api';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from "react-navigation";
import config from '../api/serviceAPI.config'

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      token:jconfig.userinfo.token,
      http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
      showNumber:20,
      rotateValue: new Animated.Value(0),
      show:false,
      newList:{},
      rightText:0,
      jiagongText:0,
      feng:{},
      pl:1,
      fenxian:'当前风险过高,处于疲劳施工状态',
      list:[],
      isFetching:false,
      resetAction :StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({ routeName: 'login' })],
      })
      ,windDenji:0
    }
  }
  // demoReact

   async componentDidMount(){
    this._isMounted = false
    this.openNotificationListener = map => {
      this.props.navigation.navigate(JSON.parse(map.extras).key1)
    }
    JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener);

    this.startAnimation();
    this.getAllNetData();
  }

  getAllNetData = async ()=>{
  let ks = await checkquestion(this.state.http,`projectId=5&requestType=dbgl`);

  let jiagong =   await tpmateriallistall(this.state.http,'projectid=5');


    let fengxiang = await localdayMsgnew();
    console.log(fengxiang,"kkkkkkkkkk")
    let data = fengxiang.data;
    let windSpeed = data!=null?data.windSpeed:0;
    let windDenji = 0;
    if(windSpeed>5.5) {
      this.tuiss('当前风力等级较高，请注意安全!');
      windDenji=1;
    }
  if(ks.isSuccess()){
    if(ks.data.data.length>0) this.tuis(`待办消息${ks.data.data.length}条`,'AwaitTodo');
    if(jiagong.data.length>0) this.tuis(`甲供物资消息${jiagong.data.length}条`,'Dynamic');
      this.setState({
        rightText:ks.data.data.length,
        jiagongText:jiagong.data.length,
        isFetching:false,
        windDenji:windDenji
      })
    }else if(ks.isCanUse()){
      this.setState({
        isFetching:false
      }) 
    }
       
  }

  getMsgInfo=()=>{//获取疲劳是公共数据
    let {resetAction} = this.state;
    MySorage._load("userinfo",async(data)=>{
      if(data==null){
        MySorage._remove('userinfo');
        return this.props.navigation.dispatch(resetAction);
      }else{
        let totalInvestment = data.projects[0].totalInvestment;//得到消息提醒 id====》匹配list中的id
        let params = `projectid=${data.projects[0].id}`;
        let list = await structItem(params,data.token);
        console.log(lsit,"llllllllllll")
        if(list.code=='S10005'){
        MySorage._remove('userinfo')
         return this.props.navigation.dispatch(resetAction);
        } 
        let newList = {};    
        list.data.data.map((items,index)=>{
          if(items.id==totalInvestment) newList = items ;
        })
        this.setState({
          list:list.data.data,
          newList:newList
        })
      }
    })
  }

  tuis(ss,go){
    JPushModule.sendLocalNotification({
      buildId: 2, // 设置通知样式
      id: 5, // 通知的 id, 可用于取消通知
      extra: { key1: go, key2: 'value2' }, // extra 字段 就是我们需要传递的参数
      fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
      title: '通知',
      content:ss,
    })
  }

  tuiss(yy){
    JPushModule.sendLocalNotification({
      buildId: 2, // 设置通知样式
      id:1, // 通知的 id, 可用于取消通知 // extra 字段 就是我们需要传递的参数
      extra: { key1: '', key2: 'value2' },
      fireTime: new Date().getTime(), // 通知触发时间的时间戳（毫秒）
      title: '通知',
      content: yy,
    })
  }


  Modeled(v){
    this.setState({show:!this.state.show,feng:v})
  }


  startAnimation() {
    this.state.rotateValue.setValue(0);
    Animated.parallel([
        Animated.timing(this.state.rotateValue, {
            toValue: 1,  //角度从0变1
            duration: 5000,  //从0到1的时间
            easing: Easing.linear,//线性变化，匀速旋转
        }),
    ]).start(()=>this.startAnimation());
  }

  onRefresh=()=>{
    this.setState({isFetching:true})
    this.getAllNetData();
  }
componentWillUnmount(){
  this._isMounted = true
}
  render() {
      return (<View style={{alignItems:'center',flex:1}}>
              <NavigationBar navigation={this.props.navigation} centertext={`动态`}/> 
               {/* <LunboComponent/> */}
              <ScrollView style={{width:"100%",backgroundColor:"#FFF"}} 
                            refreshControl={<RefreshControl
                                refreshing={this.state.isFetching}
                                onRefresh={()=>this.onRefresh()}
                                colors={['rgb(76, 169, 249)']}
              />}>
              <View style={{backgroundColor:'white',width:'100%'}}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Dynamic')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/wuzipne.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>甲供物资动态</Text>
                  {this.state.jiagongText!=0&&<View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>{this.state.jiagongText}</Text>
                  </View>}
                </View>
               </TouchableOpacity>
               <TouchableOpacity 
              //  onPress={()=>this.props.navigation.navigate('demoReact')} 
               style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/chechuangjiqiren.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>大型机具提醒</Text>
                  {/* <View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>10</Text>
                  </View> */}
                </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('AwaitTodo')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/daiban.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>待办事项</Text>
                  {this.state.rightText!=0&&<View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>{this.state.rightText}</Text>
                  </View>}
                </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.state.windDenji==1&&this.Modeled({pi:'当前风力等级过高，请注意安全！',name:'风级预警'})} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/fengxianpinggu.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>风级预警</Text>
                 {this.state.windDenji==1&&<View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>{this.state.windDenji}</Text>
                  </View>}
                </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Progress')} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/jindu.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>施工进度消息</Text>
                  {/* <View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>1</Text>
                  </View> */}
                </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.Modeled({pi:'已工作8小时以上，请注意休息',name:'疲劳施工'})} style={{width:'100%',alignItems:'center',flexDirection:'row'}} activeOpacity={.8}>
               <View style={{marginLeft:10}}>
                 <Image source={require('../images/pilao.png')} style={{width:20,height:20}}/>
               </View>
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,width:'90%',alignItems:'center',marginLeft:10,borderBottomColor:'#d9d9d9'}}>
                <Text style={{color:'black',fontSize:18,flex:1}}>疲劳施工</Text>
                  {this.state.pl!=0&&<View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:12}}>{this.state.pl}</Text>
                  </View>}
                </View>
               </TouchableOpacity>
             </View>
             </ScrollView>
            <Modal animationType={'slide'} visible={this.state.show} transparent={true} onRequestClose={()=>this.setState({show:!this.state.show})}>
            <View style={{backgroundColor:'rgba(0,0,0,.3)',flex:1,alignItems:'center',justifyContent:'center'}}>
              <View style={{backgroundColor:'white',width:'90%',borderTopStartRadius:7,borderTopEndRadius:7,padding:10,borderBottomColor:'#bbbbbb',borderBottomWidth:1}}>
                <Text style={{fontSize:15,color:'black'}}>{this.state.feng.name}</Text>
              </View>
              <View style={{backgroundColor:'#f5f5f5',width:'90%',padding:5,flexDirection:'row',height:200}}>
                <Animated.Image source={require('../images/fengs.png')} style={{width:20,height:20,
                transform:[
                                {rotate: this.state.rotateValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg','360deg']
                                })}
                ]
              }}/>
              <Text style={{width:'92%',marginLeft:10,fontSize:15}}>{this.state.feng.pi}</Text>
              </View>
              <View style={{backgroundColor:'white',width:'90%',padding:5,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.setState({show:!this.state.show,pl:1})}} style={{backgroundColor:"#0390e8",padding:10,alignItems:'center',borderRadius:5,width:'50%'}}>
              <Text style={{color:'white'}}>知道了</Text>
              </TouchableOpacity>
              </View>
            </View>
            </Modal>
        </View>)
      }
  }