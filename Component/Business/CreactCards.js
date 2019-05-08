/* 制卡应用*/

import React from 'react';
import {Image,TextInput,TouchableOpacity, ScrollView, FlatList,StyleSheet, Text, View } from 'react-native';
import HeaderBar from '../common/HeaderBar';
import config from '../../api/serviceAPI.config'
export default class CreactCards extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newDatas:[],
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            cardData:[
            {name:'张薇',occupation:'施工队长',myCard:false,Hat:true,belt:false,img:require('../../images/avoter.png')},
            {name:'张玉',occupation:'质检员',myCard:false,Hat:false,belt:false,img:require('../../images/avoter.png')},
            {name:'王乐',occupation:'质检员',myCard:true,Hat:true,belt:false,img:require('../../images/avoter.png')},
            {name:'王嘉',occupation:'设计',myCard:false,Hat:true,belt:true,img:require('../../images/avoter.png')},
            {name:'王东',occupation:'门卫',myCard:false,Hat:true,belt:false,img:require('../../images/avoter.png')},
        ],
            dataLis:[
            {name:'张薇',occupation:'施工队长',myCard:false,Hat:true,belt:false,img:require('../../images/avoter.png')},
            {name:'张玉',occupation:'质检员',myCard:false,Hat:false,belt:false,img:require('../../images/avoter.png')},
            {name:'王乐',occupation:'质检员',myCard:true,Hat:true,belt:false,img:require('../../images/avoter.png')},
            {name:'王嘉',occupation:'设计',myCard:false,Hat:true,belt:true,img:require('../../images/avoter.png')},
            {name:'王东',occupation:'门卫',myCard:false,Hat:true,belt:false,img:require('../../images/avoter.png')},
        ]
        }
    }

    componentDidMount(){
      this.viewDidAppear = this.props.navigation.addListener(
        'willFocus', async(obj)=>{
           
        }
      );
    }

    onChanegeTextKeyword(text){
        if(!text){
          this.setState({
            dataLis:this.state.cardData
          });
          return;
         }
    
        else if(text){
          let newData = [];
          for (var i = 0; i < this.state.cardData.length; i++) {
              let ds = this.state.cardData[i];
              if(ds.name && ds.name.indexOf(text)!=-1){
                newData.push(ds);
              }
          }
          this.setState({
            dataLis:newData
          });
          return;
        }
      }


    render(){
        return(<View style={{width:'100%',height:'100%'}}>
            <HeaderBar name='制卡应用' parent={this} />
            <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:60}}>
                <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                  <TextInput underlineColorAndroid={'transparent'} multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                    style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} placeholder="请输入"/>
                </View>
            </View>
            <FlatList style={{height:'100%'}} data={this.state.dataLis} keyExtractor={(item,index)=>index.toString()} 
             renderItem={({item,index})=>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('CardDetail',{callback: (data)=>{
              this.setState({
                newDatas:data
              })
            },name:item.name,Hat:item.Hat,belt:item.belt,img:item.img})} key={index} style={{width:'100%',backgroundColor:'white',padding:5,flexDirection:'row',alignItems:'center',borderBottomWidth:this.state.dataLis.length==index+1?0:.5,borderBottomColor:"#999",borderStyle:"solid"}}>
               <View>
                <View style={{width:51,height:52,borderRadius:25.5,justifyContent:'center',alignItems:'center',borderColor:"#ccc",borderWidth:1,borderStyle:'solid'}}>
                <Image source={item.img} style={{width:51,height:51}}/>
                </View>
              </View>
               <View style={{marginLeft:10,flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:16}}>{item.name}</Text>
                    <Text style={{color:"#666",fontSize:13}}>{item.occupation}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:15,alignItems:"center"}}>
                    {/* <Text style={{color:'black',fontSize:13,marginRight:10}}>工牌</Text>
                    <Image source={item.myCard?require('../../images/right.png'):require('../../images/no.png')} style={{width:15,height:15}}/> */}
                    <Text style={{color:'black',fontSize:13,marginRight:10}}>安全帽</Text>
                    <Image source={item.Hat?require('../../images/right.png'):require('../../images/no.png')} style={{width:15,height:15}}/>
                    <Text style={{color:'black',fontSize:13,marginLeft:20,marginRight:10}}>安全带</Text>
                    <Image source={item.belt?require('../../images/right.png'):require('../../images/no.png')} style={{width:15,height:15}}/>
                </View>
               </View>
               <Image source={require('../../images/cardgo.png')} style={{width:20,height:20,marginRight:5}}/>
             </TouchableOpacity>
            }/>
        </View>)
    }
} 
