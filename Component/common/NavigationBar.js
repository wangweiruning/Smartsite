/***
 * 
 * homeScreen顶部title
 * ***/

import React from 'react';
import {StatusBar,TouchableOpacity,View,Text,Image} from 'react-native';
export default class NavigationBar extends React.Component{
    show(){ 
        this.props.navigation.navigate('CodeReading',{tools:'Material'})
    }

    render(){

        return(<View style={{
            width: '100%',
            height:40+StatusBar.currentHeight,
            paddingTop:StatusBar.currentHeight-5,
            backgroundColor: '#11A6FF',
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        }}>
        <View style={{width:40,height:20}}></View>
        <Text style={{fontSize:20,fontWeight:'300',color:'white',textAlign:'center',flex:1}}>{this.props.centertext}</Text>  
        <TouchableOpacity onPress={()=>this.show()} style={{padding:5,marginRight:5}}>
            <Image resizeMode = 'contain' source = { require('../../images/Scan.png')} style = { { width: 20, height: 20 }}/> 
        </TouchableOpacity>
        </View>)
    }
}