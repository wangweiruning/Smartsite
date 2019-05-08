/* 标准检索*/

import React from 'react';
import {Image,TextInput,TouchableOpacity, ToastAndroid, FlatList,StyleSheet, Text, View } from 'react-native';
import {Pagination,ActivityIndicator} from 'antd-mobile-rn'
import HeaderBar from './../common/HeaderBar';
import ParsedText from 'react-native-parsed-text';
import config from '../../api/serviceAPI.config'
// import PageListView from 'react-native-page-listview';
import {policycriterion} from '../../api/api'

export default class Retrieval extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            color:false,
            ReData:[],
            dataLis:[],
            pagenow:1,
            pagesnow:1,
            replaceText:null,
            data:[],
            show:true,
            canuser:true
        }
    }

    async componentDidMount(){
        let  keds = await policycriterion(this.state.http,`currentPage=1&pageSize=10&project=5`,jconfig.userinfo.token);
        if(keds.isCanUse()){
            this.setState({
                show:false,
                canuser:true
            })
            ToastAndroid.show(keds.message,ToastAndroid.SHORT)
        }else if(keds.isSuccess()){
            this.setState({
                ReData:keds.data.data,
                dataLis:keds.data.data,
                pagenow:keds.data.totalPage,
                pagesnow:keds.data.currentPage,
                show:false,
                canuser:false
            })
        }
        
    }


    onChanegeTextKeyword(text){
        if(!text){
          this.setState({
            dataLis:this.state.ReData,
            replaceText:/\s/
          });
          return;
        }
    
        else if(text){
          let newData = [];
          for (var i = 0; i < this.state.ReData.length; i++) {
              let ds = this.state.ReData[i];
              if((ds.name && ds.name.indexOf(text)!=-1)||(ds.summary && ds.summary.indexOf(text)!=-1)||(ds.serialCode && ds.serialCode.indexOf(text)!=-1)){
               newData.push(ds);
              }
          }
          this.setState({
            dataLis:newData,
            replaceText:new RegExp(text)
          });
          return;
        }
    }

    async changepage(e){
        let keds = await policycriterion(this.state.http,`currentPage=${e}&pageSize=10&project=5`,jconfig.userinfo.token);
        this.setState({
            ReData:keds.data.data,
            dataLis:keds.data.data,
            pagesnow:keds.data.currentPage,
            show:false
        })
    }
 
    getNewWord(tt){
        if(tt==null)return '暂无详情内容';
        let patt = /<[^>]+>/g;
        let newStr = tt.replace(patt, '');
        return newStr
    }
    render(){
        return(<View style={{flex:1}}>
            <HeaderBar parent={this} name={'标准检索'} />
            {!this.state.show?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                <ActivityIndicator color="#363434"/>
                <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
            </View>}
            <View style={{width:'100%',justifyContent:"center",alignItems:'center',backgroundColor:'white',height:60}}>
                <View style={{backgroundColor:'#eee',width:'97%',flexDirection:'row',borderRadius:20,alignItems:'center',height:40}}> 
                <Image source={require('../../images/search.png')} style={{width:20,height:20,marginLeft:8}}/>
                  <TextInput underlineColorAndroid={'transparent'} 
                            multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                            style={{marginLeft:5,fontSize:13, color: '#363434',overflow:'hidden',width:'98%',height:'100%',padding:0}} 
                            placeholder="请输入"/>
                </View>
            </View>
            <FlatList keyExtractor={(item,index)=>index.toString()} style={{height:'100%'}} data={this.state.dataLis}
            renderItem={({item,index})=>
            <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('RetrievalDetail',{item,type:item.type,content:item.content,id:item.id,title:item.title})} style={{flexDirection:'row',marginTop:8,backgroundColor:'white',width:"100%"}}>
            <View style={{marginTop:5,marginLeft:5,width:40,height:40,borderRadius:20,
                            justifyContent:'center',alignItems:'center',backgroundColor:"#11A6FF"}}>
                    <Text style={{color:'white',fontSize:18}}>国</Text>
            </View>
            <View style={{width:'90%'}}>
                <ParsedText style={styles.text} parse={[{pattern:this.state.replaceText==null?/""/:this.state.replaceText,style:styles.name}]}
                childrenProps={{allowFontScaling: true}}>
                {item.serialCode+' '+item.name}
                </ParsedText>
                <ParsedText style={styles.text} parse={[{pattern:this.state.replaceText==null?/""/:this.state.replaceText,style:styles.name}]}
                childrenProps={{allowFontScaling: true}}>
                {this.getNewWord(item.summary)}
                </ParsedText>
            </View>
        </TouchableOpacity>}/>
        
        {!this.state.canuser&&<Pagination total={this.state.pagenow} 
        current={this.state.pagesnow} onChange={(e)=>this.changepage(e)}/>}
        </View>)
    }
}

const styles = StyleSheet.create({
    text: {
        color:'black',
        fontSize: 15,
        padding:10,
    },
    name: {
        color: 'red',
    },
})