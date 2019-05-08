import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet} from 'react-native';
import NavigationBar from './common/NavigationBar';
import {CommonItemTo} from './common/CommonItemTo';
export default class SeeExample extends React.Component {

  constructor(props){
    super(props)
    this.state={
     
    }
  }

  render() {
      const { navigate } = this.props.navigation;
      return (<View style={{width:'100%',alignItems:'center'}}>
                <NavigationBar navigation={this.props.navigation} centertext={'监测'}/> 
                <View style={{width:'100%'}}>
                  <Image source={require('./../images/ScanImage.png')} style={{height:150,width:"100%"}}/>
                </View>
                <View style={{width:'98%'}}>
                  <CommonItemTo parent={this}  
                                rightRouteTo={"Personnel"} 
                                leftName={"人员统计"} 
                                height={35}
                                borderRadius={5}
                                leftIcon={require('../images/renyuan.png')}
                                rightIcon={"right"}/>
                  <CommonItemTo parent={this}  
                                rightRouteTo={"CarManage"} 
                                leftName={"车辆统计"} 
                                height={35}
                                borderRadius={5}
                                leftIcon={require('../images/car.png')}
                                rightIcon={"right"}/>
                  <CommonItemTo parent={this}  
                                rightRouteTo={"BigTools"} 
                                leftName={"大型机具"} 
                                height={35} 
                                borderRadius={5}
                                leftIcon={require('../images/jiju.png')}
                                rightIcon={"right"}/>
                  <CommonItemTo parent={this}  
                                rightRouteTo={"Environmental"} 
                                leftName={"环境监测"} 
                                height={35}
                                borderRadius={5} 
                                leftIcon={require('../images/huanjing.png')}
                                rightIcon={"right"}/>
                  <CommonItemTo parent={this}  
                                rightRouteTo={"Panorama"} 
                                leftName={"全景视频"} 
                                height={35}
                                borderRadius={5} 
                                leftIcon={require('../images/shipin.png')}
                                rightIcon={"right"}/>
                </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      width:'100%',
    }
  })