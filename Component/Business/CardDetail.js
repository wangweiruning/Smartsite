/* 制卡详情*/

import React from 'react';
import {Image,TextInput,TouchableOpacity, ScrollView, FlatList,StyleSheet, Text, View } from 'react-native';
import HeaderBar from './../common/HeaderBar';

export default class CardDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            detail:[
                {title:'安全帽',myCard:this.props.navigation.state.params.Hat,img:require('../../images/Hat.png')},
                {title:'安全带',myCard:this.props.navigation.state.params.belt,img:require('../../images/belt.png')}
            ]
        }
    }

    change(i){
        // let detail = this.state.detail;
        // detail[i]['myCard']=true
        // let a = {...detail[i],myCard:true};
        this.state.detail[i]['myCard']=true;
        this.forceUpdate();

        // this.setState({detail})

       
        // this.setState(prevState => ({
        //     detail: [{
        //         ...prevState.detail[i],
        //         myCard:true
        //     }]
        // }));
    // this.setState({detail:[...this.state.detail]})
    }


    render(){
        return(<View>
            <HeaderBar data={this.state.detail} call={this.props.navigation.state.params.callback} parent={this} name={'标签'} />
            <View style={{width:"100%",height:150,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <View style={{marginTop:5,width:60,height:60,borderRadius:30,justifyContent:'center',alignItems:'center',borderColor:"#ccc",borderWidth:1,borderStyle:'solid'}}>
                <Image source={this.props.navigation.state.params.img} style={{width:60,height:60}}/>
            </View>
            <Text style={{fontSize:16,color:"black",marginTop:5}}>{this.props.navigation.state.params.name}</Text>
            </View>
            <View style={{width:"100%",backgroundColor:'white',marginTop:10}}>
            {
                this.state.detail.map((v,i)=>{
                    return(<View key={i} style={{alignItems:'center',flexDirection:'row',width:'100%',height:80,borderBottomWidth:1,borderBottomColor:"#999",borderStyle:"solid"}}>
                    <View style={{flexDirection:'row',flex:1}}>
                      <Image source={v.img} style={{width:50,height:50,marginLeft:8}} />
                      <View style={{alignItems:'stretch',marginLeft:10}}>
                        <Text style={{color:'#666',marginTop:3}}>{v.title}</Text>
                        <Text style={{color:'#666',marginTop:10}}>{v.myCard?'已绑定':'未绑定'}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={()=>this.change(i)} style={{marginRight:15,borderColor:'skyblue',borderWidth:1,borderStyle:'solid',width:60,height:30,justifyContent:"center",alignItems:'center'}}>
                        <Text style={{color:'skyblue',fontSize:16}}>{v.myCard?'已绑定':'绑定'}</Text>
                    </TouchableOpacity>
                  </View>)
                })
            }
            </View>
        </View>)
    }
}