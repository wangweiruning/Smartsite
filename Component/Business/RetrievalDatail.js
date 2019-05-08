/*标准详情*/

import React from 'react';
import {Image,TextInput,TouchableOpacity, ScrollView, FlatList,StyleSheet, Text, View } from 'react-native';
import HeaderBar from './../common/HeaderBar';
import config from '../../api/serviceAPI.config'

export default class ReDetile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            serialCode:this.props.navigation.state.params.item,
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        }
    }


    // async componentDidMount(){
    //     console.log(this.props.navigation.state.params)
    //     let keds = await pdetail(this.state.http,this.props.navigation.state.params.id);
    //     this.setState({
    //         // serialCode:keds.data,
    //         serialCode:this.props.navigation.state.params.item,

    //     })
    // }
    getNewWord(tt){
        if(tt==null) return '暂无详情';
        let patt = /<[^>]+>/g;
        let newStr = tt.replace(patt, '');
        return newStr
    }
    render(){
        let {serialCode} = this.state;
        return(<View style={{flex:1}}>
            <HeaderBar parent={this} name={'标准详情'}/>
            <ScrollView>
            <View style={{width:"100%",alignItems:"center",marginTop:10}}>
              <View style={{alignItems:'center',width:"95%",borderTopLeftRadius:5,borderTopRightRadius:5,backgroundColor:"#f5f5f5",flexDirection:'row',paddingTop:10,paddingBottom:10}}>
               {/* <Text style={{color:type==1?'red':'skyblue',padding:2,textAlign:'center',borderWidth:0.5,borderColor:type==1?'red':'skyblue',marginLeft:10}}>{type==1?'国':'企'}</Text> */}
               <Text style={{color:'black',fontSize:15,flex:1,marginLeft:10}}>{serialCode.name}</Text>
              </View>
              <View style={{backgroundColor:'white',width:'95%',padding:5}}>
               <Text>国标编号：<Text style={{color:'red'}}>{serialCode.serialCode}</Text></Text>
               <Text style={{marginTop:10}}>标准详情：{this.getNewWord(serialCode.summary)}</Text>
               <Text>创建时间：{serialCode.gmtCreate}</Text>
              </View>
            </View>
            </ScrollView>
        </View>)
    }
}