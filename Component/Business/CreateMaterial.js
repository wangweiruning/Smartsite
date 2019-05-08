/**
 * CreateMaterial.js
 * 物资创建  物资信息
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TextInput,ToastAndroid} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {tpmaterMsg} from '../../api/api'
import config from '../../api/serviceAPI.config'

export default class CreateMaterial extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        datas:'',
        startAddress:'',
        endAddress:''
    }
  }

  componentDidMount(){
    this.getListItem();
  }

  getListItem = async()=>{
        let id = this.props.navigation.state.params.datas.id;
        let otherid = this.props.navigation.state.params.datas.otherid;
        let userfulID = otherid==undefined?id:otherid;
        let list  =  await tpmaterMsg(this.state.http,userfulID)
        
        this.setState({
            datas:list.data,
            startAddress : JSON.parse(list.data.startAddress),
            endAddress :JSON.parse(list.data.endAddress),
        })
    }


submit = () => {
    let {datas,startAddress,endAddress} =  this.state;
    this.props.navigation.navigate('MaterialLuxian',{datas,startAddress,endAddress})
}
  render() {
    let {datas,startAddress,endAddress} = this.state; 

    console.log(datas,"ggggggggg")
      return (<View style={{alignItems:'center',height:'100%',width:'100%'}}>
               <HeaderBar   parent={this} name={"物资信息"}/>
               
                 <ScrollView style={{width:'100%'}}> 
                    <View style={styles.content}>
						{datas!=''&&<View style={{width:'93%'}}>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>物资名称* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.materialName}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>合同编号* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.materialContractNo}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>所属工程* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.projectid!=null&&datas.projectid.name}</Text>
							  </View>
							 
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>物资类型* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.materialType!=null&&datas.materialType.name}</Text>
							  </View>
							  <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>物料描述* </Text>
                                <View style={{flexDirection:'row',alignItems:'center',width:'70%'}}>
                                    <Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.materialRemark}</Text>
                                </View>
								
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>物料数量* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.materialNumber+datas.materialUnit}</Text>
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>创建时间* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{datas.createTime}</Text>
							  </View>

                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>发货人* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{startAddress.contact}</Text>
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>发货人电话* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{startAddress.phone}</Text>
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>发货地址* </Text>
                                <View style={{flexDirection:'row',alignItems:'center',width:'70%'}}>
								    <Text style={{color:'black',fontSize:16,marginRight:5}}>{startAddress.address}</Text>
                                </View>
                              </View>

                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>收货人* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{endAddress.contact}</Text>
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>收货人电话* </Text>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>{endAddress.phone}</Text>
							  </View>
                              <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
								<Text style={{color:'black',fontSize:16,marginRight:5}}>收货地址* </Text>
                                <View style={{flexDirection:'row',alignItems:'center',width:'70%'}}>
								    <Text style={{color:'black',fontSize:16,marginRight:5}}>{endAddress.address}</Text>
							    </View>
                              </View>
						</View>}
                    </View>
                    </ScrollView> 
                    <TouchableOpacity 
                        style={styles.searchs}
                        activeOpacity={0.8}
                        onPress={()=>this.submit()}>
                        <Text style={{color:"#FFF"}}>{"查看路线信息"}</Text>
                    </TouchableOpacity>         
               
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:'100%', 
      marginTop:5,
      paddingBottom:10
    },
    top:{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        marginTop:5,
        marginBottom:10,
        backgroundColor:"#FFF"
    },
    topLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    topRight:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    centerList:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    centers:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'baseline',
        padding:10,
        backgroundColor:"#FFF"
    },
    centersLeft:{
        width:50,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    yuan:{
        width:30,
        height:30,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    lines:{
        width:2,
        height:'100%',
        backgroundColor:"#AAA"
    },
    centersRight:{
        width:'80%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'baseline'
    },
    centersImage:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:5
    },
    textstyle:{height:20,padding:0},
    searchs:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#12A6FF',
    },
    upload:{
        width:100,
        height:50,
        marginRight:10,
        marginBottom:5,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderColor:'#aaa',
        borderWidth:1,
        borderStyle:'solid'
    },
    input:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    inputitem:{width:'80%',padding:0}
  })