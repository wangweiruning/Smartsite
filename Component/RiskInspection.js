/**
 * 
 * 风险信息界面
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ListView,FlatList} from 'react-native';
import HeaderBar from './common/HeaderBar';
import HaveNoData from './common/HaveData';


export default class RiskInspection extends React.Component {
  
    constructor(props){
      super(props)
    
      this.state={
       toolsNum:5,
       dataSource: [
                      {
                          name:'智慧工地服务中心建筑设计第一种工作票',
                          type:'智慧工地建筑工程',
                          gongxu:'工作环境',
                          neirong:'让大家都有一个良好的工作环境',
                          fengxian:'可以产生的风险(天气高温、用电安全)',
                          kaishishijain:'2019-02-23',
                          jieshushijian:'2019-3-15',
                          quyuname:'贵阳市德福中心工地',
                          gongchengbuwei:'土建'
                      },
                      
                      {
                        name:'智慧工地服务中心建筑设计第一种工作票',
                        type:'智慧工地建筑工程',
                        gongxu:'工作环境',
                        neirong:'让大家都有一个良好的工作环境',
                        fengxian:'可以产生的风险(天气高温、用电安全)',
                        kaishishijain:'2019-02-23',
                        jieshushijian:'2019-3-15',
                        quyuname:'贵阳市德福中心工地',
                        gongchengbuwei:'土建'
                    },
                    {
                      name:'智慧工地服务中心建筑设计第一种工作票',
                      type:'智慧工地建筑工程',
                      gongxu:'工作环境',
                      neirong:'让大家都有一个良好的工作环境',
                      fengxian:'可以产生的风险(天气高温、用电安全)',
                      kaishishijain:'2019-02-23',
                      jieshushijian:'2019-3-15',
                      quyuname:'贵阳市德福中心工地',
                      gongchengbuwei:'土建'
                  },      
              ],
  
            isLoading:false
      }
    }
  
  
    renderItem=(items)=>{
        console.log(items)
      let item = items.item;      
          return <TouchableOpacity 
                  onPress={()=>this.props.navigation.push('Risk',{data:{name:'处理待办事情'}})}
                  activeOpacity={0.8} style={styles.ListItem}>
                  <View style={styles.subtop}>
                      <Text style={[styles.subkey,{color:"#000"}]}>工作票名称:</Text>
                      <Text style={[styles.subvalue,{color:"#51eea3"}]}>{item.name}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>类型:</Text>
                      <Text style={styles.subvalue}>{item.type}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>区域:</Text>
                      <Text style={styles.subvalue}>{item.quyuname}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>工序:</Text>
                      <Text style={styles.subvalue}>{item.gongxu}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>工程部位:</Text>
                      <Text style={styles.subvalue}>{item.gongchengbuwei}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>作业内容:</Text>
                      <Text style={styles.subvalue}>{item.neirong}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>可以产生的风险:</Text>
                      <Text style={styles.subvalue}>{item.fengxian}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>开始时间:</Text>
                      <Text style={styles.subvalue}>{item.kaishishijain}</Text>
                  </View>
                  <View style={styles.subtop}>
                      <Text style={styles.subkey}>结束时间:</Text>
                      <Text style={styles.subvalue}>{item.jieshushijian}</Text>
                  </View>
              </TouchableOpacity>
    }
  
  // 刷新的状态，时间2s
  onLoad() {
    setTimeout(() => {
        this.setState({
            isLoading: false,
            dataSource:[]
        })
    }, 500)
  }
    render() {
      console.log(this.state.dataSource.length)
        return (<View style={{flex:1,backgroundColor:"#fff",flexDirection:'column'}}>
                 <HeaderBar parent={this} name="风险信息"/>
                 <View style={styles.content}>
                    <FlatList style={{height:this.state.dataSource.length>0?'100%':100}}
                          data={this.state.dataSource}
                          refreshing={this.state.isLoading} onRefresh={() => this.onLoad()}
                          renderItem={(item) => this.renderItem(item)}
                      />
  
                     {!this.state.dataSource.length && 
                      <View style={{width:'100%',justifyContent:'center',flexDirection:'column',top:'20%',position:'absolute'}}>
                          <HaveNoData  />
                      </View>
                      }
  
                 </View>
          </View> );
      }
    }
  
    const styles = StyleSheet.create({
      content:{
          flex:1,
        justifyContent:'center',
        flexDirection:'column',
        width:'100%',
        width:'100%'
      },
      fontColor:{
          width:'100%',
          color:"#0C6BAF",
          left:15
      },
      ListItem:{
          width:'100%',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          borderStyle:'solid',
          borderBottomColor:'#eee',
          borderBottomWidth:5
      },
      leftItem:{
          width:'90%',
          flexDirection:'column',
          justifyContent:'center',
          padding:5
      },
      subkey:{paddingLeft:5,fontSize:14,color:"#000",textAlign:'left',width:80},
      subvalue:{fontSize:14,color:"#000",padding:10,width:'80%'},
      subtop:{width:"90%",justifyContent:'center',alignItems:'center',flexDirection:'row'}
    })