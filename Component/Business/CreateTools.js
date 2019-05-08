/***
 * 
 * 绑定工器具
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TouchableHighlight,ToastAndroid} from 'react-native';

import HeaderBar from './../common/HeaderBar';
import {InputItem,TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import Selectone from './../common/Selectone'
import DatePicker from 'react-native-datepicker'
import Modals from '../Model';
import config from '../../api/serviceAPI.config'
import {structList,compoleteList,structJigou,
        periodList,toolStatus,toolsTypes,setTools,
        setBigTools,matterstatic,createTpmater} from '../../api/api'
import MySorage from '../../api/storage';

export default class CreateTools extends React.Component {

  constructor(props){
    super(props)
    this.state={
        type:1,
        Datess:'',
        Datess1:'',
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,          
        jigoulist:[],
        department:[],
        compolete:[],
        period:[],
        toStatus:[],
        toolsType:[],
        wuliaoType:[],
        materialUnit:[
            {namess:'个',id:1},
            {namess:"件",id:2},
            {namess:'斤',id:3},
            {namess:'箱',id:4},
            {namess:'瓶',id:5},
            {namess:"包",id:6},
            {namess:'只',id:7},
            {namess:'把',id:8},
            {namess:"对",id:9},
            {namess:'条',id:10},
            {namess:'根',id:11},
        ],
        submitMsg:{//物资信息绑定数据
            projectid:'5',	// 所属工程
            materialType:	'',	 //物料类型
            materialContractNo:'',// 合同编号
            materialName:	'', //物料名称
            materialRemark:	'', //物料描述
            materialUnit:'', //物料单位 (个 | 件 | 斤)
            materialNumber:	'',//物料净重/件数
            token:'',
            endAddress: {
                contact:"张颖",
                phone:"178285714253",
                lng:114.67814,
                lat:37.984517,
                address:"河北省, 石家庄市, 藁城区",
                description:'天河桥尾'
            },
            startAddress: {
                lng:116.389088,
                lat:39.925791,
                address:"北京市, 北京市, 西城区, 府右街, 2号",
                description:'详细地址',
                contact:"汪伟",
                phone:15685607534
            }


        },
        submitTool:{//大型机具绑定数据
            company:'',
            departments:'',
            gpsnum:'',
            name:'',
            number:'',
            person: "67",
            project: 5,
            remark:"",
            token:''
        },
        submitData:{//工器具绑定数据
            approachTime: "",
            code: "",
            departments: "",
            indate: "",
            mechanism: "",
            name: "",
            number: "",
            complete: "",
            para: "",
            period: "",
            phone: "",
            project: 5,
            responsePerson: "",
            status: "",
            type: "",
            useDepartments: "",
            usePerson: "",
            useUnit: "",
            qrCode:'',
            token:'',
            pointByget:null,
            pointBysend:null
        },
        loading:false
    }
  }
  
   componentDidMount(){
       this.getdatas()
    this.props.navigation.addListener(
        'willFocus', async(obj)=>{
         MySorage._load('pointByget',(data)=>{
            if(data!==null){
                this.state.submitMsg.startAddress.address = data.addressStr;
                this.state.pointByget = data;
                this.state.submitMsg.startAddress.lng=data.point.lng;
                this.state.submitMsg.startAddress.lat=data.point.lat;
                this.forceUpdate()
            }
         })
         MySorage._load('pointBysend',(res)=>{
            console.log(res,"jjjjjjjjjjjjjjj")
            if(res!==null){
                this.state.submitMsg.endAddress.address = res.addressStr;
                this.state.pointBysend = res;
                this.state.submitMsg.endAddress.lng=res.point.lng;
                this.state.submitMsg.endAddress.lat=res.point.lat;
                this.forceUpdate()
            }
         })
    })
  }
  getdatas = async()=>{
    let propsdata = this.props.navigation.state.params;
    let structdata =5;
    let struct = await structJigou(this.state.http,structdata);//得到所有机构


    let mechanism =struct.data[0].id;
    let departments = await structList(this.state.http,mechanism);//得到所有部门


    let compolete = await compoleteList(this.state.http)//得到完整程度
    let period = await periodList(this.state.http)//得到检查周期
    let toStatus = await toolStatus(this.state.http)//得到状态
    let toolsType = await toolsTypes(this.state.http)//得到工器具类型
    let wuliaoType = await matterstatic(this.state.http)//得到物料类型
   if(struct.isCanUse()||departments.isCanUse()||
        compolete.isCanUse()||period.isCanUse()||
        toStatus.isCanUse()||toolsType.isCanUse()||wuliaoType.isCanUse()){
             ToastAndroid.show('无权创建',ToastAndroid.SHORT)
            this.props.navigation.navigate('HomeScreen')
   }else{
    this.setState({
        jigoulist:struct.data,
        department:departments.data,
        compolete:compolete.data.data,
        period:period.data,
        toStatus:toStatus.data,
        toolsType:toolsType.data,
        loading:true,
        type:propsdata.data.type,
        wuliaoType:wuliaoType.data,
    })
    this.state.submitData.qrCode = propsdata.data.token;
    this.state.submitData.token = propsdata.data.token;
    this.state.submitTool.token = propsdata.data.token;
    this.state.submitMsg.token = propsdata.data.token;
    this.forceUpdate();
  }
    handleInput=(k,v)=>{
        this.state.submitData[k]=v;
        this.forceUpdate();
    }
    handleInputss=(k,v)=>{
        this.state.submitTool[k]=v;
        this.forceUpdate();
    }
    handleInputmore=(k,v)=>{
        this.state.submitMsg[k]=v;
        this.forceUpdate();
    }

    handleInputcoacat=(k,v,type)=>{
            if(type==1){
                this.state.submitMsg.startAddress[k] = v;
                this.forceUpdate();
            }else{
                this.state.submitMsg.endAddress[k] = v;
                this.forceUpdate();  
            }
    }
}
    gets(v){
        this.handleInput('useUnit',v.jigou)
        this.handleInput('useDepartments',v.bumen)
        this.handleInput('usePerson',v.ren)
    }

    gettool(v){
        this.handleInputss('company',v.jigou)
        this.handleInputss('mechanism',v.jigou)
        this.handleInputss('departments',v.bumen)
        this.handleInputss('person',v.ren)
    }
    ssgets(v){
        this.handleInput('mechanism',v.jigou)
        this.handleInput('departments',v.bumen)
        this.handleInput('responsePerson',v.ren)
    }

    submit = async() => {
        let {type,submitData,submitTool,submitMsg} = this.state
      
        let dates = type==1?submitData:type==2?submitTool:submitMsg;
        let arr = Object.values(dates);
        console.log(dates,",,,,,,,,,,,,,,,,")
        if (arr.indexOf('') != -1 || arr.indexOf(null) != -1 ){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
         }else{
             if(type==1){
                let settools = await setTools(this.state.http,dates);
                
                if(settools.code=='S10000'){
                    this.props.navigation.navigate('HomeScreen');//返回上一级
                    ToastAndroid.show('绑定成功!',ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show('参数错误!',ToastAndroid.SHORT)
                }
             }else if(type==2){
                let settools = await setBigTools(this.state.http,dates);
         
                if(settools.code=='S10000'){
                    this.props.navigation.navigate('HomeScreen');//返回上一级
                    ToastAndroid.show('绑定成功!',ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show('参数错误!',ToastAndroid.SHORT)
                }
             }else{
                let {
                        projectid,	// 所属工程
                        materialType,	 //物料类型
                        materialContractNo,// 合同编号
                        materialName, //物料名称
                        materialRemark, //物料描述
                        materialUnit, //物料单位 (个 | 件 | 斤)
                        materialNumber,//物料净重/件数
                        token,
                        endAddress,
                        startAddress} = dates;
                let tt={
                        projectid,	// 所属工程
                        materialType,	 //物料类型
                        materialContractNo,// 合同编号
                        materialName, //物料名称
                        materialRemark, //物料描述
                        materialUnit, //物料单位 (个 | 件 | 斤)
                        materialNumber,//物料净重/件数
                        token,
                        endAddress:JSON.stringify(endAddress),
                        startAddress:JSON.stringify(startAddress),
                    }
                let res = await createTpmater(this.state.http,tt)
                 console.log(res,"数据返回")
                 if(res.code=='S10000'){
                    MySorage._remove('pointByget')
                    MySorage._remove('pointBysend')
                    
                    this.props.navigation.navigate('HomeScreen');//返回上一级
                    ToastAndroid.show('绑定成功!',ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show('参数错误!',ToastAndroid.SHORT)
                }
             }
            
           
         }
    }


    Mygets(v,keys){
        if(keys == 'period'){//得到检查周期id
            this.handleInput(keys,v.id)
        }else if(keys =='type'){//得到工器具类型
            this.handleInput(keys,v.id)
        }else if(keys=='complete'){//得到完整程度
            this.handleInput(keys,v.id)
        }else if(keys=='status'){//得到工器具状态
            this.handleInput(keys,v.id)
        }
    }

    Msgnew(v,keys){
        if(keys=='materialUnit'){
            this.handleInputmore(keys,v.namess)
        }else{
            this.handleInputmore(keys,v.id)
        } 
    }

    getStatusByMap=(status) =>{
        this.props.navigation.navigate('SelectMapId',status)
    }

  render() {
      let {pointByget,pointBysend} = this.state;
      return (<View style={{flex:1,backgroundColor:"#FFF"}}>
               <HeaderBar   parent={this} name="二维码绑定工器具"/>
               {this.state.loading?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                    <ActivityIndicator color="#363434"/>
                    <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                    </View>}
               <ScrollView>
                    {this.state.loading&&this.state.type==1&&<View style={{justifyContent:'center',alignContent:'center',flexDirection:'column',alignItems:'center',width:'100%'}}>
                        <View style={styles.content}>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>工器具名称*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写工器具名称'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInput('name',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>工器具编码*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写工器具编码'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInput('code',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>检查周期*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.period}
                                        keysitem='period'//用于区分要展示的列表元素
                                        itemkeys={'period'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>工器具类型*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.toolsType}
                                        keysitem='toolname'//用于区分要展示的列表元素
                                        itemkeys={'type'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>检查证编号*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写检查证编号'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInput('number',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>进场时间*</Text>
                                <View style={styles.inputValve}>
                                <DatePicker customStyles={{
                                    dateInput: {
                                    justifyContent:'center',
                                    borderWidth:0,
                                    height:38
                                    },
                                    dateText:{
                                        color:'#666',
                                        fontSize:13
                                    },
                                    placeholderText:{
                                        color:'#666'
                                    }
                                    }}
                                    style={{justifyContent:'center',backgroundColor:"white"}}        
                                    date={this.state.Datess}
                                    mode="datetime"        
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="确定"        
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(2015, 1, 1)}
                                    placeholder={"请选择进场时间"}      
                                    onDateChange={(e)=>{this.setState({Datess:e});this.handleInput('approachTime',e)}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>负责单位/人*</Text>
                                <View style={styles.inputValve}>
                                <Modals gets={this.ssgets.bind(this)} 
                                textStyle={{color:'#666',fontSize:13,width:'70%'}} 
                                data={this.state.jigoulist}
                                style={{justifyContent:'center',paddingLeft:6,height:'100%'}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>使用单位/人*</Text>
                                <View style={styles.inputValve}>
                                <Modals gets={this.gets.bind(this)} 
                                textStyle={{color:'#666',fontSize:13,width:'70%'}} 
                                data={this.state.jigoulist}
                                style={{justifyContent:'center',paddingLeft:6,height:'100%'}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>负责人手机号*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写负责人手机号'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInput('phone',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>有效期*</Text>
                                <View style={styles.inputValve}>
                                <DatePicker customStyles={{
                                    dateInput: {
                                    justifyContent:'center',
                                    borderWidth:0,
                                    height:38
                                    },
                                    dateText:{
                                        color:'#666',
                                        fontSize:13
                                    },
                                    placeholderText:{
                                        color:'#666'
                                    }
                                    }}
                                    style={{justifyContent:'center',backgroundColor:"white"}}        
                                    date={this.state.Datess1}
                                    mode="datetime"        
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="确定"        
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(2015, 1, 1)}
                                    placeholder={"请选择有效时间"}      
                                    onDateChange={(e)=>{this.setState({Datess1:e});this.handleInput('indate',e)}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>完整程度*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.compolete}
                                        keysitem='completename'//用于区分要展示的列表元素
                                        itemkeys={'complete'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>状态*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.toStatus}
                                        keysitem='toolstatus'//用于区分要展示的列表元素
                                        itemkeys={'status'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>

                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>技术参数*</Text>
                                <View style={styles.inputValves}>
                                <TextareaItem rows={6} 
                                    onChange={(e)=>this.handleInput('para',e)} 
                                    last={true}  placeholderTextColor="#666" 
                                    style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:13,minWidth:'70%',
                                    maxWidth:'70%',borderRadius:5}} placeholder="请填写技术参数"/>
                                </View>
                            </View>
                        </View>
                   </View>}
                   {this.state.loading&&this.state.type==2&&<View style={{justifyContent:'center',alignContent:'center',flexDirection:'column',alignItems:'center',width:'100%'}}>
                        <View style={styles.content}>
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>设备名称*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写设备名称'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputss('name',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'70%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>使用单位/人*</Text>
                                <View style={styles.inputValve}>
                                <Modals gets={this.gettool.bind(this)} 
                                textStyle={{color:'#666',fontSize:13,width:'70%'}} 
                                data={this.state.jigoulist}
                                style={{justifyContent:'center',paddingLeft:6,height:'100%'}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>车牌号*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写车牌号'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputss('number',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'67%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                           
                            
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>GPS编码*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写GPS编码'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputss('gpsnum',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'67%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:100,color:"#000",fontSize:13}}>机具配置信息*</Text>
                                <View style={styles.inputValves}>
                                <TextareaItem rows={6} 
                                    onChange={(e)=>this.handleInputss('remark',e)} 
                                    last={true}  placeholderTextColor="#666" 
                                    style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:13,minWidth:'68%',
                                    maxWidth:'68%',borderRadius:5,padding:0}} placeholder="请填写机具配置信息"/>
                                </View>
                            </View>
                        </View>
                   </View>}

                   {this.state.loading&&this.state.type==3&&<View style={{justifyContent:'center',alignContent:'center',flexDirection:'column',alignItems:'center',width:'100%'}}>
                        <View style={styles.content}>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>物资名称*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写物资名称'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputmore('materialName',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>合同编号*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写合同编号'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputmore('materialContractNo',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>

                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>物料类型*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Msgnew.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.wuliaoType}
                                        keysitem='name'//用于区分要展示的列表元素
                                        itemkeys={'materialType'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>物资描述*</Text>
                                <View style={styles.inputValves}>
                                    <TextareaItem rows={6} 
                                        onChange={(v)=>this.handleInputmore('materialRemark',v)} 
                                        last={true}  placeholderTextColor="#666" 
                                        style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:13,minWidth:'70%',
                                        maxWidth:'70%',borderRadius:5}} placeholder="请填写物资描述"/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>物料单位*</Text>
                                <View style={styles.inputValve}>
                                    <Selectone 
                                        gets={this.Msgnew.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.materialUnit}
                                        keysitem='namess'//用于区分要展示的列表元素
                                        itemkeys={'materialUnit'}//用于存储的key值
                                        // defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>物料数量*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写物料数量'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputmore('materialNumber',v)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>

                            {/* { uri: 'file:///android_asset/pages/demo.html' } */}
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>发货人*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写发货人'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('contact',v,1)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>发货人电话*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写发货人电话'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('phone',v,1)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>发货坐标*</Text>
                                <TouchableOpacity
                                  onPress={()=>this.getStatusByMap(1)}
                                  style={styles.inputValvesss}>
                                    <Text >{pointByget!=null?pointByget.addressStr:'选择发货坐标'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>发货地址*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写详细发货地址'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('description',v,1)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>收货人*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写收货人'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('contact',v,2)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>收货人电话*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写收货人电话'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('phone',v,2)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>收货坐标*</Text>
                                <TouchableOpacity
                                  onPress={()=>this.getStatusByMap(2)}
                                  style={styles.inputValvesss}>
                                    <Text >{pointBysend!=null?pointBysend.addressStr:'选择收货坐标'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>收货地址*</Text>
                                <View style={styles.inputValve}>
                                    <InputItem placeholder={'请填写详细收货地址'} placeholderTextColor={'#666'}
                                    autoFocus={false} onChange={(v)=>this.handleInputcoacat('description',v,2)} 
                                    styles={{fontSize:13}}
                                    style={{width:'78%',borderBottomColor:"#fff"}}/>
                                </View>
                            </View>
                        </View>
                   </View>}
               </ScrollView>
               <TouchableOpacity 
                    style={styles.searchs}
                    activeOpacity={0.8}
                    onPress={()=>this.submit()}>
                    <Text style={{color:"#FFF"}}>绑定</Text>
                </TouchableOpacity>
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    modelsContent:{
        width:"90%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    inputValves:{
        width:'100%',
        justifyContent:'space-between',  
    },
    inputValve:{
        width:'100%',
        height:50,
        justifyContent:'space-between',
    },
    inputValvesss:{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
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
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#11A6FF',
    },
    selectImage:{
        width:'90%',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
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
   
  })