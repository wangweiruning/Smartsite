/****
 * 物资路线查看
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,WebView,Modal} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import config from '../../api/serviceAPI.config'
export default class MaterialLuxian extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        distance:0,//路程
        time:0,//走完路程所需时间
        loading:true,//判断是否加载完毕 true未加载完成
       
    }
  }

  componentDidMount(){
    
  }
  _onMessage = (e) => {//接收webview返回数据
    var res = JSON.parse(e.nativeEvent.data)
    console.log(res)
    this.setState({
        distance:res.distance,
        time:res.time
    })
  }

//    SecondToDate(msd) {//时间计算
//         var time =msd
//         if (null != time && "" != time) {
//             if (time > 60 && time < 60 * 60) {
//                 time = parseInt(time / 60.0) + "分钟";
//             }
//             else if (time >= 60 * 60 && time < 60 * 60 * 24) {
//                 time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
//                     parseInt(time / 3600.0)) * 60) + "分钟";
//             } else if (time >= 60 * 60 * 24) {
//                 time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
//                     parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
//                     parseInt(time / 3600.0)) * 60) + "分钟";
//             }
//             else {
//                 time=time;
//             }
//         }
//         return time;
//     }

    _onNavigationStateChange = (navState) => {
        this.setState({
            loading: navState.loading,
        });
    }

  render() {
    let {distance,time,loading} = this.state;
    let {datas,startAddress,endAddress} = this.props.navigation.state.params;
    return (<View style={{flex:1}}>
               <HeaderBar parent={this} name={"物资路线"}/>
                <WebView 
                    // source={require('../../html/baidu.html')}  
                    source={{uri:`http://39.98.230.127:7203/`}}  
                    onMessage={(e) => { this._onMessage(e) }}
                    startInLoadingState={true}
                    domStorageEnabled={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    injectedJavaScript={`runMap(${startAddress.lng},${startAddress.lat},${startAddress.lng},${startAddress.lat},${endAddress.lng},${endAddress.lat})`}/>

                {!loading&&distance!=0&&<View style={styles.centent}>
                    <View style={styles.usertop}>
                        <View style={styles.userInfo}>
                            <Image source={require('../../images/wuziname.png')} style={{width:25,height:25}}/>
                            <View style={styles.userMsg}>
                                <Text style={{color:'#000'}}>甲供物资名称:<Text style={{fontSize:14,color:"#aaa"}}>{datas.materialName}</Text></Text>
                                <Text style={{fontSize:14,color:"#aaa"}}>合同编号: {datas.materialContractNo}</Text>
                            </View>
                        </View>

                        <View style={styles.toolsMsg}>
                            <View style={styles.toolsInfo}>
                                <View style={styles.userInfo}>
                                    <Image source={require('../../images/cars.png')} style={{width:30,height:16}}/>
                                    <View style={styles.userMsg}>
                                        <Text style={{fontSize:12}}>估算用时：{time}</Text>
                                        <Text style={{fontSize:12}}>估算距离: {distance}</Text>
                                    </View>
                                </View>
                                <View style={styles.userInfos}>
                                    <View style={styles.yuandian}>
                                        <Image source={require('../../images/yuangreen.png')} style={{width:15,height:15}}/>
                                        <Image source={require('../../images/lines.png')}  style={{width:2,height:20}}/>
                                        <Image source={require('../../images/yuan.png')}  style={{width:15,height:15}}/>
                                        {/* <Image source={require('../../images/lines.png')}  style={{width:2,height:20}}/>
                                        <Image source={require('../../images/yuan.png')}  style={{width:15,height:15}}/> */}
                                    </View>
                                    <View style={styles.getime}>
                                        <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:12}}>实际出厂时间:{datas.startTime?datas.startTime:'暂无'}</Text>
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        </View>
                                        <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:12}}>预计到达时间:{datas.endTime?datas.endTime:'暂无'}</Text>
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        </View>
                                         {/* <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}> */}
                                            {/* <Text style={{fontSize:12}}>实际到达时间:{'2019-03-02 05:20:40'}</Text> */}
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        {/* </View>  */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>}
        </View> );
    }
  }

  const styles = StyleSheet.create({
    centent:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    userMap:{
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    usertop:{
        position:'absolute',
        bottom:20,
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    userInfo:{
        width:'90%',
        height:60,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10
    },
    userMsg:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        left:10
        
    },
    toolsMsg:{
        width:'95%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#efefef'
    },
    userInfos:{
        width:'98%',
        height:120,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10
    },
    toolsInfo:{
        width:'85%',
        flexDirection:'column',
        justifyContent:'center',
    },
    yuandian:{
        width:'10%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        height:100
    },
    getime:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'90%',
        height:100
    },
  })