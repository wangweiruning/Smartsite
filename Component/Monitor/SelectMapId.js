/****
 * 选择收发货坐标点
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,Button,Modal,WebView,ToastAndroid} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import MySorage from '../../api/storage';

let timer=null;
export default class SelectMapId extends React.Component {

  constructor(props){
    super(props)
    this.state={
        showModel:false,
        distance:0,
        time:0,
        loading:true
    }
  }

    componentDidMount(){
        console.log(this.props.navigation.state.params,"bbbbbbbbbbbbbbbbbbbbb")
    }
    showModel = ()=>{
        this.setState({
            showModel:true
        })
    }

    closemodel=()=>{
        this.setState({
            showModel:false
        })
    }

    _onMessage = (e,vvv) => {
        var res = JSON.parse(e.nativeEvent.data)
        console.log(vvv,">>>>>>>>>>>>>>>>>>>>>>>>>")
        if(vvv==1){
            MySorage._sava('pointByget',res)
        }else{
            MySorage._sava('pointBysend',res)
        }
        
        ToastAndroid.show(`您选择了${res.addressStr}`,ToastAndroid.SHORT)
     
       
    }
_onNavigationStateChange = (navState) => {
    console.log(navState)
    this.setState({
        loading: navState.loading,
    });
}

componentWillUnmount(){
    // clearInterval(timer)
}
  render() {
 
    return (<View style={{flex:1}}>
                <HeaderBar parent={this} name={this.props.navigation.state.params==1?'发货位置选择':'收货位置选择'}/>
                <WebView 
                    source={require('../../html/newpage.html')}    
                    onMessage={(e) =>this._onMessage(e,this.props.navigation.state.params)}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    ref='webview'
                    onNavigationStateChange={this._onNavigationStateChange}
                    injectedJavaScript={`runMap(116.397559,39.89621)`}
                    />
        </View> );
    }
  }

  const styles = StyleSheet.create({
    centent:{
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    userMap:{
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    usertop:{
        position:'absolute',
        bottom:20,
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    userInfo:{
        width:'90%',
        height:60,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10
    },
    userMsg:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        left:10
        
    },
    toolsMsg:{
        width:'95%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#efefef'
    },
    userInfos:{
        width:'98%',
        height:120,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#FFF',
        borderRadius:5,
        padding:10
    },
    toolsInfo:{
        width:'85%',
        flexDirection:'column',
        justifyContent:'center',
    },
    yuandian:{
        width:'10%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        height:100
    },
    getime:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'90%',
        height:100
    },
    showmaps:{
        width:50,
        height:50,
        borderRadius:50,
        position:'absolute',
        bottom:320,
        right:10
    }
  })