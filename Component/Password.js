/****
 * 
 * 密码设置
 */

import React from 'react';
import {Text,View,TouchableOpacity,TextInput,ToastAndroid,StyleSheet} from 'react-native';
import HeaderBar from './common/HeaderBar';

export default class Password extends React.Component{
    constructor(props){
        super(props)
        this.state={
            oldpassword:'',
            newpassword:''
        }
    }

    submit(){
        if(!this.state.oldpassword)return ToastAndroid.show('原密码不能为空！',ToastAndroid.SHORT);
        if(!this.state.newpassword)return ToastAndroid.show('新密码不能为空！',ToastAndroid.SHORT);
        if(this.state.newpassword==this.state.oldpassword)return ToastAndroid.show('新密码不能与密码相同！',ToastAndroid.SHORT);
        // window.jconfig.netWorkIp = this.state.network;
        // MySorage._sava('netWorkIp',this.state.network);
        ToastAndroid.show('密码修改成功',ToastAndroid.SHORT);
        this.props.navigation.navigate('login')
        this.forceUpdate()
    }

    handleInput(k, v){
        this.setState({
            [k]:v,
        });
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }

    testBlur(key){
        this.refs[key].blur();
    }

    render(){ 
        return(<View style={{alignItems:'center'}}>
            <HeaderBar parent={this} name="修改密码"/>    
            <View style={styles.main}>
                <View style={styles.netinut}>
                    <Text style={{color:'#666'}}>原密码:</Text>
                    <TextInput onSubmitEditing={()=>{this.testBlur('inputWR')}}
                        underlineColorAndroid='transparent' 
                        ref="inputWR" style={{width:'90%'}} 
                        multiline={true} 
                        onChangeText={(e)=>this.handleInput('oldpassword',e)} />
                </View>
                <View style={styles.netinut}>
                    <Text style={{color:'#666'}}>新密码:</Text>
                    <TextInput onSubmitEditing={()=>{this.testBlur('inputWRs')}}
                        underlineColorAndroid='transparent' 
                        ref="inputWRs" style={{width:'90%'}} 
                        multiline={true} 
                        onChangeText={(e)=>this.handleInput('newpassword',e)} />
                </View>
                <View style={styles.saves}>
                    <TouchableOpacity 
                        onPress={()=>this.submit()} 
                        style={styles.saveItem}>
                        <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>确认修改</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
    }

}

const styles = StyleSheet.create({
main:{
    marginTop:10,
    width:'95%',
    backgroundColor:'white',
    justifyContent:"center",
    alignItems:'center',
    borderRadius:5,
    elevation:3
},
network:{
    height:50,
    width:'100%',
    justifyContent:'center'
},
networkstyle:{
    color:'#0390e8',
    marginLeft:10,
    fontSize:18
},
netinut:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'grey',
    borderRadius:5,
    width:'96%',
    marginTop:10,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10
},
saves:{
    marginTop:20,
    width:'100%',
    justifyContent:'center',
    height:50,
    alignItems:'center'
},
saveItem:{
    width:'40%',
    padding:7,
    alignItems:'center',
    borderRadius:5,
    backgroundColor:'#0390e8',
}
})