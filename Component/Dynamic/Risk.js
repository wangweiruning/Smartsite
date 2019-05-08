/**
 * 
 * 风险巡视
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ToastAndroid,FlatList} from 'react-native';
import Echarts from 'native-echarts';
import {ActivityIndicator} from 'antd-mobile-rn';
import {tpriskmanager} from '../../api/api'
import FindTitle from '../Business/FindTitle';
import config from '../../api/serviceAPI.config'


export default class Risk extends React.Component {
  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        toolsNum:0,
        dataSource:[],
        isLoading:false,
        isShow:false,
        loading:true,
        level1:[],
        level2:[],
        level3:[],
        level4:[],
        level5:[],
        }
    }

    async daras(){
        let id1 = [];
        let id2 = [];
        let id3 = [];
        let id4 = [];
        let id5 = [];
        let qke = await tpriskmanager(this.state.http,5);
        if(qke.isSuccess()){

        
        for(let c = 0;c<qke.data.data.length;c++){
            let kde = qke.data.data[c];
            if(kde.riskLevel.id==1){
                id1.push(kde.riskLevel)
            }
            if(kde.riskLevel.id==2){
                id2.push(kde.riskLevel)
            }
            if(kde.riskLevel.id==3){
                id3.push(kde.riskLevel)
            }
            if(kde.riskLevel.id==4){
                id4.push(kde.riskLevel)
            }
            if(kde.riskLevel.id==5){
                id5.push(kde.riskLevel)
            }
        }
   
        this.setState({
            level1:id1,
            level2:id2,
            level3:id3,
            level4:id4,
            level5:id5,
            toolsNum:qke.data.data.length,
            loading:false,
            dataSource:qke.data.data,
        })
    }else if(qke.isCanUse()){
        this.setState({
            loading:false
        })
        ToastAndroid.show(qke.message,ToastAndroid.SHORT)
    }
    }

    componentDidMount(){
       this.daras()    
    }

    option(){
        return {
            tooltip : {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: '风险级别',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:this.state.level1.length, name:`一级风险(${this.state.level1.length})`},
                        {value:this.state.level2.length, name:`二级风险(${this.state.level2.length})`},
                        {value:this.state.level3.length, name:`三级风险(${this.state.level3.length})`},
                        {value:this.state.level4.length, name:`四级风险(${this.state.level4.length})`},
                        {value:this.state.level5.length, name:`五级风险(${this.state.level5.length})`}
                ],
                itemStyle: {
                        emphasis:{
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

// 刷新的状态，时间2s
    async onLoad(){
        let qke = await tpriskmanager(this.state.http,5);
        this.setState({
            dataSource:qke.data.data
        })
    }

    showModel=(data)=>{
        this.setState({
            isShow:true
        })
    }

    setFengxian=(titles,tt,index)=>{
        // this.state.isLoading=true;
    if(tt==1) {
        this.state.dataSource[index].isShow=true;
        this.forceUpdate();
        ToastAndroid.show(`已将${titles}设为风险点!`,ToastAndroid.SHORT)
    }else {
        this.state.dataSource[index].isShow=false;
        this.forceUpdate();
        ToastAndroid.show(`已将风险点${titles}取消!`,ToastAndroid.SHORT)
      }
    }


    renderItem=(items)=>{
    const item = items.item;
        return  <TouchableOpacity activeOpacity={0.4} style={styles.ListItem} onPress={()=>this.props.navigation.navigate('RiskDetail',{item:item})}>
                <View style={{width:"90%",justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <View style={styles.leftItem}>
                        <Text style={{fontSize:14,fontWeight:'200',color:"#000"}}>区域：{item.areaId&&item.areaId.local}</Text>
                        <Text style={{fontSize:14}}>风险点：{item.riskPointId}</Text>
                        <Text style={{fontSize:14}}>风险类型：{item.riskType&&item.riskType.typename}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <Image source={require('../../images/goto.png')} style={{width:20,height:20}}/>
                    </View>
                </View>
                </TouchableOpacity>
    }


    render() {
    const {dataSource} =this.state;
    return(<View style={{alignItems:'center',flex:1,backgroundColor:"#fff"}}>
                <FindTitle name='风险巡视' parent={this} rightRouteTo={'CreateRisk'}  haveRoute={true}
                  isShow={this.state.isShow} showModel={this.showModel} haveSearch={false}/>
                {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                  <ActivityIndicator color="#363434"/>
                  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                </View>}
                <View style={styles.content}>
                    <View style={styles.wuzi}>
                        <Text style={styles.fontColor}>风险总数:{this.state.toolsNum}</Text>
                    </View>
                    <View style={{width:"100%",marginTop:-50}}>
                        <Echarts option={this.option()} height={250} />
                    </View>
                    {this.state.toolsNum>0?<FlatList style={{height:'50%'}} data={dataSource} keyExtractor={(i,k)=>k.toString()}
                        refreshing={this.state.isLoading} onRefresh={() => this.onLoad()}
                        renderItem={(item) =>this.renderItem(item)}
                    />:<Text>暂无数据</Text>}
                </View>
            </View>);
        }
    }

  const styles = StyleSheet.create({
    content:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    wuzi:{
        height:50,
        top:5,
        justifyContent:'center',
        flexDirection:'row',
       },
    fontColor:{
        width:'100%',
        color:"#0C6BAF",
        left:15
    },
    list:{top:-80,
        marginTop:15,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    ListItem:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'#eee',
        borderTopWidth:.5,
        borderBottomWidth:.5,
        borderBottomColor:'#eee'
    },
    leftItem:{
        width:'90%',
        justifyContent:'center',
        padding:5
    },
    rightItem:{
        width:'10%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    Badge:{
        width:10,
        height:10,
        borderRadius:10,
        backgroundColor:'red'
    },
     //model styles
     models:{
        width:"100%",
        height:'100%',
        backgroundColor:"#ffffff",
        justifyContent:'center',
        alignItems:'center'
    },
    modelsTitle:{
        width:"100%",
        height:50,
        justifyContent:'center',
        backgroundColor:'#1884CD',
        alignItems:'center',
        padding:5,
        borderBottomColor:"#eee",
        borderBottomWidth:2,
        borderStyle:'solid'
    },
    modelsCreate:{
        color:"#fff",
        fontSize:18,
    },
    modelsContent:{
        width:"90%",
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    inputValve:{
        width:'100%',
        justifyContent:'space-between'
    },
     gongList:{
        width:200,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,
        borderWidth:1,
    },
    searchs:{
        width:'55%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#2FC651',
        borderRadius:5,
        marginBottom:15
    },
    selectImage:{
        width:'90%',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
        width:'100%',
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#ddd',
        textAlign:'center'
      },
      image:{
       height:60,
       width:100,
       margin:10,
       alignSelf:'center',
     },
     style :{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
      }
  })