/****
 * 
 * 大型机具详情查看
 */


import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TextInput} from 'react-native';
import HeaderBar from './../common/HeaderBar';





export default class BigToolsInfo extends React.Component {

  constructor(props){
    super(props)
    this.state={
	  }
  }
   componentDidMount(){

  }



  render() {
	  
	const {typeName,tool,projectid,createTime,token}=this.props.navigation.state.params.data;

      return (<View style={{alignItems:'center',backgroundColor:"#ffffff",flex:1}}>
               <HeaderBar parent={this} name={typeName+'详情'}/>
		
                <ScrollView style={{width:'100%'}}>
                    <View style={styles.content}>
						{this.state.toolsMsg!=""&&<View style={{width:'93%'}}>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>机具名称* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{tool.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>机具车牌* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{tool.number}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>归属* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{projectid!=null&&projectid.name}</Text>
							  </View>
							 
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>二维码绑定时间* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{createTime}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>二维码编号* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{token}</Text>
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