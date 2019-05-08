/****
 * 
 * 工器具详情
 */


import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TextInput} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {getToolById} from '../../api/api';
import {ActivityIndicator} from 'antd-mobile-rn'
import config from '../../api/serviceAPI.config'




export default class ToolsMsg extends React.Component {

  constructor(props){
    super(props)
    this.state={
		toolsMsg:'',
		http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
	  }
  }
  async componentDidMount(){
	  this.getlistdata();
  }
  async getlistdata(){
	  let datas = this.props.navigation.state.params;
	  console.log(datas.id,"ffffff")
	  let getnewData = await getToolById(this.state.http,datas.id);
	  console.log(getnewData,"得到具体工器具的所有数据");
	  
	  this.setState({
	  		  toolsMsg:getnewData.data,
	  })
  }



  render() {
	  
	const {title}=this.props.navigation.state.params;
	const data = this.state.toolsMsg;
      return (<View style={{alignItems:'center',backgroundColor:"#ffffff",flex:1}}>
               <HeaderBar parent={this} name={title}/>
				{this.state.toolsMsg==""&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
				  <ActivityIndicator color="#363434"/>
				  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
				</View>}
                <ScrollView style={{width:'100%'}}>
                    <View style={styles.content}>
						{this.state.toolsMsg!=""&&<View style={{width:'93%'}}>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>工器具名称* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>工器具类型* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.type!=null&&data.type.toolname}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>创造单位* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.mechanism!=null&&data.mechanism.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>创造部门* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.departments!=null&&data.departments.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>负责人* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.responsePerson!=null&&data.responsePerson.realname}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>负责人电话* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.phone}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>使用单位* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.useUnit!=null&&data.useUnit.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>使用部门* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.useDepartments!=null&&data.useDepartments.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>使用人* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.usePerson!=null&&data.usePerson.realname}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>检验单位* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.checkUnit!=null&&data.checkUnit.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>检验证编号* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.number}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>技术参数* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.para}</Text>
							  </View>
							  
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>工器具状态* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.status!=null&&data.status.toolstatus}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>检查周期* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.period!=null&&data.period.period}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>进场时间* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.approachTime}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>完整程度* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{data.complete!=null&&data.complete.completename}</Text>
							  </View>
						</View>}
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