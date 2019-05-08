/**
 * 
 * 工器具详情page
 */
import React from 'react';
import {Text,View,ScrollView,TouchableOpacity,StyleSheet,ToastAndroid} from 'react-native';
import ToolsItem from './toolsItem';
import {getToolsList} from '../../api/api';
import HeaderBar from '../common/HeaderBar';
import HaveNoData from './../common/HaveData'
import {ActivityIndicator} from 'antd-mobile-rn'
import config from '../../api/serviceAPI.config'




export default class Tools extends React.Component {

  constructor(props){
    super(props)
    this.state={
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
     toolsNum:0,
     hjs:2,
     token:window.jconfig.userinfo.token||'',
     toolData:[{name:'业主项目部',nums:100},{name:'土木工程部',nums:35},{name:'挖机作业部',nums:30},{name:'其他',nums:50}],
     list:[],
     show:true
    }
  }

  componentDidMount(){

    this.getToolsType();
    this.props.navigation.addListener(
      'willFocus', async(obj)=>{
        this.getToolsType();
        this.setState({
          hjs:this.state.hjs+1
        })
      }
    );
  }
  async getToolsType(){
    let struct = await getToolsList(this.state.http);//得到工器具总数
  
    console.log(struct,"ggggggggggggg")
    if(struct.isSuccess()){
    this.setState({
          list:struct.data.data,
          toolsNum:struct.data.total,
          show:false
        })
    }else if(struct.isCanUse()){
      this.setState({
        show:false
      })
      ToastAndroid.show(struct.message,ToastAndroid.SHORT)
    }
    
  }
  render() {

    let {list,show} = this.state;
      return (<View style={{width:'100%',height:"100%"}}>
                  <HeaderBar name='工器具' parent={this} />
									
									{show&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
									  <ActivityIndicator color="#363434"/>
									  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
									</View>}
									
                  <View style={styles.content}>
                    <View style={{height:30,justifyContent:'center',borderBottomWidth:1,borderBottomColor:"#E9E9EF",borderStyle:'solid'}}>
                        <Text style={styles.fontColor}>工器具总数：{this.state.toolsNum}</Text>
                    </View>
                  </View>
                  <ScrollView>
                    <View style={{width:'100%'}}>
                    {list.length>0&&list.map((item,kindex)=>{
                      const data ={title:item.name,...item};
                      return <ToolsItem leftName={item.name} key={kindex+'keys'}
                                rightRouteTo={'ToosList'} 
                                rightText={Math.floor(item.total)} 
                                rightColor={"#FFF"} 
                                leftColor={"#000000"} 
                                data={data}
																toolsNum={this.state.toolsNum}
                                parent={this}/>
                    })}
                        {/* {!list.length&&<HaveNoData />}  */}
                      </View>
                    </ScrollView>
                    <View style={styles.cardList}>
                            {/* <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>this.props.navigation.navigate('CodeReading')}
                            >
                                <Text style={{color:"#FFF"}}>绑定二维码</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>this.props.navigation.navigate('CardList')}
                            >
                                <Text style={{color:"#FFF"}}>二维码列表</Text>
                            </TouchableOpacity>
                        </View>
            </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      justifyContent:'center',
      width:'100%',
      backgroundColor:"#ffffff"
    },
    fontColor:{
        left:10,
        width:'100%',
        color:"#000000",
        textAlign:'left'
    },
    cardList:{
      width:'100%',
      height:50,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:"#11A6FF",
      justifyContent:'space-between',padding:10
  }
  })