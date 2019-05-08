/**
 * 电子作业票
 * 
 */
import React from 'react';
import {Text,Image,View,ScrollView,RefreshControl,ToastAndroid,TouchableOpacity,StyleSheet,PanResponder,Dimensions} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {Pagination,ActivityIndicator} from 'antd-mobile-rn';
import {eleTicket} from '../../api/api'
import HaveNoData from '../common/HaveData'
import config from '../../api/serviceAPI.config'
let {width,height} = Dimensions.get('window');


export default class Eticket extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        progromsed:[],
        isFetching:false,
        pagenow:1,
        pagesnow:1,
        bg:'green',
        bg2:'white',
        top:height-120,
        left:width-60,
        waiting: false,//防多次点击
        loading:true,
        canuseer:true
    }
  }

  componentWillMount(){
    this.getNewdata(1)
    this.panResponder = PanResponder.create({
     onStartShouldSetPanResponder: () => true,//允许触摸
     onMoveShouldSetPanResponder: ()=> true,//允许移动
     onPanResponderGrant: (evt,gs)=>{//如果组件被激活，调用该方法
       this._top = this.state.top 
       this._left = this.state.left
     this._locationX = this.state.locationX
     this._locationY = this.state.locationY
       this.setState({bg: 'red'})
     },
     onPanResponderMove: (evt,gs)=>{//开始移动
       this.setState({
         top: this._top+gs.dy,
         left: this._left+gs.dx,
       locationX:evt.nativeEvent.locationX,
       locationY:evt.nativeEvent.locationY
       })
     },
     onPanResponderRelease: (evt,gs)=>{//停止移动
       this.setState({
         bg: 'white',
         top: this._top+gs.dy,
         left: this._left+gs.dx,
       locationX:evt.nativeEvent.locationX,
       locationY: evt.nativeEvent.locationY
     })}
   })


   this.props.navigation.addListener(
    'willFocus', async(obj)=>{
      this.getNewdata(1)
      }
  );
 }
    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }

    refreshings(){
      this.getNewdata(1)
        this.setState({
            isFetching:false
        })
        ToastAndroid.show('数据加载成功',ToastAndroid.SHORT)
    }

    getNewdata = async(e=1)=>{
        let data = await eleTicket(this.state.http,`currentPage=${e}&pageSize=10`);

          console.log(data,"gggggggggg")
          if(data.isSuccess()){
              this.setState({
                progromsed:data.data.data,
                pagenow:data.totalPage,
                pagesnow:data.currentPage,
                loading:false,
                canuseer:false
              })
          }else if(data.isCanUse()){
            this.setState({
              loading:false,
              canuseer:true
            })
            ToastAndroid.show(data.message,ToastAndroid.SHORT)
          }
        
    }

    changepage(e){
        //获取新数据 e代表页数
        this.getNewdata(e)
    }
    getmainperson(v){
      let tt = [];
      if(v.length>0){
        v.map(item=>{
          tt.push(item.realname)
        })
        return tt.join(',');
      }else{
        return '暂无'
      }
    }
    Dotwc(v){
        return(<View>
              {v.map((vd,i)=>{
              return <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('MsgEticketPage',vd)} 
                        key={i} style={{marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}}>
                            <Text style={{color:'#0390e8',fontSize:16,
                                borderBottomColor:'#eee',borderBottomWidth:.5}}>作业内容：{vd.content}</Text>
                            <Text style={{color:'grey'}}>关联工程：{vd.project.name}</Text>
                            <Text style={{color:'grey'}}>编号：{vd.ticketNumber}</Text>
                            <Text style={{color:'grey'}}>作业部位：{vd.position}</Text>
                            <Text style={{color:'grey'}}>开始时间：{vd.startTime}</Text>
                            <Text style={{color:'grey'}}>结束时间：{vd.endTime}</Text>
                         
                      </TouchableOpacity>
                  }
            )}
        </View>)
    }



     
    changeData(){
      //页面跳转处理 添加站班会数据
      this.props.navigation.navigate('CreateEticket')
     
    }
    _repeatClick(){
      this.setState({waiting: true});
      this.changeData();//这里写你原本要交互的方法
      setTimeout(()=> {
          this.setState({waiting: false})
      }, 2000);//设置的时间间隔由你决定
  }

    render() {
        let {progromsed,isFetching} = this.state;
        return (<View style={{backgroundColor:'white',flex:1}}>
                    <HeaderBar   parent={this} name="电子作业票"/>
                    <View style={{flex:1,backgroundColor:'#eee'}}>
                        {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                        <ActivityIndicator color="#363434"/>
                        <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                        </View>}
                        <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={()=>this.refreshings()}
                            colors={['#11A6FF']}
                        />}>
                        <View style={{flex:1,alignContent:'center',marginTop:10}}>
                        {progromsed.length==0?<HaveNoData />:this.Dotwc(progromsed)}
                        </View>
                        </ScrollView>
                        {!this.state.canuseer&& <Pagination total={this.state.pagenow} current={this.state.pagesnow} 
                        onChange={(e)=>this.changepage(e)}/>}
                        </View>
                        
                        {!this.state.canuseer&&<TouchableOpacity 
                            onPress={()=>this._repeatClick()}
                            disabled={this.state.waiting} 
                            activeOpacity={0.8}
                            style={[styles.rect,{top: this.state.top,left: this.state.left,flex:1,justifyContent:'center',alignItems:'center',"backgroundColor":"#5ACDE0"}]}>
                          <Text>+</Text>
                        </TouchableOpacity>}
        </View>)
      }
  }

  var styles = StyleSheet.create({
    rect: {
      position:'absolute',
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: 'black',
    borderRadius:50,
    backgroundColor:'green',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image:{
      height:60,
      width:100,
      margin:10,
      alignSelf:'center',
    },
  });