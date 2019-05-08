/**
 * 
 * 人员检索
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,FlatList,RefreshControl,TextInput,ToastAndroid} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import HaveNoData from './../common/HaveData';
import {listuser} from '../../api/api'
import {Pagination,ActivityIndicator} from 'antd-mobile-rn';
import MySorage from '../../api/storage';
import config from '../../api/serviceAPI.config'



export default class PeopleLook extends React.Component {

  constructor(props){ 
    super(props)
    this.state={
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
     token:jconfig.userinfo.token,
     toolsNum:5,
     listAllData:null,
     isLoading:false,
     currentPage:1,
     pageSize:10,
     pagesnow:1,
     pagenow:1,
     loading:true,
     bools:1,
     search:''
    }
  }

  componentDidMount(){
      this.getAllData('');
      this.viewDidAppear=this.props.navigation.addListener(
        'willFocus', async(obj)=>{
            this.getAllData('');
            this.setState({
                bools:this.state.bools+1,
            })
        
        }
     );
  }
  //获取所有的数据
   async getAllData(search=''){
     
        let listdata = await listuser(`projectid=5&searchValue=${search}&currentPage=1&pageSize=500`)
        console.log(listdata)
        if(listdata.isSuccess()){
            this.setState({
                listAllData:listdata.data.data,
                loading:false,
                search:''
            })
        }else if(listdata.isCanUse()){
            this.setState({
                loading:false
            })
            ToastAndroid.show('无权访问',ToastAndroid.SHORT)
        }
    
  }



  renderItem=(items,index)=>{
          return (<TouchableOpacity key={index} 
          onPress={()=>this.props.navigation.navigate('MsgPeopleLook',{item:items})} 
          style={{borderRadius:5,padding:10,backgroundColor:"white",margin:10}}>
                        <Text style={{color:'#999'}}>姓名：{items.realname}</Text>
                        <Text style={{color:'#999'}}>电话：{items.phonenum}</Text>
                        <Text style={{color:'#999'}}>ID卡：{items.card}</Text>
                        <Text style={{color:'#999'}}>所属单位: {items.mechanism!==null&&items.mechanism.name}</Text>
          </TouchableOpacity>)
    }

     onLoad(){
        this.getAllData('');
    }

    async onChanegeTextKeyword(search) {
        this.setState({
            search:search
        },()=>{
            this.getAllData(search);
        })
        
    }


    render() {
      return (<View style={{flex:1,flexDirection:'column'}}>
               <HeaderBar parent={this} name={`人员检索`}/>
               {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                  <ActivityIndicator color="#363434"/>
                  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                </View>}

                <View style={{width:'100%',borderBottomColor:'#999',justifyContent:"center",borderBottomWidth:.5,alignItems:'center',backgroundColor:'white',height:60}}>
                    <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                    <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                    <TextInput underlineColorAndroid={'transparent'} 
                                value={this.state.search}
                                multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} 
                                placeholder="请输入"/>
                    </View>
                </View>

               <View style={styles.content}>
                    {this.state.listAllData!=null && <FlatList style={{height:'100%'}} keyExtractor={(item,index)=>index.toString()}
                        data={this.state.listAllData} 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={()=>this.onLoad()}
                                colors={['#11A6FF']}
                        />}
                        renderItem={({item,index}) => this.renderItem(item,index)}
                    />}
                   {this.state.listAllData==null && 
                    <View style={{width:'100%',justifyContent:'center',flexDirection:'column',top:'20%',position:'absolute'}}>
                        <HaveNoData  />
                    </View>
                    }
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