/****
 * 
 * 工器具列表
 */


import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TextInput} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {getToolByparam} from '../../api/api';
import {ActivityIndicator} from 'antd-mobile-rn'
import config from '../../api/serviceAPI.config'




export default class ToolsList extends React.Component {

  constructor(props){
    super(props)
    this.state={
       searchValue:'',
     newdatas:[],
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,	
	}
  }
  async componentDidMount(){
	  this.getlistdata();
  }
  async getlistdata(){
	  let datas = this.props.navigation.state.params;
	  console.log(datas,"ffffff")
	  let getnewData = await getToolByparam(this.state.http,datas.id);
	  console.log(getnewData,"得到相关的所有数据");
	  
	  this.setState({
	  		  newdatas:getnewData.data,
	  })
  }
  onChanegeTextKeyword(e){//搜索获取关键字
    this.setState({
      searchValue:e
    })
	if(this.state.searchValue==""){
		this.getlistdata();
	}
  }

  searchData=()=>{//搜索从新获取数据
    alert('获取新的搜索到的数据')
  }

  render() {
	  
	const {title}=this.props.navigation.state.params;

      return (<View style={{alignItems:'center',backgroundColor:"#ffffff",flex:1}}>
               <HeaderBar parent={this} name={title}/>
				{this.state.newdatas.length==0&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
				  <ActivityIndicator color="#363434"/>
				  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
				</View>}
               <View style={styles.searchView}> 
                    <TextInput underlineColorAndroid={'transparent'} 
                        multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                        style={styles.searchInput} placeholder="请输入工器具名称"/>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={()=>this.searchData()}>
                        <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{width:'100%'}}>
                    <View style={styles.content}>
                          {this.state.newdatas.length>0&&this.state.newdatas.map((item,index)=>{
                              return <TouchableOpacity 
                                          activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('ToolsMsg',{title:item.name,id:item.id})}
                                          style={styles.items} key={index}>
                              <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>工器具名称</Text>
                                      <Text style={{color:"#CCC",fontSize:12}}>{item.name}</Text>
                              </View>
                               <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>工器具类型</Text>
                                      <Text style={{color:"#CCC",fontSize:12}}>{item.type!==null&&item.type.toolname}</Text>
                              </View>
                              <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>绑定二维码</Text>
                                      <Text style={{color:"#CCC",fontSize:12}}>{item.qrCode!==null&&item.qrCode.token}</Text>
                              </View>
                              <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>创建时间</Text>
                                      <Text style={{color:"#CCC",fontSize:12}}>{item.approachTime}</Text>
                              </View>
                              <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>检查周期</Text>
                                      <Text style={{color:"#CCC",fontSize:12}}>{item.period!==null&&item.period.period}</Text>
                              </View>
                              <View style={styles.SubItem}>
                                      <Text style={{color:"#000000",fontSize:12}}>完整程度</Text>
                                      <Text style={{color:"#FB7273",fontSize:12}}>{item.complete!=null&&item.complete.completename}</Text>
                              </View>
                          </TouchableOpacity>
                          })}
                          
                    </View>
               </ScrollView>
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
        padding:10
    },
    items:{
        flexDirection:'column',
        justifyContent:'center',
        borderColor:"#11A6FF",
        borderWidth:2,
        borderRadius:10,
        marginBottom:10,
        width:'80%'
      },
         searchView:{
           marginTop:10,
          backgroundColor:'#eee',
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
          width:'73%',
          height:40,
          padding:0
      },
  })