/**
 * 检查亮点
 * 
 */
import { Tabs,Pagination,ActivityIndicator} from 'antd-mobile-rn';

import React from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View ,TouchableOpacity,TextInput,ToastAndroid} from 'react-native';
import FindTitle from './FindTitle';
import MySorage from '../../api/storage';
import {lightSearch} from '../../api/api'
import config from '../../api/serviceAPI.config'
import HaveNoData from './../common/HaveData'

const locale = {
    prevText: '上一页',
    nextText: '下一页',
};
export default class BrightSpot extends React.Component {

  constructor(props){
    super(props)
    MySorage._getStorage();
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        data:[],
        isFetching:false,
        isFetching1:false,
        bools:1,
        brightspot:[],
        searchValue:'',
        token:window.jconfig.userinfo.token||'',
        pagesnow:1,
        pagenow:1,
        loading:true

  }

}

 componentDidMount(){
    this.getUserInfo();
    this.getAllLightMsg(1);
    this.viewDidAppear = this.props.navigation.addListener(//返回来重新获取数据
        'willFocus', async(obj)=>{
            this.getUserInfo();
            this.getAllLightMsg(1);
                this.setState({
                    bools:this.state.bools+1,
                })
          }
      );
}
async getAllLightMsg(pagesnow){
    let {searchValue}  = this.state;
    let data ='search='+searchValue+"&currentPage="+pagesnow+"&pageSize=10";
    let list = await lightSearch(this.state.http,data);
	console.log(list,'22222222222')
    if(list.isSuccess()){
        this.setState({
            data:list.data.data,
            pagenow:list.data.totalPage,
            pagesnow:list.data.currentPage,
            loading:false
        })
    }else if(list.isCanUse()){

        this.setState({
            loading:false
        })
        ToastAndroid.show(list.message,ToastAndroid.SHORT)
    }
} 
async getUserInfo () {
    try {
      MySorage._load("brightspot",(data)=>{
      let res = data;
      if (!res) {
        this.setState({
            brightspot:[]
          })
      }else{
          this.setState({
            brightspot:JSON.parse(res)
          })
      }
    })
    }catch(e){
        let arrs = [];
        MySorage._sava("brightspot", JSON.stringify(arrs))
   }
}

onRefresh=(isFetching)=>{//刷新功能
    this.setState({
       [isFetching]:true,
   })
   this.getAllLightMsg(1);
   
}

onChanegeTextKeyword=(e)=>{//搜索获取关键字
    this.setState({
      searchValue:e
    })
  }

  searchData=()=>{//搜索从新获取数据
    if(this.state.searchValue=='')return  ToastAndroid.show('关键字不能为空',ToastAndroid.SHORT);
    this.getAllLightMsg(1);
  }


  async changepage(e){
    let {searchValue}  = this.state;
    let data ='search='+searchValue+"&currentPage="+e+"&pageSize=10";
    let list = await lightSearch(this.state.http,data,this.state.token);
    this.setState({
        data:list.data.data,
        // dataLis:keds.data.data,
        pagesnow:list.data.currentPage
      })
    }


  render() {
    const tabs = [
        { title: '已上传' }, 
         { title: '未上传' },
      ];

    let  {isFetching,isFetching1,brightspot,data,loading} =this.state;
    let propsDate =  this.props.navigation.state.params;
      return (<View style={{alignItems:'center',flex:1}}>
                <FindTitle name={"检查"+propsDate.names} parent={this} rightRouteTo={'CreateBrightSpot'}  haveRoute={true}
                  isShow={this.state.isShow} showModel={this.showModel} haveSearch={false}/>
                
                <View style={{flex:1}}>
                   <Tabs tabs={tabs}  swipeable={false}>
                        <View style={styles.style}>
                            {!loading?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                            <ActivityIndicator color="#363434"/>
                            <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                            </View>}
                            <ScrollView  keyboardShouldPersistTaps={'never'}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetching1}
                                    onRefresh={()=>this.onRefresh(isFetching1)}
                                    colors={['rgb(217, 51, 58)']}
                                />
                            }>
                            
                            <View style={styles.searchView}> 
                                <TextInput underlineColorAndroid={'transparent'} 
                                    multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                    style={styles.searchInput} placeholder="请输入关键字"/>
                                <TouchableOpacity activeOpacity={0.5}
                                    onPress={()=>this.searchData()}>
                                    <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                                </TouchableOpacity>
                            </View>
                            {!loading&&data.length?data.map((item,index)=>{
                                    let {attachs} = item;
                                    return <TouchableOpacity onPress={()=>this.props.navigation.navigate('MsgBrightSpot',item)} 
                                    style={{flexDirection:'row',marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}} key={index}>
                                                <View style={styles.leftTexts}>
                                                    <Text style={{color:'#ffffff'}}>{'亮点'}</Text>
                                                </View>
                                                <View style={styles.rightContent}>
                                                    <Text style={{fontSize:14,color:"#1884CD",paddingRight:15}}>{item.remark}</Text>
                                                    <Text style={{fontSize:12}}>责任单位: {item.mechanism.name}</Text>
                                                    <Text style={{fontSize:12}}>
													具体地点:{item.region!=null?item.region.local:'暂无'}
													</Text>
                                                    <View style={styles.itemOfPerson}>
                                                        <Text style={{fontSize:12}}>创建时间: {item.create_time}</Text>
                                                        {/* <Text style={{fontSize:12,right:10}}>检查人: {item.beizhu}</Text> */}
                                                    </View>
                                                    
                                                    <View style={styles.itemImg}>
                                                        <View style={{flexDirection:"row",width:"96%",flexWrap:'wrap'}}>
                                                            {attachs.length>0&&attachs.map((subItem,SubIndex)=>{
                                                            return <View style={{width:100,height:80,padding:5}} key={SubIndex}>
                                                            <Image source={{uri:this.state.http+subItem.path}} style={{width:'100%',height:'100%'}}/>  
                                                        </View>
                                                        })} 
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        }):<HaveNoData  />}
                            </ScrollView>
                            {data.length>0&&<Pagination total={this.state.pagenow} 
                                current={this.state.pagesnow} 
                                locale={locale} 
                                onChange={(e)=>this.changepage(e)}/>}
                        </View>

                        <View style={styles.style}>
                            <ScrollView  keyboardShouldPersistTaps={'never'}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={()=>this.onRefresh(isFetching)}
                                    colors={['rgb(217, 51, 58)']}
                                />
                            }>
                            {/* <View style={styles.searchView}> 
                                <TextInput underlineColorAndroid={'transparent'} 
                                    multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                    style={styles.searchInput} placeholder="请输入关键字"/>
                                <TouchableOpacity activeOpacity={0.5}
                                    onPress={()=>this.searchData()}>
                                    <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                                </TouchableOpacity>
                            </View> */}
                        {
                            brightspot.length?brightspot.map((item,keyindex)=>{
                                let list =item.avatarSource;
                                return <TouchableOpacity style={{flexDirection:'row',marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}} key={keyindex} 
                                            onPress={()=>this.props.navigation.navigate('CreateBrightSpot',{item,indexid:keyindex})}>
                                            <View style={styles.leftTexts}>
                                                <Text style={{color:'#ffffff'}}>{'亮点'}</Text>
                                            </View>
                                            <View style={styles.rightContent}>
                                                <Text style={{fontSize:14,color:"#1884CD",paddingRight:15}}>{item.remark}</Text>
                                                <Text style={{fontSize:12}}>责任单位: {item.mechanism_id}</Text>
                                                <Text style={{fontSize:12}}>责任部门: {item.departments_id}</Text>
                                                <Text style={{fontSize:12}}>具体地点: {item.region==null?'暂无':item.region}</Text>
                                                <View style={styles.itemOfPerson}>
                                                    <Text style={{fontSize:12}}>创建时间: {item.clock}</Text>
                                                    {/* <Text style={{fontSize:12,right:10}}>检查人: {item.createman}</Text> */}
                                                </View>
                                                <View style={styles.itemImg}>
                                                    <View style={{flexDirection:"row",width:"96%",flexWrap:'wrap'}}>
                                                        {list.length>0&&list.map((subItem,SubIndex)=>{
                                                        return <View style={{width:100,height:80,padding:5}} key={SubIndex}>
                                                        <Image source={{uri:subItem.uri}} style={{width:'100%',height:'100%'}}/>  
                                                    </View>
                                                    })} 
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                            }): <HaveNoData  />
                         }
                            </ScrollView>
                        </View>
                    </Tabs>
               </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      width:'100%',
      marginTop:50
    },
    bottom:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
        borderBottomWidth:5,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        paddingBottom:10
    },
    leftText:{
        width:35,
        height:35,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F7A12C',
    },
    leftTexts:{
        width:35,
        height:35,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1884CD',
    },
    rightContent:{
        left:5,
        width:"88%",
        justifyContent:'center',
        flexDirection:'column'
    },
    itemOfPerson:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:10,
       borderBottomWidth:2,
        borderBottomColor:'#eeeeee',
        borderStyle:'solid'
    },
    itemImg:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingTop:10
    },
    anzhaung:{
        width:"90%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0C6BAF',
        borderRadius:10
    },
    gotuditu:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0C6BAF',
        borderRadius:50,
        position:'absolute',
        right:20,
        bottom:100
    },
    style :{
        flex:1,
        backgroundColor: '#eee',
      },
    searchView:{
       marginTop:10,
       marginBottom:10,
       backgroundColor:'#fff',
       flexDirection:'row',
       alignItems:'center',
       height:40,
       paddingLeft:20,
       paddingRight:20,
       borderRadius:20
   },
   searchInput:{
       fontSize:13, 
       color: '#363434',
       overflow:'hidden',
       width:'95%',
       height:40,
       padding:0
   },
  })