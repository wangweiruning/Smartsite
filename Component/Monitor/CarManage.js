/**
 * 
 * 人员统计
 */
import React from 'react';
import {Text,View,Image,ToastAndroid,StyleSheet,ScrollView,RefreshControl} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import Echarts from 'native-echarts'
import { Tabs } from 'antd-mobile-rn';
import {data_month,data_day} from '../../api/api'
import config from '../../api/serviceAPI.config'

export default class CarManage extends React.Component {

  constructor(props){
    super(props)
    this.state={
     PersonNum:0,
     AllPersonNum:0,
     start_date:'2018',
     loading:true,
     getNowDateTime:'2019-02-13',
     isFetching:false,
     http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
     monthdata:[],
     daydata:[],

    }
  }
   

componentDidMount(){
     this.getMonthData();

}
    formatDate(date){ 
        var myyear = date.getFullYear(); 
        var mymonth = date.getMonth()+1; 
        var myweekday = date.getDate(); 
        if(mymonth < 10){ 
        mymonth = "0" + mymonth; 
        } 
        if(myweekday < 10){ 
        myweekday = "0" + myweekday; 
        } 
        return (myyear+"-"+mymonth + "-" + myweekday); 
    } 

    getMonthData= async()=>{
        let datas = await data_month(this.state.http,1);
        let daydatas = await data_day(this.state.http,1);
        if(datas.isSuccess()&&daydatas.isSuccess()){
        let ttss = daydatas.data.resultDays;
      
        var now = new Date(); //当前日期 
        var nowDay = now.getDate(); //当前日 
        let subindex = 0;
        ttss.map((item,index)=>{
            if(index==nowDay-1){
                subindex = item.total;
            }
        })
        this.setState({
                monthdata:datas.data,
                daydata:daydatas.data.resultDays,
                AllPersonNum:daydatas.data.total,
                PersonNum:subindex,
                getNowDateTime:this.formatDate(now)
        })
    }else if(datas.isCanUse()||daydatas.isCanUse()){
        ToastAndroid.show('无权访问数据',ToastAndroid.SHORT)
    }
    }
    goflash=()=>{
        this.getMonthData()
    }
    onRefresh=(isFetching)=>{
        this.setState({isFetching:true})
        setTimeout(()=>{
            this.getMonthData();
            this.setState({isFetching:false})
        },2400)
    }
    option = (title,key,itemIndex)=>{
        let dataItme=[];
        let numbers=[];
        var now = new Date(); //当前日期 
        var nowDay = now.getDate(); //当前日 
        var nowMonth = now.getMonth();
        if(key==0){
             itemIndex.map((items,ii)=>{
                 if(ii>=nowDay) return;
                dataItme.push(`${nowMonth+1}-${items.day}`)
                numbers.push(items.total)
            })
        }else if(key==1){
            itemIndex.map(item=>{
                dataItme.push(item.months);
                numbers.push(item.total);
            })
           
        }else{
            let tt = itemIndex;
            let one =0,two=0,three=0,four=0;
            tt.map((item,index)=>{
                if(index<3){
                    one+=item.total
                }else if(3<=index<6){
                    two+=item.total
                }
                else if(6<=index<9){
                    three+=item.total
                }else{
                    four+=item.total
                }
                dataItme.push(item.months);
                numbers.push(item.total);
            })
            dataItme=['第一季度','第二季度','第三季度','第四季度'];
            numbers = [one,two, three, four];
        }
        return {
            title: {
                text: '进站车辆统计'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left:10,
                right:60,
                bottom: 50,
                containLabel: true
            },
            xAxis : [
                {
                    // type : 'category',
                    boundaryGap : false,
                    data :dataItme,
                    name:`(${title})`
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name :'(辆)'
                }
            ],
            series : [
                {
                    name:'进站车辆',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {color:'#4dd0e1'}},
                    data:numbers
                }
            ],
            dataZoom:key==0? [
                {type: 'slider',//图表下方的伸缩条
                show : true, //是否显示
                realtime : true, //拖动时，是否实时更新系列的视图
                start : 80, //伸缩条开始位置（1-100），可以随时更改
                end : 100},
                {
                    type: 'inside',
                    realtime: true,
                    start: 80,
                    end: 100
                }
            ]:[],
        }
    }


  render() {

    const tabs = [
            { title: '天数' },
            { title: '月份' },
            { title: '季度' }
        ];
    
      const{isFetching} = this.state;


      return (<View style={{flex:1}}>
                <HeaderBar gets={this.goflash.bind(this)} flashing={true} parent={this} name="车辆统计" rightIcon={'sync'}/>
               <ScrollView style={{width:"100%",backgroundColor:"#FFF"}} 
                            refreshControl={<RefreshControl
                                refreshing={isFetching}
                                onRefresh={()=>this.onRefresh(isFetching)}
                                colors={['rgb(217, 51, 58)']}
                        />}>
               <View style={styles.content}>
                    <View style={styles.wuzi}>
                        <Text>今日进站车辆</Text>
                        <Text style={{fontSize:20,color:'#4dd0e1'}}>{this.state.PersonNum}</Text>
                    </View>
                    <View style={styles.tongji}>
                        <View style={styles.Wireframe}>
                            <Text>{this.state.getNowDateTime}</Text>
                            <View style={styles.showPerson}>
                                <Text style={{fontSize:18}}>进站车辆</Text>
                                <Text style={{fontSize:24,color:'#4dd0e1'}}>{this.state.PersonNum}</Text>
                                {/* <Text style={{fontSize:18}}>人</Text> */}
                            </View>
                        </View>
                    
                    </View>
               </View>
               <Tabs tabs={tabs} swipeable={false}>
                    <View style={styles.style}>
                        <Echarts option={this.option(tabs[0].title,0,this.state.daydata)} height={300} />
                    </View>
                    <View style={styles.style}>
                        <Echarts option={this.option(tabs[1].title,1,this.state.monthdata)} height={300} />
                    </View>
                    <View style={styles.style}>
                        <Echarts option={this.option(tabs[2].title,2,this.state.monthdata)} height={300} />
                    </View>
                </Tabs>
            </ScrollView>
               
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      height:'40%'
    },
    wuzi:{
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'baseline'
    },
    fontColor:{
        width:'100%',
        color:"#0C6BAF",
    },
    tongji:{
        width:"80%",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    Wireframe:{
        width:'98%',
        height:100,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0C6BAF',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:10
    },
    goAndBack:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    showPerson:{
        alignItems:'baseline',
        flexDirection:'row',
    },
    style :{
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:350,
        backgroundColor: '#fff',
      }
  })