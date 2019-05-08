/**
 * 
 * 佣金结算
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,FlatList,ToastAndroid} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {rewardList} from '../../api/api'
import MySorage from '../../api/storage';
import config from '../../api/serviceAPI.config'

export default class GetMoney extends React.Component {

  constructor(props){
    super(props)
    this.state={
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
     token:jconfig.userinfo.token,
     toolsNum:5,
     listAllData:[],
     isLoading:false,
     currentPage:1,
     pageSize:10,
     pagesnow:1,
     pagenow:1,
     loading:true,
     bools:1
    }
  }

  componentDidMount(){
      this.getAllData();
      this.viewDidAppear=this.props.navigation.addListener(
        'willFocus', async(obj)=>{
            this.getAllData();
            this.setState({
                bools:this.state.bools+1,
            })
        
        }
     );
  }
  //获取所有的数据
   getAllData(){
    MySorage._load('NewUerInfo',async(res)=>{
        console.log(res,"ggggggggggggggg")
        let datas = `project=5&currentPage=${1}&pageSize=50`;
        let listdata = await rewardList(datas)
            console.log(listdata,"fffffff")    
            if(listdata.isSuccess()){
               this.setState({
                listAllData:listdata.data.data,
                pagenow:listdata.data.totalPage,
                pagesnow:listdata.data.currentPage,
                loading:false
            }) 
            }else if(listdata.isCanUse()){
                this.setState({
                    loading:false
                }) 
                ToastAndroid.show(listdata.message,ToastAndroid.SHORT)
            }
            
    })
    
  }
  renderItem=(items,index)=>{
    return (<TouchableOpacity key={index}  
    style={{borderRadius:10,marginBottom:10,padding:10,backgroundColor:'#fff'}}>
    <Text style={{color:'#51eea3'}}>积分规则:{items.rewardRules}</Text>
    <Text style={{color:'#999'}}>分值：{items.score}</Text>
    <Text style={{color:'#999'}}>扣分细则：{items.deductRules}</Text>
    <Text style={{color:'#999'}}>加分细则：{items.awardedRules}</Text>
    <Text style={{color:'#999'}}>创建时间：{items.createTime}</Text>
   
    </TouchableOpacity>)
}
    render() {
      return (<View style={{flex:1}}>
               <HeaderBar parent={this} name={`积分激励`}/>
               <View style={styles.content}>
                    <FlatList style={{height:'100%',width:'95%',top:10}} keyExtractor={(item,index)=>index.toString()}
                        data={this.state.listAllData} 
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.isLoading}
                        //         onRefresh={()=>this.onLoad()}
                        //         colors={['#11A6FF']}
                        // />}
                        renderItem={({item,index}) => this.renderItem(item,index)}
                    />
               </View>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        width:'100%',
        alignItems:'center'
    },
    fontColor:{
        width:'100%',
        color:"#0C6BAF",
        left:15
    },
    ListItem:{
        paddingLeft:5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:5
    },
    leftItem:{
        width:'90%',
        justifyContent:'center',
        padding:5
    },
    subkey:{
        fontSize:14,
        color:"#000",
    },
    subvalue:{
        fontSize:14,
        color:"#000",
        padding:10,
        width:'80%'
    },
  })