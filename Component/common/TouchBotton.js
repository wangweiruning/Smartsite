import React from 'react'
import {Text,TouchableOpacity,View,Image} from 'react-native';
import MySorage from './../../api/storage'
export default class TouchBotton extends React.Component{
  
    state={
        t:{...this.props.last}
      }

    render(){
        let {rightRouteTo,leftName,rightText,leftIcon,lat,showRight,paddingnum} = this.props
        return(<TouchableOpacity onPress={()=>{
                   if(rightRouteTo=='Networks'){
                    MySorage._remove('userinfo');
                    return this.props.navigation.navigate(rightRouteTo)
                    }
                    !lat?this.props.navigation.navigate(rightRouteTo):null
                  }} 
                  style={{width:'100%',alignItems:'center',flexDirection:'row'}} 
                  activeOpacity={.8}>
                <View style={{marginLeft:10}}>
                  <Image source={leftIcon} style={{width:20,height:20,resizeMode:Image.resizeMode.contain}}/>
                </View>
                <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginLeft:10,paddingTop:paddingnum,paddingBottom:paddingnum,borderBottomWidth:this.state.t.ks+1==this.state.t.da?0:0.5,borderBottomColor:'#d9d9d9'}}>
                 <Text style={{color:'black',fontSize:18,flex:1}}>{leftName}</Text>
                {showRight?
                    <View style={{backgroundColor:'#edba69',marginRight:15,width:18,height:18,borderRadius:9,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'white',fontSize:12}}>{rightText}</Text>
                    </View>:
                    <View style={{marginRight:10,width:20,height:18,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../../images/go1.png')} style={{width:20,height:20}}/>
                    </View>
                }
                </View>
     </TouchableOpacity>)
    }
} 



