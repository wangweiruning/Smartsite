/****
 * 大型机具情况
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,Button,Modal,WebView,Platform} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import Echarts from 'native-echarts'
import LinearGradient from 'react-native-linear-gradient'



let timer=null;
export default class BigToolsMsg extends React.Component {

  constructor(props){
    super(props)
    this.state={
        showModel:false,
        distance:0,
        time:0,
        loading:true,
        option:{
            xAxis: {
                type: 'category',
                data: ['2019-2-12', '2019-2-18', '2019-2-24', '2019-3-2']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [20,32,21,14],
                type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }]
        }
    }
  }

    componentDidMount(){
        timer = setInterval(()=>{
            this.setState({
                enddizhi:this.state.enddizhi+0.05
            })
            this.refs.webview.reload();
        },10000)
    }
    showModel = ()=>{
        this.setState({
            showModel:true
        })
    }

    closemodel=()=>{
        this.setState({
            showModel:false
        })
    }

    _onMessage = (e) => {
        var res = JSON.parse(e.nativeEvent.data)
        this.setState({
            distance:res.routes[0].distance,
            time:res.routes[0].time
        })
    }

   SecondToDate(msd) {//时间计算
    var time =msd
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟";
        }
        else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟";
        } else if (time >= 60 * 60 * 24) {
            time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
                parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟";
        }
        else {
            time=time;
        }
    }
    console.log(time)
    return time;
}

_onNavigationStateChange = (navState) => {
    console.log(navState)
    this.setState({
        loading: navState.loading,
    });
}

componentWillUnmount(){
    clearInterval(timer)
}
  render() {
    let {option,distance,time,loading} = this.state;

    return (<View style={{flex:1}}>
                <HeaderBar parent={this} name={'机具详情'}/>
                <WebView 
                    source={(require('../../html/gaode.html'))}    
                    onMessage={(e) =>this._onMessage(e)}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    ref='webview'
                    onNavigationStateChange={this._onNavigationStateChange}
                    injectedJavaScript={`runMap(116.397559,39.89621,116.303843, 39.983412,116.303843,39.996436)`}
                    />

                {!loading&&distance!=0&&<View style={styles.centent}>
                    <View style={styles.usertop}>
                        <View style={styles.userInfo}>
                            <Image source={require('../../images/userhead.png')} style={{width:30,height:30}}/>
                            <View style={styles.userMsg}>
                                <Text>使用者姓名</Text>
                                <Text>工号: {12345678}</Text>
                            </View>
                        </View>

                        <View style={styles.toolsMsg}>
                            <View style={styles.toolsInfo}>
                                <View style={styles.toolsOne}>
                                    <Text style={{color:"#000",fontWeight:'200'}}>机器名称1</Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Image source={require('../../images/toolmsg.png')} style={{width:30,height:30}}/>
                                    <View style={styles.userMsg}>
                                        <Text style={{fontSize:12}}>估算用时：{this.SecondToDate(time)}</Text>
                                        <Text style={{fontSize:12}}>估算距离: {parseInt(distance/100)+'公里'}</Text>
                                    </View>
                                </View>
                                <View style={styles.userInfos}>
                                <View style={styles.yuandian}>
                                        <Image source={require('../../images/yuangreen.png')} style={{width:15,height:15}}/>
                                        <Image source={require('../../images/lines.png')}  style={{width:2,height:20}}/>
                                        <Image source={require('../../images/yuan.png')}  style={{width:15,height:15}}/>
                                        <Image source={require('../../images/lines.png')}  style={{width:2,height:20}}/>
                                        <Image source={require('../../images/yuan.png')}  style={{width:15,height:15}}/>
                                    </View>
                                    <View style={styles.getime}>
                                        <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:12}}>实际出厂时间:{'2019-02-28 15:45:42'}</Text>
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        </View>
                                        <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:12}}>预计到达时间:{'2019-03-02 05:20:40'}</Text>
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        </View>
                                        <View style={{flexDirection:'column',height:'33%',justifyContent:'flex-start'}}>
                                            <Text style={{fontSize:12}}>实际到达时间:{'2019-03-02 05:20:40'}</Text>
                                            {/* <Image source={require('../../images/line.png')}  style={{width:'100%',height:2,marginLeft:-23,paddingLeft:25}}/> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>this.showModel()}
                        style={styles.showmaps}>
                        <Image source={require('../../images/mapdata.png')} style={{width:'100%',height:'100%'}}/>
                    </TouchableOpacity>
                </View>}
                {this.state.showModel&&<Modal hardwareAccelerated={true} animationType='slide' onRequestClose={()=>{this.setState({showModel:!this.state.showModel})}} transparent={true}>
                    <View style={{backgroundColor:'rgba(0,0,0,.5)',width:'100%',height:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                       <TouchableOpacity style={{backgroundColor:'transparent',width:'100%',height:'100%',position:'absolute'}}
                        onPress={()=>this.closemodel()}></TouchableOpacity>
                        
                        <LinearGradient colors={['#15A7FE', '#70C3FF', '#AFDDFF']} style={{width:"90%",height:250}}>
                                            <Text style={{padding:10,color:'#FFF'}}>使用次数(次)</Text>
                                            <Echarts option={option} height={200} />
                                    </LinearGradient>
                        </View>

                </Modal>}
                   
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
        alignItems:'center',
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
    showmaps:{
        width:50,
        height:50,
        borderRadius:50,
        position:'absolute',
        bottom:320,
        right:10
    }
  })