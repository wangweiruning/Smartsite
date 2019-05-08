import React from 'react'
import {View,Text,Image} from 'react-native'

export default class HaveNoData extends React.Component{
    render(){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10}}>
            <Image source= {require('../../images/haveNoData.png')} style={{width:100,height:100}}/>
            <Text style={{color:'#000'}}>~~~暂无数据~~~</Text>
        </View>)
    }
}