/**
 * 甲供物资扫码信息
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';

import HeaderBar from './../common/HeaderBar';


export default class MaterialMsg extends React.Component {

  constructor(props){
    super(props)
    this.state={
        times:5,
        TextValue:'完结',
        data:[{
            TextValue:'出厂',
            time:'2019-01-12 15:25:34',
            beizhu:'总算完成了啊',
            gongsi:'是法国发公司',
            dizhi:'贵州省贵阳市德福中心',
            list:[{url:require('../../images/project.png')},{url:require('../../images/shipin.png')}]
        },{
            TextValue:'验收',
            time:'2019-01-12 15:25:34',
            beizhu:'总算完成了啊',
            gongsi:'是法国发公司',
            dizhi:'贵州省贵阳市德福中心',
            list:[{url:require('../../images/project.png')},{url:require('../../images/shipin.png')}]
        },{
            TextValue:'验收',
            time:'2019-01-12 15:25:34',
            beizhu:'总算完成了啊',
            gongsi:'是法国发公司',
            dizhi:'贵州省贵阳市德福中心',
            list:[{url:require('../../images/project.png')},{url:require('../../images/shipin.png')}]
        },
    ]
    }
  }

  render() {
  const datas = this.state.data;
      return (<View style={{alignItems:'center',flex:1,backgroundColor:'#FFFFFF'}}>
               <HeaderBar  parent={this} name="物资信息"/>
               <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.headTop}>
                            <Text style={{fontSize:14,fontWeight:'200'}}>状态</Text>
                        </View>
                        <View style={styles.headBottom}>
                            <Text style={{fontSize:12}}>已验收</Text>
                            <Text style={{color:"#345678",fontSize:12,right:40}}>扫描次数 共{this.state.times}次</Text>
                        </View>
                    </View>
               </View>
               <View style={{width:'100%',height:'70%'}}>
               <ScrollView>
               {datas.map((item,index)=>{
                   let {list} = item;
                   return <View style={styles.bottom}>
                            <View style={styles.leftText}>
                                <Text style={{color:'#ffffff'}}>{item.TextValue}</Text>
                            </View>
                            <View style={styles.rightContent}>
                                <Text style={{paddingVertical:5,fontSize:14}}>{item.gongsi}</Text>
                                <View style={styles.itemImg}>
                                {list.length>0&&list.map((subItem,SubIndex)=>{
                                    return <View style={{width:100,height:80,padding:10}}>
                                    <Image source={subItem.url} style={{width:'100%',height:'100%'}}/>  
                                </View>
                                })} 
                                </View>
                                <Text style={{fontSize:12}}>{item.time}</Text>
                                <Text style={{fontSize:12}}>{item.dizhi}</Text>
                                <Text style={{fontSize:12}}>备注:{item.beizhu}</Text>
                            </View>
                        </View>
               })}
               </ScrollView>
               </View>
               <TouchableOpacity activeOpacity={0.8} 
                    onPress={()=>{alert('确认安装')}}
                    style={styles.anzhaung}>
                   <Text style={{color:"#FFFFFF"}}>确认安装</Text>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.8} 
                    onPress={()=>{alert('确认安装')}}
                    style={styles.gotuditu}>
                   <Image source={require('../../images/map.png')} style={{width:'100%',height:'100%'}}/>
               </TouchableOpacity>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      width:'100%',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10,
      borderColor:"#eee",
      borderTopWidth:1,
      borderBottomWidth:1,
      borderStyle:"solid",
      padding:10
    },
    header:{
        width:'95%',
        flexDirection:'column',
        justifyContent:'center',
    },
    headTop:{
        width:'100%',
        justifyContent:'center'
    },
    headBottom:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    bottom:{
        width:"90%",
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
    },
    leftText:{
        width:35,
        height:35,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
    },
    rightContent:{
        left:10,
        width:"80%",
        justifyContent:'center',
        flexDirection:'column'
    },
    itemImg:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingTop:10
    },
    anzhaung:{
        width:"80%",
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
    }
  })