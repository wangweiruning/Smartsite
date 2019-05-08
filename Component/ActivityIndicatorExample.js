import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView } from 'react-native';
import NavigationBar from './common/NavigationBar';
import {PicTextItem} from './common/PicTextItem';

export default class ActivityIndicatorExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      datas:[
        {Icontop:require('../images/wuzi.png'),TextName:"甲供物资",rightRouteTo:"Material",imgheight:25,imgwidth:30},
        {Icontop:require('../images/gongju.png'),TextName:"工器具",rightRouteTo:"Tools",imgheight:30,imgwidth:12},
        {Icontop:require('../images/wenti.png'),TextName:"检查问题",rightRouteTo:"FindMsg",imgheight:30,imgwidth:25},
        {Icontop:require('../images/liangdian.png'),TextName:"检查亮点",rightRouteTo:"BrightSpot",imgheight:25,imgwidth:20,data:{names:'亮点',nameId:1}},
        {Icontop:require('../images/shigong.png'),TextName:"施工进度",rightRouteTo:"Progress",imgheight:25,imgwidth:25},
        {Icontop:require('../images/yuying.png'),TextName:"语音导航",rightRouteTo:"VoiceTop",imgheight:25,imgwidth:25},
        {Icontop:require('../images/sousuo.png'),TextName:"标准检索",rightRouteTo:"Retrieval",imgheight:25,imgwidth:25},
        {Icontop:require('../images/kapian.png'),TextName:"制卡应用",rightRouteTo:"CreactCards",imgheight:25,imgwidth:25},
        {Icontop:require('../images/danger.png'),TextName:"风险巡视",rightRouteTo:"Risk",imgheight:25,imgwidth:25},
        {Icontop:require('../images/managepage.png'),TextName:"站班会管理",rightRouteTo:"ManagePage",imgheight:25,imgwidth:25},
        {Icontop:require('../images/Workload.png'),TextName:"工作量统计",rightRouteTo:"Workload",imgheight:25,imgwidth:25},
        {Icontop:require('../images/looking.png'),TextName:"人员检索",rightRouteTo:"PeopleLook",imgheight:25,imgwidth:25},
        {Icontop:require('../images/Eticket.png'),TextName:"电子作业票",rightRouteTo:"Eticket",imgheight:25,imgwidth:25},
      ]
    };
  }
  
  handleInput=(k,v)=>{
    this.setState({
      [k]:v
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    const borderstyleone = {borderRightWidth:1,borderBottomWidth:1,borderStyle:'solid',borderColor:"#ededed"};
    const borderstyletwo = {borderBottomWidth:1,borderStyle:'solid',borderColor:"#ededed"};
    const data = this.state.datas;
    return (
      <View style={{flex:1,alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'业务'}/>
       <ScrollView>
       <View style={{width:'100%'}}>
        <Image source={require('./../images/yewu.png')} style={{height:150,width:"100%"}}/>
         </View>
          <View style={{width:"100%",alignItems:'center',backgroundColor:"#ffffff", flexWrap:'wrap',flexDirection:'row'}}>
          
              {data.map((item,index)=>{
                return  <PicTextItem key={index}
                  borderStyle={index%2==0?borderstyleone:borderstyletwo} 
                  Icontop={item.Icontop} 
                  TextName={item.TextName}
                  imgheight={item.imgheight}
                  imgwidth={item.imgwidth}
                  rightRouteTo={item.rightRouteTo} 
                  data={item.data?item.data:'{}'}
                  parent={this.props.navigation} Pwidth={"50%"} height={80}/>
              })}
            
            </View>   
        </ScrollView>
      </View>
    );
  }
}
