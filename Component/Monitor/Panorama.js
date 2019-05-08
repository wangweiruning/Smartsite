/* 全景视频*/

import React from 'react';
import {Image,TouchableOpacity,Text,View,WebView,ScrollView} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {locallist} from '../../api/api'
import config from '../../api/serviceAPI.config'
export default class Panorama extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            show:false,
            img:[],
            senceId:[],
            data:''
        }
    }

    componentDidMount(){
        this.getImgs()
        // this.webview.postMessage(JSON.stringify(point))
    }

    getImgs=async()=>{
        let list = await locallist(this.state.http,5);
        console.log(list,"vvvvvvvvvvv")
        let listimg = list.data;
        let arr = [];
        let senceId = [];
            listimg.map((item,index)=>{
                arr.push({
                    http:this.state.http,
                    img:item.attatch!=null?item.attatch.path:null,
                    text:item.remark,
                    ids:'library'+index,
                    imgpath:item.name
                })
                senceId.push('library'+index);
            })

        this.setState({
            img:arr,
            show:true,
            senceId:senceId
        })

    }

    WebViews(){
        let s =null 
        let ttmm = this.state.senceId;
        console.log(this.state.img[this.activeIndex])
        s = (
            <WebView ref={'webview'} 
                    startInLoadingState={true}
                    domStorageEnabled={false}
                    injectedJavaScript={`runapp('http://39.98.230.127:7100'+'${this.state.img[this.activeIndex].img}')`}
                    onMessage={(e)=>this.setState({data:e.nativeEvent.data})}
                    source={{uri:`http://39.98.230.127:7203/panorama/index.html`}}
            />
        ) 
        return s;
    }

    activeIndex=0;
    myImg(i){
        this.activeIndex=i;
        this.refs.webview.reload()
        this.forceUpdate();
    }

    render(){
        return(<View style={{flex:1}}>
            <HeaderBar parent={this} name={'全景视频'} />
            
            {this.state.img.length>0&&this.WebViews()}

            

        {this.state.show&&<ScrollView showsHorizontalScrollIndicator={false} style={{position:'absolute',bottom:80,backgroundColor:"rgba(0,0,0,.3)",padding:7}} horizontal={true}>
        {this.state.img.map((v,i)=><TouchableOpacity onPress={()=>this.myImg(i)} key={i} style={{marginRight:10}}>
         <View style={{width:80,height:80,backgroundColor:i==this.activeIndex?"#ffe79a":'rgba(0,0,0,.3)',alignItems:"center"}}>
            <Image source={{uri:this.state.http+v.img}} style={{width:80,height:65}} />
            <Text style={{color:i==this.activeIndex?'black':'white',fontSize:10}}>{v.text}</Text>
         </View>
        </TouchableOpacity>)}
        </ScrollView>}
        <View style={{alignItems:'center',position:'absolute',left:10,bottom:10}}>
        <TouchableOpacity onPress={()=>this.setState({show:!this.state.show})} style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:20,backgroundColor:'white'}}>
            <Image source={require('../../images/meue.png')} style={{width:20,height:20}}/>
        </TouchableOpacity>
        <Text style={{color:'white',fontSize:10,marginTop:5}}>场景选择</Text>
        </View>
        </View>
        )
    }
}