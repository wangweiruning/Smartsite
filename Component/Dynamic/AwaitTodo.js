/**
 * 
 * 待办事项
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,FlatList,RefreshControl,ToastAndroid} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import HaveNoData from './../common/HaveData';
import {checkquestion} from '../../api/api'
import {Pagination,ActivityIndicator} from 'antd-mobile-rn';
import config from '../../api/serviceAPI.config'

const locale = {
    prevText: '上一页',
    nextText: '下一页',
};


export default class AwaitTodo extends React.Component {

  constructor(props){
    super(props)
    this.state={
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
     token:jconfig.userinfo.token,
     toolsNum:5,
     listAllData:[],
     isLoading:false,
     currentPage:1,
     pageSize:10,
     pagesnow:1,
     pagenow:1,
     loading:true,
     bools:1
    }
  }

  componentDidMount(){
      this.getAllData();
      this.viewDidAppear=this.props.navigation.addListener(
        'willFocus', async(obj)=>{
            this.getAllData();
            this.setState({
                bools:this.state.bools+1,
            })
        
        }
     );
  }
  //获取所有的数据
  async getAllData(){
    let tts = {status:[0,1]};
    let listdata = await checkquestion(this.state.http,`projectId=5&requestType=dbgl&filters=${JSON.stringify(tts)}`,this.state.token)
    console.log(listdata)   
    if(listdata.isSuccess()){ 
        this.setState({
            listAllData:listdata.data.data,
            pagenow:listdata.data.totalPage,
            pagesnow:listdata.data.currentPage,
            loading:false
        })
    }else if(listdata.isCanUse()){
        this.setState({
            loading:false
        })
        ToastAndroid.show('无权访问待办事项',ToastAndroid.SHORT)
    }

  }

  async changepage(e){
    let tts = {status:[0,1]};
    let keds = await checkquestion(this.state.http,`projectId=${5}&currentPage=${e}&requestType=dbgl&filters=${JSON.stringify(tts)}`,this.state.token)
   if(keds.isSuccess()){
       if(!keds.data.data.length)ToastAndroid.show('暂无数据',ToastAndroid.SHORT)
       this.setState({
        listAllData:keds.data.data,
        pagesnow:keds.data.currentPage
    })
   }else if(keds.isCanUse()){
    ToastAndroid.show('无权访问待办事项',ToastAndroid.SHORT)
   }
    
  }

  renderItem=(items,index)=>{
          return (<TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('AwaitTrouble',{item:items})} style={{borderBottomColor:'#999',borderBottomWidth:.5,marginBottom:10,padding:5}}>
          <Text style={{color:'#51eea3'}}>{items.question}</Text>
          {/* <Text style={{color:'grey'}}>不合格项：{vd.unqualified}</Text> */}
          <Text style={{color:'#999'}}>依据：{items.gist!=null&&items.gist.name}</Text>
          <Text style={{color:'#999'}}>状态：{items.status==0?'待整改':items.status==1?'整改中':items.status==2?'已整改':''}</Text>
          <Text style={{color:'#999'}}>区域：{items.area&&items.area.local}</Text>
          <Text style={{color:'#999'}}>责任人：{items.checkMan?items.checkMan.realname:'暂无责任人'}</Text>
          <Text style={{color:'#999'}}>责任单位：{items.checkUnit?items.checkUnit.name:'暂无责任单位'}</Text>
          <Text style={{color:'#999'}}>检查时间：{items.checkTime}</Text>
          <Text style={{color:'#999'}}>整改截止时间：{items.deadline}</Text>
          <Text style={{color:'#999'}}>实际整改时间：{items.actulRectifyTime?items.actulRectifyTime:'暂无'}</Text>
          <Text style={{color:'#999'}}>实际复查时间：{items.actulReviewTime?items.actulReviewTime:'暂无'}</Text>
          {/* <View style={{flexDirection:'row',padding:10,borderBottomColor:'#999',borderBottomWidth:.5,borderTopWidth:.5,borderTopColor:'#999',overflow:'hidden'}}>
          {items.image.length>0 && items.image.map((v,i)=><Image key={i} source={{uri:this.state.http+v.path}} style={{width:90,height:60,marginRight:5}}/>)}
          </View> */}
          </TouchableOpacity>)
    }

    async onLoad(){
        let datas = await checkquestion(this.state.http,`projectId=${5}&currentPage=1&requestType=dbgl`,this.state.token)
       if(datas.isSuccess()){
           this.setState({
            listAllData:datas.data.data,
            pagenow:datas.data.totalPage,
            pagesnow:datas.data.currentPage
        })
        ToastAndroid.show('数据已刷新',ToastAndroid.SHORT)

       }
        
    }


    render() {
      return (<View style={{flex:1,backgroundColor:"#fff",flexDirection:'column'}}>
               <HeaderBar parent={this} name={`待办事项`}/>
               {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                  <ActivityIndicator color="#363434"/>
                  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                </View>}
               <View style={styles.content}>
                    <FlatList style={{height:'100%'}} keyExtractor={(item,index)=>index.toString()}
                        data={this.state.listAllData} 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={()=>this.onLoad()}
                                colors={['#11A6FF']}
                        />}
                        renderItem={({item,index}) => this.renderItem(item,index)}
                    />
                   {!this.state.listAllData.length && 
                    <View style={{width:'100%',justifyContent:'center',flexDirection:'column',top:'20%',position:'absolute'}}>
                        <HaveNoData  />
                    </View>
                    }
                    {this.state.listAllData.length>0 && <Pagination total={this.state.pagenow} 
                                current={this.state.pagesnow} 
                                locale={locale} 
                                onChange={(e)=>this.changepage(e)}/>}
               </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        width:'100%',
    },
    fontColor:{
        width:'100%',
        color:"#0C6BAF",
        left:15
    },
    ListItem:{
        paddingLeft:5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:5
    },
    leftItem:{
        width:'90%',
        justifyContent:'center',
        padding:5
    },
    subkey:{
        fontSize:14,
        color:"#000",
    },
    subvalue:{
        fontSize:14,
        color:"#000",
        padding:10,
        width:'80%'
    },
  })