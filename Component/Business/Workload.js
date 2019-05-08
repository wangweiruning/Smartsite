/**
 * 工作量统计
 * 
 */
import React from 'react';
import {Text,View,ScrollView,RefreshControl,Image,TouchableOpacity,ToastAndroid,ActivityIndicator,TextInput} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {Pagination,} from 'antd-mobile-rn';
import {apigates} from './../../api/api'
import HaveNoData from './../common/HaveData'
import config from '../../api/serviceAPI.config'




export default class Workload extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
        progromsed:[],
        isFetching:false,
        pagenow:1,
        pagesnow:1,
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,  
        token:jconfig.userinfo.token,
        loading:true,
        search:''
    }
  }
    componentDidMount(){
        this.getListData(1);
    }
    
    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }

    getListData = async(e=1,search='')=>{
        let {http,token} = this.state;
        let tt = `currentPage=${e}&projectid=5&pageSize=15&search=${search}`;
        let datas = await apigates(http,tt,token)
        console.log(datas,"ddddddddddddddddddddd")

        this.setState({
            progromsed:datas.data.data,
            pagenow:datas.data.totalPage,
            pagesnow:datas.data.currentPage,
            isFetching:false,
            loading:false
        })
        ToastAndroid.show('数据加载成功',ToastAndroid.SHORT)
    }
    refreshings(){
        this.getListData(1);
        ToastAndroid.show('数据已加载成功',ToastAndroid.SHORT)
        
    }
    async onChanegeTextKeyword(search) {
        this.setState({
            search:search
        },()=>{
            this.getListData(1,search);
        })
        
    }
    Dotwc(v){
        return(<View>
              {v.map((vd,i)=><TouchableOpacity 
                        // onPress={()=>this.props.navigation.navigate('MsgDetail',vd)} 
                        key={i} style={{marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}}>
                            <Text style={{color:'#0390e8',fontSize:16,
                                borderBottomColor:'#eee',borderBottomWidth:.5}}>姓名：{vd.name}</Text>
                            <Text style={{color:'grey'}}>标段编码：{vd.bid_no}</Text>
                            <Text style={{color:'grey'}}>卡号：{vd.id_card}</Text>
                            <Text style={{color:'grey'}}>身份证：{vd.identity}</Text>
                            <Text style={{color:'grey'}}>进出类型：{vd.type==0?'刷卡':''}</Text>
                            <Text style={{color:'grey'}}>卡片类型：{vd.card_type==1?'智芯卡':''}</Text>
                            <Text style={{color:'grey'}}>进站时间：{vd.create_time}</Text>
                            <Text style={{color:'grey'}}>出站时间：{vd.endTime}</Text>
                            <Text style={{color:'grey'}}>工作时长：{vd.work}</Text>
                        </TouchableOpacity>)}
        </View>)
    }
    render() {
        let {progromsed,isFetching} = this.state;
        return (<View style={{backgroundColor:'white',flex:1}}>
                    <HeaderBar   parent={this} name="工作量统计"/>
                    <View style={{flex:1,backgroundColor:'#eee'}}>
                        {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                        <ActivityIndicator color="#363434"/>
                        <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                        </View>}

                        {/* <View style={{width:'100%',borderBottomColor:'#999',justifyContent:"center",borderBottomWidth:.5,alignItems:'center',backgroundColor:'white',height:60}}>
                            <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                            <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                            <TextInput underlineColorAndroid={'transparent'} 
                                        value={this.state.search}
                                        multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                        style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} 
                                        placeholder="请输入"/>
                            </View>
                        </View> */}

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
                        <Pagination total={this.state.pagenow} current={this.state.pagesnow} onChange={(e)=>this.getListData(e)}/>
                        </View>
               
        </View>)
      }
  }
