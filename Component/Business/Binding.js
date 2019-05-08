/**
 * Bingding.js
 * 绑定物资
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TextInput,ToastAndroid} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import SelectDialog from 'react-native-select-dialog';
import {BindingSq,BigTool,getQRtools} from '../../api/api'
import config from '../../api/serviceAPI.config'
export default class Binding extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        tollsType:[],
        initlistTxt:'请选择设备',
        listVal2:'',
        toolname:'',
        toolcard:'',
		token:'',
		otherid:'',
		isBind:true,
		type:1
    }
  }

  async  componentDidMount(){
		//获取扫码传递过来数据
      console.log('获取扫码获取数据',this.props.navigation.state.params)
      let {data} = this.props.navigation.state.params;
      if(data) this.setState({
		  token:data.token,
		  type:data.type
      })
     this.gettoolslist(data.type);
  }

	async gettoolslist(istools){
        let data = [];
        console.log(istools,"fffffffffff")
        let paramsList = `type=${istools}&project=${5}`
        let  dataitem = await getQRtools(this.state.http,paramsList);//获取未绑定的----工器具/大型机具、物资信息
       console.log(dataitem,"66666666666666666666")
        data = dataitem.data;
		let tools = [];
		data.map(item=>{
			tools.push({id:item.id,txt:item.name||item.material_name});
        })
        
		this.setState({
			tollsType:tools
		})
		
	}
 
    submit = async() => {
        let {token,otherid,isBind,type} = this.state;
        if(otherid){
			let data = {
				token,otherid,isBind,type
			};
			console.log(data)
			try{
				let result = await BindingSq(this.state.http,data);
					console.log(result,"gggggggggggg")
					
					if(result.code=='S10000'){
						 this.setState({
							otherid:''
							})
				    this.props.navigation.navigate('CardList');
				    ToastAndroid.show(`二维码绑定成功`,ToastAndroid.SHORT);
				}else if(result.code == 'S10001'){
				    ToastAndroid.show(result.message,ToastAndroid.SHORT)
				}else{
				ToastAndroid.show('请选择绑定设备',ToastAndroid.SHORT)	
				}
			}catch(e){
				//TODO handle the exception
				ToastAndroid.show('网络连接错误',ToastAndroid.SHORT)
			}
		}else{
				ToastAndroid.show('请选择绑定设备',ToastAndroid.SHORT)	
		}
    }

    changList(item,index){
        this.setState({
            listVal2:item.txt,
			otherid:item.id
        })		
        }
    showList(){
            this.refs.showList.show()
        
    }

  render() {
      let {tollsType,listVal2,type} =this.state;
      return (<View style={{alignItems:'center',height:'100%',width:'100%',backgroundColor:"#FFF"}}>
               <HeaderBar   parent={this} name={'二维码绑定'}/>
                <ScrollView style={{width:'100%'}}> 
                    <View style={{flexDirection:'column',justifyContent:'center',flex:1,width:'100%'}}>
                        <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'95%'}}>
                                <View style={{width:'30%'}}>
                                     <Text style={{fontSize:16}}>二维码类型：</Text>
                                </View>
                                <View style={{justifyContent:'center',height:35,width:'70%',borderBottomColor:'#999',
                                    borderBottomWidth:1,borderStyle:'solid',borderTopColor:'#999'}} >
                                    <Text>{type==1?'工器具':type==2?'大型机具':'物资名称'}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'95%'}}>
                                <View style={{width:'30%'}}>
                                     <Text style={{fontSize:16}}>设备名称：</Text>
                                </View>
                                <View style={{justifyContent:'center',height:35,width:'70%',borderBottomColor:'#999',
                                    borderBottomWidth:1,borderStyle:'solid',borderTopColor:'#999'}} >
                                    <View style={{paddingVertical:10}}>
                                                <TouchableOpacity style={{flexDirection:'row',height:40,left:10}}  
                                                    onPress={()=>this.showList('showList')}
                                                    underlayColor="transparent">
                                                <View style={styles.gongList}>
                                                    <Text style={{left:5,color:listVal2?'#000':"#AAA",fontSize:16}}> {listVal2?listVal2:this.state.initlistTxt} </Text>
                                                    <Image style={{width:18,height:18}} source={require('../../images/setdown.png')} />
                                                </View>
                                            </TouchableOpacity>
                                            <SelectDialog 
                                                ref={'showList'} 
                                                titles={'请选择设备'} 
                                                valueChange={this.changList.bind(this)} 
                                                datas={tollsType}
                                                animateType={'fade'}
                                                positionStyle={{backgroundColor:"#1884CD"}}			  
                                                />
                                            </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                   
                  <TouchableOpacity 
                      style={styles.searchs}
                      activeOpacity={0.8}
                      onPress={()=>this.submit()}>
                      <Text style={{color:"#FFF"}}>{"提交绑定"}</Text>
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
    inputitem:{width:'80%',padding:0},
    gongList:{
       width:'85%',
       flexDirection:"row",
       alignItems:'center',
       justifyContent:'space-between',
   },
  })