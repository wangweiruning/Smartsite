/***创建风险 */

import React from 'react';

import {Text,View,TextInput,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import ImagePicker2  from 'react-native-image-picker';
import KeModals from '../kemodel';
import {locallist,tpriskinsert,risktype,riskLevel} from '../../api/api';
import DatePicker from 'react-native-datepicker';
import MySorage from '../../api/storage'
import config from '../../api/serviceAPI.config'
import AntmSwitch from 'antd-mobile-rn/lib/switch/index.native';
//图片选择器参数设置
var options = { 
    title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'medium',  // 图片质量
      durationLimit: 4,  // 
      maxWidth: 100, // 图片大小
      maxHeight: 100, // 图片大小
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
  };

export default class CreateRisk extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        awaitNum:11,
        isShow:true,
        Dates:'',
        Datek:'',
        progromsed:[],
        riskked:[],
        riskke:[],
        avatarSource: [],
        listtxt:'',
        index:null,
        vallistChange:false,
        showList:'',
        loading:true,
        canuse:false,
        submitData:{
            planStartDate:'',
            planEndDate:'',
            lng:{x:null,y:null},
            supervisionUser:'',
            controllecrUser:'',
            precontrolMethod:'',
            anticipateDanger:'',
            workContent:'',
            workPart:'',
            process:'',
            projectStage:'',
            riskName:'',
            areaId:'',
            riskType:'',
            riskLevel:'',
            riskPointId:'',
            projectid:5
  
  }
}
  }
    async componentDidMount(){
        let area = await locallist(this.state.http,5);
        let kris = await risktype(this.state.http);
        let level = await riskLevel(this.state.http);
        if(area.isSuccess()&&kris.isSuccess()&&level.isSuccess()){
            this.setState({
              riskked:level.data,
              riskke:kris.data,
              progromsed:area.data,
              loading:false,
              canuse:true
            })
        }else if(area.isCanUse()||kris.isCanUse()||level.isCanUse()){
          this.setState({
            loading:false,
            canuse:false
          })
          ToastAndroid.show('无权访问',ToastAndroid.SHORT)
        }
      
      this.viewDidAppear = this.props.navigation.addListener(
        'willFocus', async(obj)=>{
          MySorage._load('newXY',(data)=>{
            this.state.submitData.lng.x=data.X;
            this.state.submitData.lng.y=data.Y;
            this.forceUpdate();
      })
    })
    }


    handleInput=(key,value)=>{
        this.state.submitData[key]=value;
        this.forceUpdate();
    }


    async submit(){
        let  {submitData} = this.state;
        let arrs = Object.values(submitData);
        if(arrs.indexOf('') != -1 || arr.indexOf(null) != -1 ){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
          
        }else{
        
        let ks = await tpriskinsert(this.state.http,this.state.submitData)
        console.log(ks)
        if(ks.code='S10000'){
          this.props.navigation.navigate('Risk');
          ToastAndroid.show(ks.message,ToastAndroid.SHORT)
        }
        else{
          return ToastAndroid.show('创建失败',ToastAndroid.SHORT)
        }
      }
    }

  
//选择照片按钮点击
    //   choosePic() {
    //   ImagePicker2.launchImageLibrary(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('用户取消了选择！');
    //     }
    //   else if (response.error) {
    //     alert("ImagePicker发生错误：" + response.error);
    // }
    //   else if (response.customButton) {
    //     alert("自定义按钮点击：" + response.customButton);
    //   }
    //   else {
    //       console.log(response)
    //     let source = { uri: response.uri };
    //     let oldsource = this.state.avatarSource;
    //       oldsource.push(source)
    //     // You can also display the image using data:
    //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     this.setState({
    //       avatarSource: oldsource
    //     });
    //   }
    // })
    // }

    getto(v){
        this.handleInput('riskType',v.id)
    }

    getss(v){
        this.handleInput('riskLevel',v.id)
    }

    gets(v){
        this.handleInput('areaId',v.id)
    }

    render() {
      return (<View style={{flex:1,backgroundColor:'white'}}>
                    <HeaderBar name='添加风险计划' parent={this} />
                    {!this.state.loading?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                    <ActivityIndicator color="#363434"/>
                    <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                    </View>}
                    {this.state.canuse?<ScrollView>
                        <View style={{width:'100%',alignItems:'center'}}>
                        <View style={{width:'95%'}}>
                          <View style={{flexDirection:'row',alignItems:'center',height:45,borderBottomColor:'#eee',borderBottomWidth:.5}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>计划开始时间<Text style={{color:'#11A6FF'}}>*</Text></Text>
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
                            date={this.state.Dates}
                            mode="datetime"        
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="确定"        
                            cancelBtnText="取消"
                            showIcon={false}
                            minDate={new Date(2015, 1, 1)}
                            placeholder={"请选择开始时间"}
                            onDateChange={(e)=>{this.setState({Dates:e});this.handleInput('planStartDate',e)}}/>
                          </View>
                          <View style={{flexDirection:'row',alignItems:'center',height:45,borderBottomColor:'#eee',borderBottomWidth:.5}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>计划结束时间<Text style={{color:'#11A6FF'}}>*</Text></Text>
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
                            date={this.state.Datek}
                            mode="datetime"        
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="确定"        
                            cancelBtnText="取消"
                            showIcon={false}
                            minDate={new Date(2015, 1, 1)}
                            placeholder={"请选择结束时间"}
                            onDateChange={(e)=>{this.setState({Datek:e});this.handleInput('planEndDate',e)}}/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>风险点<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('riskPointId',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>风险等级<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <KeModals gets={this.getss.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.riskked}
                                style={{justifyContent:'center',paddingLeft:6}} />
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>风险类型<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <KeModals gets={this.getto.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.riskke}
                                style={{justifyContent:'center',paddingLeft:6}} />
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>区域<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <KeModals gets={this.gets.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.progromsed}
                                style={{justifyContent:'center',paddingLeft:6}} />
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>作业票名称<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('riskName',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>工程阶段<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('projectStage',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>工序<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('process',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>作业施工部位<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('workPart',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>主要风险<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('anticipateDanger',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>重点控制措施<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('precontrolMethod',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>工作负责人<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('controllecrUser',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <View style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>现场监理人<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextInput underlineColorAndroid='transparent' multiline={true} onChangeText={(e)=>this.handleInput('supervisionUser',e)} placeholderTextColor="#666" style={{color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%'}} placeholder="请输入"/>
                          </View>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('PicCheck',{type:3,local:this.state.submitData.lng})} style={{flexDirection:'row',height:45,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>具体位置<Text style={{color:'#11A6FF'}}>*</Text>{this.state.submitData.lng.x!=null?"重新选择":"请选择"}</Text>
                          </TouchableOpacity>
                          <View style={{flexDirection:'row',paddingTop:7,paddingBottom:7,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#eee'}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>作业施工内容<Text style={{color:'#11A6FF'}}>*</Text></Text>
                            <TextareaItem rows={6} onChange={(e)=>this.handleInput('workContent',e)} last={true}  placeholderTextColor="#666" style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:14,minWidth:'80%',maxWidth:'80%',borderRadius:5}} placeholder="请输入"/>
                          </View>
                        </View>
                        </View>
                        <TouchableOpacity style={{ width:'100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#11A6FF'}} activeOpacity={0.8}
                    onPress={()=>this.submit()}>
                    <Text style={{color:"#FFF"}}>风险创建</Text>
                </TouchableOpacity>
                    </ScrollView>:null}
                
        </View>)
      }
  }

  