import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View,TouchableOpacity,Image,StatusBar,Text} from 'react-native';

export default class QrcodeScan extends React.Component{


    _toBack() {
        this.props.navigation.goBack();
    }

    show(){
        this.props.navigation.navigate('CodeReading',{tools:this.props.tools})
    }

    render(){
        return(<View style={{
            height:40+StatusBar.currentHeight,
            paddingTop:StatusBar.currentHeight-5,
            width: '100%',
            backgroundColor: '#4ca5f9',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                style={{height:38,alignItems:'center',flexDirection:'row',marginLeft:10}}>   
                <Icon name={'arrowleft'} size={24} color={'white'} />
            </TouchableOpacity>
            <View style={{flexWrap:'wrap',height:38,justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:16,textAlign:"center"}}>{this.props.centerText}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',height:38,marginRight:10}} onPress={()=>this.show()}>
             {/* <Image source={require('../../images/Scan.png')} style = {{ width: 20, height: 20 }}/> */}
            </TouchableOpacity>
        </View>)
    }
}