/**
 * 顶部导航
 * params{
 * centerText：中间文字信息
 * rightText：右边文字信息
 * }
 * * */
import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn';
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native';

export default class CommonTitle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    _toBack() {
        this.props.navigation.goBack();
    }

    render(){
        return(<View style={styles.container}>
          {/* 左边部分 */}
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this._toBack()}
                                  style={styles.back}>   
                    <Image source={require('../images/back.png')}
                        style={style.backImg}/>
                    <Text style={styles.backText}>返回</Text>
            </TouchableOpacity>
              {/* 中间部分 */}
            <View style={{flex:1,alignItems: 'center'}}>
                <Text style={styles.centers}>{this.props.centerText}</Text>
            </View>
             {/* 右边部分 */}
            <View style={{width:30}}>
                <Text style={styles.right}>{this.props.rightText}</Text>

            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        height:38+StatusBar.currentHeight,
        backgroundColor: '#11A6FF',
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    back:{
        width: 60,
        marginLeft:5,
        height:35,
        display:'flex',
        alignItems:'center',
        flexDirection:'row'
    },
    backImg:{
        resizeMode: Image.resizeMode.contain,
         height: 20, 
         width: 20
    },
    backText:{
        color: '#007aff',
        top:1
    },
    centers:{
        color: 'black',
        fontSize:15,
        fontWeight:'500'
    },
    right:{
        color: 'black',
        fontSize:15,
        fontWeight:'200'
    }
})
