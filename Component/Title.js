import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default class Title extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    _toBack() {
        this.props.navigation.goBack();
    }
    HaveSee(){
        const {navigate} = this.props.navigation
        console.log(this.props.navigation)
        navigate('TicketFlew',{centerText:this.props.navigation.state.params.v})
    }

    render(){
        return(<View style={{
            width: '100%',
            height: 43,
            backgroundColor: 'white',
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:22
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={{width: 60,marginLeft:5,height:35,display:'flex',alignItems:'center',flexDirection:'row'}}>   
                    <Image source={require('../images/back.png')}
                        style={{resizeMode: Image.resizeMode.contain, height: 20, width: 20}}/>
                    <Text style={{color: '#007aff',top:1}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,}}>
                <Text style={{color: 'black',fontSize:15,fontWeight:'500'}}>{this.props.centerText}</Text>
            </View>
            <View style={{marginRight:5,justifyContent: 'center',width:65,height:35}}>
                <Text onPress={()=>this.HaveSee()}
                    style={{color: '#007aff',}}>
                    {this.props.rightText}
                </Text> 
            </View>
        </View>)
    }
}

