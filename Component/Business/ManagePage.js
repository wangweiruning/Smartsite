/**
 * 站班会管理
 * 
 */
import React from 'react';
import {Image,Text,View,ScrollView,RefreshControl,ToastAndroid,TouchableOpacity,StyleSheet,PanResponder,Dimensions,TextInput} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {Pagination,ActivityIndicator} from 'antd-mobile-rn';
import {getManageData} from '../../api/api'
import HaveNoData from '../common/HaveData'
let {width,height} = Dimensions.get('window');
import config from '../../api/serviceAPI.config'
export default class ManagePage extends React.Component {
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
        canuser:true
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

    getNewdata = async(e=1,search='')=>{
        let data = await getManageData(this.state.http,`project=5&currentPage=${e}&pageSize=10&search=${search}`);
    
          console.log(data,"gggggggggg")
          if(data.isSuccess()){
            this.setState({
              progromsed:data.data.data,
              pagenow:data.totalPage,
              pagesnow:data.currentPage,
              loading:false,
              canuser:false
            })
          }else if(data.isCanUse()){
            this.setState({
              loading:false,
              canuser:true
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
              {v.map((vd,i)=><TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('MsgManagePage',vd)} 
                        key={i} style={{marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}}>
                            <Text style={{color:'#0390e8',fontSize:16,
                                borderBottomColor:'#eee',borderBottomWidth:.5}}>{vd.theme}</Text>
                            <Text style={{color:'grey'}}>单位：{vd.unit!=null&&vd.unit.name}</Text>
                            <Text style={{color:'grey'}}>负责人：{this.getmainperson(vd.responsePerson)}</Text>
                            <Text style={{color:'grey'}}>成员：{this.getmainperson(vd.participant)}</Text>
                            <Text style={{color:'grey'}}>会议纪要：{vd.summary}</Text>
                            <Text style={{color:'grey'}}>站班会内容：{vd.content}施工的双方各得事故的双方各的防火防盗大是大非好的话的防火防盗烦得很梵蒂冈合肥大幅度和地方发个电话烦得很发电好</Text>
                            <Text style={{color:'grey'}}>开会时间：{vd.createTime}</Text>
                        </TouchableOpacity>)}
        </View>)
    }

    async onChanegeTextKeyword(search) {
          this.getNewdata(1,search);
      
  }

     
    changeData(){
      //页面跳转处理 添加站班会数据
      this.props.navigation.navigate('CreateManagePage')
     
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
                    <HeaderBar   parent={this} name="站班会管理"/>
                    <View style={{flex:1,backgroundColor:'#eee'}}>
                        {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                        <ActivityIndicator color="#363434"/>
                        <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                        </View>}
                        <View style={{width:'100%',borderBottomColor:'#999',justifyContent:"center",borderBottomWidth:.5,alignItems:'center',backgroundColor:'white',height:60}}>
                              <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                              <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                              <TextInput underlineColorAndroid={'transparent'} 
                                          multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} 
                                placeholder="请输入"/>
                    </View>
                </View>
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
                        {!this.state.canuser&&<Pagination total={this.state.pagenow} current={this.state.pagesnow} 
                        onChange={(e)=>this.changepage(e)}/>}
                        </View>
                        {!this.state.canuser&&<TouchableOpacity 
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
  });