/**
 * 
 * 大型机具
 */
import React from 'react';
import {Text,View,Image,TextInput,StyleSheet,ScrollView,TouchableOpacity,FlatList,ToastAndroid} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import Echarts from 'native-echarts'
import {ActivityIndicator} from 'antd-mobile-rn';
import SelectDialog from 'react-native-select-dialog';
import {BigTool} from '../../api/api';
import config from '../../api/serviceAPI.config'

const colorarr = ['red','blue','yellow'];







export default class BigTools extends React.Component {

  constructor(props){
    super(props)
    this.state={
    token:jconfig.userinfo.token,
    http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
    toolsNum:117,
    index:null,
    vallistChange:false,
    machiData:[],
    selectlist:'在线',
    data:[{txt:'在线',id:1},{txt:'离线',id:2}],
    option:{},
    allData:[],
    defaultData:[],
    values:'',
    loading:true,
    openArr:new Map(),
    a:0,
    b:0
    }
  }


    async componentDidMount(){
        let datas = await BigTool(this.state.http,`project=5`,jconfig.userinfo.token)
	    if(datas.isCanUse()){
            this.setState({
                loading:false
            })
            return ToastAndroid.show(datas.message,ToastAndroid.SHORT)
        }
		let a = 0;
		let b = 0;
		datas.data.data.map(item=>{
			if(item.isactive==0){
				a++
			}else{
				b++
			}
		})
		
		
        this.setState({
            machiData:datas.data.data,
			a:a,
			b:b,
			option:{
			    tooltip : {
			        trigger: 'item',
			    },
			    calculable : true,
			    series: [
			        {
			            name:'大型机具',
			            type:'pie',
			            radius: [10, 70],
			            itemStyle : {
			                normal : {
			                    label : {
			                        position : 'inner',
			                        formatter : "{b}\n{d}%",
			                        textStyle : {
			                            color : 'rgba(255,255,255,1)',
			                            align : 'center',
			                            baseline : 'middle',
			                            fontFamily : '微软雅黑',
			                            fontSize : 6,
			                            fontWeight : 'bolder'
			                        }
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : true,
			                        formatter : "{b}\n{d}%"
			                    }
			                }
			                
			            },
			            data:[
			                {value:b, name:'在线'},
			                {value:a, name:'离线'},
			            ]
			        }
			    ]
            },
        loading:false
        })
    }
     

    changList(item){
        this.state.selectlist=item.txt;
        this.state.vallistChange=true;
        let text = item.txt;
        if(text!='全部'){
            let newData = [];
            for (var i = 0; i < this.state.defaultData.length; i++) {
                let ds = this.state.defaultData[i];
                if(ds.iszaixian && ds.iszaixian.indexOf(text)!=-1){
                  newData.push(ds);
                }
            }
            this.setState({
                allData:newData
            });
          }else{
            this.setState({
                allData:this.state.defaultData
            }); 
          }
        this.forceUpdate();
    }

    showList=()=>{
         this.refs.selectlist.show()
    }

    onChanegeTextKeyword=(text)=>{
        if(!text){
            this.setState({
                allData:this.state.defaultData
            });
           }
      
          else{
            let newData = [];
            for (var i = 0; i < this.state.defaultData.length; i++) {
                let ds = this.state.defaultData[i];
                if(ds.name && ds.name.indexOf(text)!=-1){
                  newData.push(ds);
                }
            }
            this.setState({
                allData:newData,
                values: text
            });
          }
    }

    open(item,gg){
        let openArr = this.state.openArr;
        let {id} = item;
        if(openArr.has(id)) openArr.delete(id)
        else openArr.set(id);
        this.setState({openArr});
        if(gg) return this.props.navigation.navigate('BigToolsMsg');
    }

    checkIsOpen (id) {
        let openArr = this.state.openArr;
        if(openArr.has(id)) return true;
        return false;
    }

    renderFlatList = (data,left=1,gg=false) =>{
        let k =left;
        k++;
          return (<FlatList style={{height:"100%"}} data={data} keyExtractor={(item,index)=>index.toString()} 
             renderItem={({item,index})=>{
                let {name,id,sublist,colorid} = item;
                let color = "black";
                if(colorid==0 || colorid) color=colorarr[colorid];

                return(<View key={id} style={styles.isopen}>
                    <View style={{height:"100%",flex:1}}>
                 <TouchableOpacity onPress={()=>this.open(item,gg)} style={styles.openItems}>
                    <View style={styles.openView}>
                        <View style={[{paddingLeft:!gg?0:left*10},styles.openstyle]}>
                            {sublist && sublist.length>0?
                                <Image source={this.checkIsOpen(item.id)?
                                    require('../../images/prdown.png'):
                                    require('../../images/prgo.png')} style={{width:15,height:15}} />
                                    :
                                <View style={{width:10,height:10,borderRadius:10,backgroundColor:color}}></View>}
                            <Text style={{color:'#000',marginLeft:15}}>{name}</Text>
                        </View>    
                    </View>
                 </TouchableOpacity>
                    <View  key={id} style={{height:'100%'}}>
                        {(this.checkIsOpen(id) && sublist && sublist.length>0) && this.renderFlatList(sublist,k,true)}
                    </View>
                </View>
            </View>)}}
        />)
    }


    async searchData(){
        let {selectlist,values,token} = this.state;

        if(values!=''){
            let datas = await BigTool(this.state.http,`project=5&searchValue=${values}`,token)
            this.setState({
                machiData:datas.data.data
            })

        }else{
            let datas = await BigTool(this.state.http,'project=5',token)
            this.setState({
                machiData:datas.data.data
            })  
        }
        ToastAndroid.show('数据已更新',ToastAndroid.SHORT)
    }

   
    render() {
    const {option} =this.state;
    const showData = this.state.selectlist;
      return (<View style={{flex:1,backgroundColor:"#ffffff"}}>
               <HeaderBar parent={this} name="大型机具"/>
               {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                  <ActivityIndicator color="#363434"/>
                  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                </View>}
                    <View style={styles.jijulist}>
                    {/* 搜索功能 */}
                        <View style={styles.search}>
                            <View style={styles.searchSelect}>
                                    <TouchableOpacity style={{flexDirection:'row',height:40,width:'100%'}}  
                                        onPress={()=>this.showList('selectlist')}
                                        underlayColor="transparent">
                                        <View style={styles.gongList}>
                                            <Image style={{width:5,height:5}} source={require('../../images/tuoyuan.png')} />
                                            <Text style={{left:5,color:'#000',fontSize:14,width:50}}> {showData} </Text>
                                            <Image style={{width:18,height:10}} source={require('../../images/blueSetdown.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <SelectDialog 
                                        ref={'selectlist'} 
                                        titles={'选择机具状态'} 
                                        valueChange={this.changList.bind(this)} 
                                        datas={this.state.data}
                                        animateType={'fade'}
                                        positionStyle={{backgroundColor:"#1884CD",textAlign:'center'}}			  
                                    />
                                </View>
                                <View style={styles.searchView}>
                                    <TextInput underlineColorAndroid={'transparent'} 
                                        onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                                        style={styles.searchInput} placeholder="请输入机具名称"/>
                                    <TouchableOpacity activeOpacity={0.5} onPress={()=>this.searchData()}>
                                        <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                                    </TouchableOpacity>
                                </View>
                        </View>
                        {/* 图表数据 */}
                        <View style={styles.echarts}>
                            <View style={styles.wuzi}>
                                <Text style={styles.fontColor}>在线统计</Text>
                            </View>
                            <View style={{width:"100%"}}>
                                <Echarts option={option} height={170} />
                            </View>
                        </View>
                    </View>
                 {/* 机具列表 */}
                <ScrollView style={{width:'100%',marginTop:10}}>
                    {this.state.machiData.map((v,i)=>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('BigToolsMsg')} key={i} style={{alignItems:'center',flexDirection:'row',padding:5,backgroundColor:'white',borderBottomColor:'#999',borderBottomWidth:1}}>
                        <Image source={require('../../images/hhhccc.png')} style={{width:60,height:60}} />
                        <View style={{marginLeft:10,padding:5}}>
                            <Text>机具名：{v.name}</Text>
                            <Text>车牌号：{v.number}</Text>
                            <Text>实时活动时间：{v.activelast}</Text>
                            <Text>累积活动时长：{v.create_time}</Text>
                        </View>
                    </TouchableOpacity>)}
                </ScrollView>
        </View>)
    }
  }

  const styles = StyleSheet.create({
    wuzi:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
      },
    fontColor:{
        width:'100%',
        color:"#000000",
    },
    jijulist:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:250
    },
    search:{
        top:10,
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:50,
        borderBottomColor:'#eee',
        borderBottomWidth:5,
        borderStyle:'solid'
    },
    searchView:{
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'center',
        height:40,
    },
    searchInput:{
        fontSize:13, 
        color: '#363434',
        overflow:'hidden',
        width:'73%',
        height:40,
        padding:0
    },
    searchSelect:{  
        left:'5%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:120
    },
    gongList:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
      
    },
    echarts:{
        width:'100%',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:5,
        borderStyle:'solid'
    },
    ehartItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:'100%'
    },
    Listitem:{
        width:90,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    fangkuai:{
        width:5,
        height:5
    },
    fontstyle:{
        fontSize:12,
        color:"#000",
        paddingTop:5,
        paddingBottom:5
    },
    toolsList:{
        width:'100%',
    },
    isopen:{
        height:"100%",
        flex:1,
        backgroundColor:'white'
    },
    openItems:{
        flexDirection:'row',
        alignItems:'center',
        width:"100%"
    },
    openView:{
        borderBottomColor:"#666",
        borderBottomWidth:1,
        borderStyle:"solid",
        width:"100%"
    },
    openstyle:{
        width:"100%",
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
  })