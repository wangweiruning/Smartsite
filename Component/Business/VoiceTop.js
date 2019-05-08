/* 导航列表*/

import React from 'react';
import {Text,View,TouchableOpacity,FlatList,Image,TextInput} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {locallist,Voices} from '../../api/api'
import config from '../../api/serviceAPI.config'


export default class VoiceTop extends React.Component{
    constructor(props){
        super(props)
        this.state={
          http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
          openArr:new Map(),
          idx:1,
          NDtata:[],
          dataLis:[],
        }
    }

    async componentDidMount(){
      let area = await locallist(this.state.http,5);

      console.log(area,'ffffffffffffffffffffffff')
      this.setState({
        NDtata:area.data,
        dataLis:area.data
      })
    }


    onChanegeTextKeyword(text){
        if(!text){
          this.setState({
            dataLis:this.state.NDtata
          })
          return;
        }
        else if(text){
          let newData = [];
          for(var i = 0; i < this.state.NDtata.length;i++) {
            let ds = this.state.NDtata[i];
            if(ds.local && ds.local.indexOf(text)!=-1){
                newData.push(ds);
            }
          }
          this.setState({
            dataLis:newData
          })
          return;
        }
    }


    open(item,gg){
      let openArr = this.state.openArr;
      let {TopId,name,introduce,soundpath,soundpath2} = item;
      if(openArr.has(TopId)) openArr.delete(TopId)
      else openArr.set(TopId);
      this.setState({openArr})
      if(gg)this.props.navigation.navigate('VoiceNavigation',{name:name,introduce:introduce,sound:soundpath,sound2:soundpath2})
    }

    checkIsOpen (id) {
      let openArr = this.state.openArr;
      if(openArr.has(id)) return true;
      return false;
    }

    renderFlatList = (data,left=1,gg=false) =>{
      let k = left;
      k++;
        return (<FlatList style={{height:"100%"}} data={data} keyExtractor={(item,index)=>index.toString()} 
           renderItem={({item,index})=>{
              let {name,TopId,data} = item;
              return(<View key={TopId} style={{height:"100%",flex:1,backgroundColor:'white',marginTop:7,borderBottomWidth:!data?1:0,borderBottomColor:"#666"}}>
                  <View style={{height:"100%",flex:1}}>
               <TouchableOpacity onPress={()=>{this.open(item,gg)}} style={{flexDirection:'row',alignItems:'center',width:"100%"}}>
                  <View style={{width:"100%"}}>
                      <View style={{paddingLeft:!gg?0:left*10,width:"100%",flexDirection:'row',alignItems:'center',padding:10}}>
                          {data && data.length>0?<Image source={require('../../images/die2.png')} style={{width:10,height:10}} />:<Image source={require('../../images/eyes.png')} style={{width:15,height:15}}/>}
                          <Text style={{color:'#333',marginLeft:15,flex:1}}>{name}</Text>
                          {data && data.length>0&&<Image source={require('../../images/prdown.png')} style={{width:15,height:15,marginRight:10}}/>}
                      </View>
                  </View>
               </TouchableOpacity>
                  <View key={TopId}>{(this.checkIsOpen(TopId) && data && data.length>0) && this.renderFlatList(data,k,true)}</View>
                  </View>
            </View>)}}
        />)
    }


    render(){
        return(<View style={{flex:1}}>
            <HeaderBar parent={this} name={'导航列表'} />
            <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:60}}>
                <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                  <TextInput underlineColorAndroid={'transparent'} placeholder="请输入" multiline={true} autoFocus={false}
                             onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                    style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} 
                  />
                </View>
            </View>
            {/* {this.renderFlatList(this.state.dataLis)} */}
            <FlatList data={this.state.dataLis} keyExtractor={(v,idx)=>idx.toString()} style={{marginTop:7}}
            renderItem={({item,index})=><View key={index} style={{width:'100%',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('VoiceNavigation',{name:item.local,id:item.id})}
             style={{marginBottom:7,paddingTop:10,paddingBottom:10,flexDirection:'row',alignItems:'center',width:"96%",backgroundColor:'white',borderRadius:5}}>
              <Text style={{color:'#333',flex:1,marginLeft:10}}>{item.local}</Text>
              <Image source={require('../../images/go1.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
            </View>
             }/>
        </View>)
      }
  }