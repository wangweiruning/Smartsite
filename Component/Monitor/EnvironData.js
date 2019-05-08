/**
 * 环境监测  数据显示
 * 
 *  */
 import React from 'react';
 import {Text,View,Image,TouchableOpacity,StyleSheet,Dimensions,TouchableHighlight} from 'react-native';
 import HeaderBar from './../common/HeaderBar';
 import SelectDialog from 'react-native-select-dialog';
 import Echarts from 'native-echarts'
var dataBank=[
                {txt:'中国工商银行',id:'option1'},
                {txt:'中国建设银行',id:'option2'},
                {txt:'中国银行',id:'option3'},
                {txt:'交通银行',id:'option4'},
                {txt:'招商银行',id:'option5'},
                {txt:'中国邮政储蓄银行',id:'option6'},
                {txt:'中国光大银行',id:'option7'},
                {txt:'中国民生银行',id:'option8'},
                {txt:'平安银行',id:'option9'},
                {txt:'浦发银行',id:'option10'},
                {txt:'中信银行',id:'option11'},
                {txt:'兴业银行',id:'option12'},
                ];
var dataList=[
    {txt:'小红',id:'1'},
    {txt:'小明',id:'2'},
    {txt:'小林',id:'3'},
    {txt:'小李',id:'4'},
    {txt:'小赵',id:'5'},
    {txt:'小兰',id:'6'},
    ];
const option = {
    // title: {
    //     text: '未来一周气温变化',
    //     subtext: '纯属虚构'
    // },
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        data:['最高气温','最低气温']
    },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         dataZoom: {
    //             yAxisIndex: 'none'
    //         },
    //         // dataView: {readOnly: false},
    //         // magicType: {type: ['line', 'bar']},
    //         // restore: {},
    //         // saveAsImage: {}
    //     }
    // },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [
                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                    [{
                        symbol: 'none',
                        x: '80%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        label: {
                            normal: {
                                position: 'start',
                                formatter: '最大值'
                            }
                        },
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
};
 export default class EnvironData extends React.Component {
 
   constructor(props){
     super(props)
     this.state={
        initTxt:'请选择银行',
        initlistTxt:'请选择名字',
        mess:'',
        listtxt:'',
        index:null,
        valChange:false,
        vallistChange:false,
     }
   }
   changBank(item,index){
    this.setState({
        mess:item.txt,
        index:item.id,
        valChange:true})	  
}
changList(item,index){
    this.setState({
        listtxt:item.txt,
        listindex:item.id,
        vallistChange:true})		
    }
show(){
this.refs.bankName.show()
}
showList(){
this.refs.showList.show()
}
   render() {
     const  {list} = this.props.navigation.state.params;
     const listVal=this.state.valChange?this.state.mess:this.state.initTxt;
	 const listVal2=this.state.vallistChange?this.state.listtxt:this.state.initlistTxt;
       return (<View style={{alignItems:'center',flex:1,backgroundColor:"#FFF"}}>
                <HeaderBar parent={this} name={list.name}/>
                <View style={styles.content}>
                    <View style={styles.SelectDialog}>
                        <Text>银行</Text>    
                        <TouchableHighlight style={{flexDirection:'row',height:32, margin:20}}  
                                onPress={this.show.bind(this)}
                                underlayColor="transparent">
                            <View style={styles.gongList}>
                                <Text style={{left:5}}> {listVal} </Text>
                                <Image style={{width:18,height:18}} source={require('../../images/setdown.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.SelectDialog}>
                        <Text>环境</Text>    
                        <TouchableHighlight style={{flexDirection:'row',height:32, margin:20}}  
                                onPress={this.showList.bind(this)}
                                underlayColor="transparent">
                            <View style={styles.gongList}>
                                <Text style={{left:5}}> {listVal2} </Text>
                                <Image style={{width:18,height:18}} source={require('../../images/setdown.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <SelectDialog 
                        ref="showList" 
                        titles={'请选择工作环境'} 
                        valueChange={this.changList.bind(this)} 
                        datas={dataList}
                        animateType={'fade'}
                        positionStyle={{backgroundColor:"#1884CD"}}			  
                        />
                    <SelectDialog 
                        ref="bankName" 
                        titles={'请选择银行'} 
                        valueChange={this.changBank.bind(this)} 
                        datas={dataBank}
                        animateType={'fade'}	
                        positionStyle={{backgroundColor:"#1884CD"}}		  
                        />

                    <TouchableOpacity 
                        style={styles.searchs}
                        activeOpacity={0.8}
                        onPress={()=>{alert(`${this.state.listtxt} ${this.state.mess}`)}}>
                        <Text style={{color:"#FFF"}}>查询</Text>
                    </TouchableOpacity> 

                    <View style={{width:"96%",justifyContent:'center',alignItems:'center',top:15}}>
                        <Echarts option={option} height={400} />
                    </View>
                </View>
         </View> );
     }
   }
 
   const styles = StyleSheet.create({
     content:{
       width:'100%',
       flexDirection:'column',
       alignItems:'center',
       justifyContent:'center',
       marginTop:20
     },
     gongList:{
         width:'90%',
         flexDirection:"row",
         alignItems:'center',
         justifyContent:'space-between',
         borderRadius:10,
         borderWidth:1,
     },
     SelectDialog:{
         width:'85%',
         height:50,
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center'
     },
     searchs:{
         width:'55%',
         height:40,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:'#2FC651',
         borderRadius:5
     }
   })
