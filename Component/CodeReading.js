/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, DeviceEventEmitter, View,ToastAndroid} from 'react-native';
import {QRscanner,QRreader} from 'react-native-qr-scanner';//第一个扫码，第二个读取相册中二维码
import HeaderBar from './common/HeaderBar';
import {sqBind} from '../api/api'
import config from '../api/serviceAPI.config'

let timer=null;
export default class CodeReading extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
			http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
      flashMode: false,
      zoom: 0.5,
      Qdata:'',
      data:null,
      message:'',
	  qtoken:null
    };
	}

  onRead=(res) => {
		console.log(res); 
		timer = setTimeout(()=>{
			if(res.data.length>24){//判断是否为创造的二维码
					
						let sqtoken = JSON.parse(res.data);//扫码得到二维码token
						
						if(sqtoken.token!=(null||undefined)&&sqtoken.token){
									this.sqsmart(sqtoken.token);
										this.setState({
										qtoken:sqtoken.token
										})
						}
					}else{
						ToastAndroid.show('二维码不符合规定!',ToastAndroid.SHORT)
						this.props.navigation.pop();
				} 
		},100)
		  
  }
	

	
	//二维码扫码
	sqsmart=async(token)=>{
		clearTimeout(timer)
		console.log(2222222222222222222222)

			let data = await sqBind(this.state.http,token);
			let datas = data.data;
			let tools = datas.tool;
			console.log(data,"ggggggggggggggggggggg",tools);

			// let {id,token,machiner,tool,type,isBind,size} = datas;//获取到二维码的信息
			// this.props.navigation.navigate('Binding',{data:''})
			if(datas==null){
				ToastAndroid.show('二维码错误!',ToastAndroid.SHORT)
				this.setState({
					qtoken:null
				})

				return 	this.props.navigation.pop();
				}

			if(datas.isBind == 0){//如果没有绑定，先去绑定工器具
				this.setState({
					qtoken:null
				})
			
				this.props.navigation.replace('CreateTools',{data:datas});	

			}else if(tools==null){
				this.props.navigation.replace('Binding',{data:datas});
			}
			else if(datas.type==1&&tools!=null){//工器具查看详情
				this.setState({
					qtoken:null
				})		
			
					if(tools==null){
						this.props.navigation.replace('Binding',{data:datas});
						console.log(333333333)
					}else{
						console.log(44444)
						this.props.navigation.navigate('ToolsMsg',{title:tools.name,id:tools.id});

					}
			}else if(datas.type==2&&tools!=null){//大型机具查看详情
				this.setState({
					qtoken:null
				})
				console.log(555555555)
						 this.props.navigation.replace('BigToolsInfo',{data:datas});
			}else{//查看物资信息
				this.setState({
					qtoken:null
				})
				console.log(666666666)
						 this.props.navigation.replace('CreateMaterial',{datas:datas});
			}
	}

	showsqrcode(){
		return <QRscanner onRead={(e)=>this.onRead(e)} 
								flashMode={this.state.flashMode} 
								// isRepeatScan={true}
								ref={'qrcode'}
								hintTextPosition={100}
								zoom={this.state.zoom} finderY={50}/>
	}
  render() {

    return (
      <View style={styles.container}>
       <HeaderBar parent={this} name="二维码扫描"/>
        {this.showsqrcode()}
      </View>
    );
  }
 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});