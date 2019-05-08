/* 施工进度*/

import React from 'react';
import {Image,TextInput,TouchableOpacity, ScrollView, FlatList,ToastAndroid, Text, View ,Modal} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import DatePicker from 'react-native-datepicker'
import config from '../../api/serviceAPI.config'
import {projectplanitem,mprojectconfirm} from '../../api/api'


export default class Progress extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            token:jconfig.userinfo.token,
            prid:5,
            show:false,
            start:'',
            over:'',
            id:'',
            data:[],
            proname:'',
            value:'',
            charge:'',
            values:'',
            datas:{},
            openArr:new Map(),
            Myprogress:[]
        }
    }
    
    componentDidMount(){
        this.getListData();
    }

    getListData = async()=>{
        let {http,token,prid} = this.state;

        let datas = await projectplanitem(http,token,prid);
        console.log('施工进度',datas)
        if(datas.isSuccess()){
        this.setState({
                    Myprogress:datas.data
        })
        }else if(datas.isCanUse()){
            ToastAndroid.show(datas.message,ToastAndroid.SHORT)
        }
        
    }


    open(item,gg){
        let openArr = this.state.openArr;
        let {id,title,startTime,endTime,responsibleUname,state} = item;
        if(openArr.has(id)) openArr.delete(id)
        else openArr.set(id);
        this.setState({openArr})
        if(!gg){
            this.setState({show:!this.state.show,proname:title,start:startTime,over:endTime,charge:responsibleUname,id:id,status:state});
        } 
    }

    checkIsOpen (id) {
        let openArr = this.state.openArr;
        if(openArr.has(id)) return true;
        return false;
    }

    async tijiao(taskId){
        let {value,values,http,token,prid} = this.state;
        let data={practical_stime:value,practical_etime:values,taskId};
        if(!value||!values) return  ToastAndroid.show('请选择时间',ToastAndroid.SHORT)
        let res = await mprojectconfirm(http,data,token,prid);

        if(res.isSuccess()){
            ToastAndroid.show(res.message,ToastAndroid.SHORT)
            this.setState({
                show:false,
                value:'',
                values:''
            })
            this.getListData()
        }
    
    }

    renderFlatList = (data,left=1,gg=false) =>{
        let k = left;
        k++;
          return (<FlatList style={{height:"100%"}} data={data} keyExtractor={(item,index)=>index.toString()} 
             renderItem={({item,index})=>{
                let {title,id,items} = item;
                return(<View key={id} style={{height:"100%",flex:1,backgroundColor:'white',marginTop:7,borderBottomWidth:!items?0.5:0,borderBottomColor:"#f2f2f2"}}>
                    <View style={{height:"100%",flex:1}}>
                 <TouchableOpacity onPress={()=>{this.open(item,items)}} style={{flexDirection:'row',alignItems:'center',width:"100%"}}>
                    <View style={{width:"100%"}}>
                        <View style={{paddingLeft:!gg?0:left*10,width:"100%",flexDirection:'row',alignItems:'center',padding:10}}>
                            {items && items.length>0?
                            <Image source={this.checkIsOpen(item.id)?require('../../images/die2.png'):
                            require('../../images/die.png')} style={{width:10,height:10}} />:<Image source={require('../../images/eyes.png')} style={{width:15,height:15}}/>}
                            <Text style={{color:'#333',marginLeft:15,flex:1}}>{title}</Text>
                            {item.state==3&&
                            <Image source={require('../../images/shijian3.png')} />}
                            {items && items.length>0&&
                            <Image source={require('../../images/prdown.png')} style={{width:15,height:15,marginRight:10}}/>}
                        </View>
                    </View>
                 </TouchableOpacity>
                    <View key={id}>{(this.checkIsOpen(id) && items && items.length>0) && this.renderFlatList(items,k,true)}</View>
                    </View>
                </View>)}}
            />)
    }

    Modeked(name,start,over,charge,id,status){
    return <Modal animationType={'slide'} visible={this.state.show} transparent={true} onRequestClose={()=>this.setState({show:!this.state.show})}>
        <View style={{backgroundColor:'rgba(0,0,0,.3)',flex:1}}>
          <TouchableOpacity style={{height:'55%'}} onPress={()=>this.setState({show:!this.state.show})}></TouchableOpacity>
          <View style={{height:'45%',alignItems:'center'}}>
           <View style={{width:'95%',backgroundColor:"white"}}>
             <View style={{padding:10,backgroundColor:'#f5f5f5',flexDirection:"row",alignItems:"center"}}>
                <Image source={require('../../images/die.png')} style={{width:15,height:15}}/>
                <Text style={{marginLeft:10,color:'#333'}}>{name}</Text>
             </View>
             <View>
               <View style={{flexDirection:'row',alignItems:"center",padding:7}}>
                <Image source={require('../../images/myshijian.png')} style={{width:20,height:20}}/>
                <Text style={{marginLeft:10,color:'#333'}}>开始时间：{start}</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:"center",padding:7}}>
                <Image source={require('../../images/myshijian.png')} style={{width:20,height:20}}/>
                <Text style={{marginLeft:10,color:'#333'}}>结束时间：{over}</Text>
               </View>
               <View style={{flexDirection:'row',alignItems:"center",padding:7}}>
                <Image source={require('../../images/myyyyyy.png')} style={{width:20,height:20}}/>
                <Text style={{marginLeft:10,color:'#333'}}>工程负责人：{charge}</Text>
               </View>

               {status!=3?<View>
                <DatePicker customStyles={{
                        dateInput: {
                        borderWidth:0,
                        justifyContent:'center'
                        },
                        dateText:{
                            color:'#444444',
                            fontSize: 14
                        },
                        placeholderText:{
                            color:'#444444',
                            fontSize: 14
                        }
                }}
                style={{justifyContent:'center',height:35,width:'100%',borderBottomColor:'#999',borderBottomWidth:1,borderStyle:'solid',borderTopColor:'#999',borderTopWidth:1}}   
                date={this.state.value}
                mode="datetime"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}
                minDate={new Date(2015, 1, 1)}
                placeholder={'实际开始时间'}
                onDateChange={(e) => {this.setState({value:e});console.log(e)}} />
                <DatePicker customStyles={{
                        dateInput: {
                        borderWidth:0,
                        justifyContent:'center'
                        },
                        dateText:{
                            color:'#444444',
                            fontSize: 14
                        },
                        placeholderText:{
                            color:'#444444',
                            fontSize: 14
                        }
                }}
                style={{justifyContent:'center',height:35,width:'100%',borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#999'}}   
                date={this.state.values}
                mode="datetime"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="确定"
                cancelBtnText="取消"
                showIcon={false}
                minDate={new Date(this.state.value)}
                placeholder={'实际结束时间'}
                onDateChange={(e) => {this.setState({values:e})}} />
             

             <View style={{flexDirection:'row',padding:10,justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.tijiao(id)} style={{paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,borderRadius:4,alignItems:'center',backgroundColor:'#11A6FF'}}>
                 <Text style={{color:'white'}}>确定</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({show:!this.state.show})} style={{paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,borderRadius:4,alignItems:'center',backgroundColor:'#d1d1d1',marginLeft:10}}>
                 <Text style={{color:'white'}}>取消</Text>
                </TouchableOpacity>
             </View>
             </View>:<View style={{flexDirection:'row',padding:10,justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.setState({show:!this.state.show})} style={{paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15,borderRadius:4,alignItems:'center',backgroundColor:'#d1d1d1',marginLeft:10}}>
                 <Text style={{color:'white'}}>已完成</Text>
                </TouchableOpacity>
             </View>}

             </View>
           </View>
          </View>
        </View>
    </Modal>
    }


    render(){
        let {Myprogress,charge,proname,start,over,id,status} = this.state;
        return(<View style={{flex:1}}>
            <HeaderBar parent={this} name={'施工进度'} />
            {this.renderFlatList(Myprogress)}
            {this.Modeked(proname,start,over,charge,id,status)}
        </View>)
    }
}