/**
 * 
 * 甲供物资
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,Dimensions,ScrollView} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import Echarts from 'native-echarts'
import {materialTypeStatistics} from '../../api/api'
import config from '../../api/serviceAPI.config'




export default class Material extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,  
            option:{
                tooltip : {
                    trigger: 'item',
                },
                calculable : true,
                series: [
                    {
                        name:'物资分布',
                        type:'pie',
                        radius: [20, '90%'],
                        itemStyle : {
			                normal : {
			                    label : {
			                        position : 'inner',
			                        formatter : "{b}\n{d}%",
			                        textStyle : {
			                            color : 'rgba(255,255,255,1)',
			                            align : 'center',
			                            baseline : 'middle',
			                            fontFamily : '微软雅黑',
			                            fontSize : 6,
			                            fontWeight : 'bolder'
			                        }
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        formatter : "{b}\n{d}%"
			                    }
			                }
			                
			            },
                        data:[]
                    }
                ]
            },
            }
  }

  componentDidMount(){
      this.getDataList();
  }

  getDataList = async()=>{
    // jconfig.userinfo.projects[0].id
    let datas = await materialTypeStatistics(this.state.http,`projectid=${5}`)
    console.log(datas,"ggggggggggggggg")
    let newarrs = [];
    datas.data.map(item=>{
        newarrs.push({value:item.total,name:item.name})
    })
    this.state.option.series[0].data = newarrs;
    this.forceUpdate();
  }
  render() {
      const {option} = this.state; 
    
      return (<View style={{alignItems:'center',flex:1}}>
               <HeaderBar parent={this} name="甲供物资"/>
               <View style={styles.content}>
                    {/* 图表数据 */}
                    <View style={styles.echarts}>
                            <View style={styles.wuzi}>
                                <Text style={styles.fontColor}>物资分布</Text>
                            </View>
                            <View style={{width:"100%"}}>
                                <Echarts option={option} height={200} />
                            </View>
                            {/* <View style={styles.ehartItem}>
                                <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true}>
                                        <View style={styles.Listitem}>
                                            <View style={[styles.fangkuai,{backgroundColor:'red'}]}></View>
                                            <Text style={styles.fontstyle}>挖掘机</Text>
                                        </View>
                                        <View style={styles.Listitem}>
                                            <View style={[styles.fangkuai,{backgroundColor:'green'}]}></View>
                                            <Text style={styles.fontstyle}>推土机</Text>
                                        </View>
                                        <View style={styles.Listitem}>
                                            <View style={[styles.fangkuai,{backgroundColor:'lightgreen'}]}></View>
                                            <Text style={styles.fontstyle}>搅拌机</Text>
                                        </View>
                                        <View style={styles.Listitem}>
                                            <View style={[styles.fangkuai,{backgroundColor:'blue'}]}></View>
                                            <Text style={styles.fontstyle}>拖拉机</Text>
                                        </View>
                                        <View style={styles.Listitem}>
                                            <View style={[styles.fangkuai,{backgroundColor:'yellow'}]}></View>
                                            <Text style={styles.fontstyle}>钻井机</Text>
                                        </View>
                                </ScrollView>
                            </View> */}
                        </View>
                    <View style={styles.saomiao}>
                        <Image source ={require('../../images/bgimg.png')} style={{position:'absolute',bottom:0,height:'100%',width:'100%'}}/>
                        <TouchableOpacity style={styles.gotoSao}
                            activeOpacity={0.8}
                            onPress={()=>this.props.navigation.navigate('CodeReading',{tools:'Materail'})}
                        >
                            <Image resizeMode = 'contain' source = { require('../../images/Scan.png')} style = { { width: 25, height: 25 }}/> 
                            <Text style={{color:"#FFFFFF",top:8}}>立即扫码</Text>
                        </TouchableOpacity>
                        
                        {/* <View style={styles.cardList}>
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                // onPress={()=>this.props.navigation.navigate('CreateMaterial',{create:true})}
                                onPress={()=>this.props.navigation.navigate('Binding',{data:''})}
                            >
                                <Text style={{color:"#aaa"}}>绑定二维码</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>this.props.navigation.navigate('CardList')}
                            >
                                <Text style={{color:"#aaa"}}>二维码列表</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
               </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    wuzi:{
        height:30,
        justifyContent:'center',
        alignItems:'center',
      },
    fontColor:{
        width:'100%',
        color:"#000000",
    },
    jijulist:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'45%'
    },
    searchView:{
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'center',
        height:40,
    },
    searchInput:{
        fontSize:13, 
        color: '#363434',
        overflow:'hidden',
        width:'70%',
        height:40,
        padding:0
    },
    searchSelect:{  
        left:'5%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:120
    },
    gongList:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
      
    },
    echarts:{
        width:'100%',
        height:'45%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
      },
    ehartItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:'100%'
        },
    Listitem:{
        width:90,
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
        },
    fangkuai:{
        width:5,
        height:5
    },
    fontstyle:{
        fontSize:12,
        color:"#000",
        paddingTop:5,
        paddingBottom:5
    },
    toolsList:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
  
    saomiao:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:'49%',
    },
    gotoSao:{
        top:50,
       width:100,
       height:100,
       flexDirection:'column',
       alignItems:'center',
       justifyContent:'center',
       borderRadius:150,
       backgroundColor:'#0C6BAF' 
    },
    cardList:{
        width:'96%',
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
  })