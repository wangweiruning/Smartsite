import React from 'react';
import {Text,View,TouchableOpacity,TextInput,ToastAndroid,StyleSheet} from 'react-native';
import HeaderBar from './common/HeaderBar';
import MySorage from '../api/storage';
import config from '../api/serviceAPI.config'
import {BaseComponent} from './base/BaseComponent';
export default class Network extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            network:config.URL
        }
    }

    submit(){
        if(!this.state.network)return ToastAndroid.show('网络配置不能为空！',ToastAndroid.SHORT);
        window.jconfig.netWorkIp = this.state.network;
        MySorage._sava('netWorkIp',this.state.network);
        ToastAndroid.show('服务地址配置成功',ToastAndroid.SHORT);
        MySorage._remove('userinfo')
    
        this.navigateTo('LoginPage')
       
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

    testBlur(){
        this.refs.inputWR.blur();
    }

    render(){ 
        return(<View style={{alignItems:'center'}}>
            <HeaderBar parent={this} name="网络设置" isgoLogin={false}/>    
            <View style={styles.main}>
                <View style={styles.network}>
                     <Text style={styles.networkstyle}>服务器地址</Text>
                </View>
                <View style={styles.netinut}>
                    <TextInput // underlineColorAndroid='transparent' 
                        placeholder={this.state.network}
                        ref="inputWR" style={{width:'90%'}}
                        multiline={true} 
                        onChangeText={(e)=>this.handleInput('network',e)} />
                </View>
                <View style={styles.saves}>
                <TouchableOpacity 
                    onPress={()=>this.submit()} 
                    style={styles.saveItem}>
                <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>保存</Text>
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
    alignItems:'center'
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
    borderRadius:5,
    alignItems:'center',
    backgroundColor:'#0390e8',
}
})