// CreateManagePage.js
// https://blog.csdn.net/qq_20652771/article/details/82184005 配置视频选择插件
/***
 * 
 * 创建站班会内容
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,TouchableHighlight,ToastAndroid} from 'react-native';

import HeaderBar from './../common/HeaderBar';
import {InputItem,TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import Selectone from './../common/Selectone'
import DatePicker from 'react-native-datepicker'

import ImagePicker2  from 'react-native-image-picker';
import TicketDropdownCheckBox from '../TicketDropdownCheckBox'
import {listunitperson,meetingupFile,createManage} from '../../api/api'
import config from '../../api/serviceAPI.config'
//图片选择器参数设置
var options = {
    title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      cameraType: 'front',
      mediaType: 'photo',
      videoQuality: 'medium',
      quality: 0.8,
      angle: 0,
      maxWidth:400,
      maxHright:200,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
  };


export default class CreateManagePage extends React.Component {

  constructor(props){
    super(props)
    this.state={
        type:1,
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,          
        Datess:null,//开始时间
        DateEnd:null,//结束时间
        loading:false,
        submitData:{
            startTime:null,
            endTime:null,
            summary:'',
            content:'',
            participantId:'',//成员
            responsePersonId:'',//负责人
            unit:'',
            project:'5',
            theme:''

        },
        avatarSource:[],
        VideoSource:[],
        userList:[]
    }
  }
  
   componentDidMount(){
     this.getuser();
  }

  async getuser(){
    let {http} = this.state;
    let rest= await listunitperson(http,5,'');//获取人员信息
    console.log(rest,"restttttttttttttt")
    let mechanism = rest.data[0].mechanism;
    this.state.submitData.unit = mechanism.id;
    this.state.userList = rest.data;
    this.forceUpdate();
  }
    handleInput=(k,v)=>{
        this.state.submitData[k]=v;
        this.forceUpdate();
    }
//选择照片按钮点击
choosePic(mediaType,pp,tt) {
    
    ImagePicker2.showImagePicker({
        ...options,
        mediaType,
        takePhotoButtonTitle:pp,
        chooseFromLibraryButtonTitle:tt,
    },async (response) => {
        console.log(response,"vvvvvvvv")
      if (response.didCancel) {
          console.log('用户取消了选择！');
      }
      else if (response.error) {
          alert("ImagePicker发生错误：" + response.error);
      }
      else if (response.customButton) {
          alert("自定义按钮点击：" + response.customButton);
      }
      else{
        let source ={};
        if(mediaType=='photo'){
             source = {uri: response.uri, type:response.type, name:response.fileName};
        }else{
            var str = response.path; 
            var index = str .lastIndexOf("\/");  
            str  = str .substring(index + 1, str .length);
            source = {uri:'file://'+response.path,name:str,type:'video/mp4'};
        }
         
          let fromdate = new FormData();
              fromdate.append('file',source);
          
          //获取图片的id
          let unload  = await meetingupFile(this.state.http,fromdate);
          console.log(unload,"图片上传返回值")
          if(unload.code == 'S10005'){
              ToastAndroid.show(unload.message,ToastAndroid.SHORT)
              return this.props.navigation.navigate('login');
          }

          if(mediaType=='photo'){
            let newsource = {uri: response.uri, type:response.type, name:response.fileName,imgid:unload.data[0].generatedMaps[0].id};
            let oldsource = this.state.avatarSource;
  
                oldsource.push(newsource)
            this.setState({
                avatarSource: oldsource
            }); 
        }else{
            let newsource = {uri:'file://'+response.path,name:str,type:'video/mp4',VideoId:unload.data[0].generatedMaps[0].id};
            let oldsource = this.state.VideoSource;
                oldsource.push(newsource)
            this.setState({
                VideoSource: oldsource
            }); 
       }
          
          }
      });
  }

  //删除图片、视频
   delectImg=(id,ispic)=>{
    let dd = [];
       if(ispic=='avatarSource'){
        dd = this.state.avatarSource;
       }else{
        dd = this.state.VideoSource;
       }
      let arr =[];
          dd.map((item,i)=>{
              if(id!=i){
                  arr.push(item)
              }
          })
          
      this.setState({
          [ispic]:arr
      })
  }

  Mygets(v,keys){
      console.log(v,"vvvvvvvvvvvvvvvvv")
        this.handleInput('responsePersonId',v.userid)
}
    submit = async() => {
        let {submitData,VideoSource,avatarSource} = this.state;
        let arr = Object.values(submitData);
        let videoids = [];
        let picids = [];
        VideoSource.map(item=>{
            videoids.push(item.VideoId)
        })
        avatarSource.map(item=>{
            picids.push(item.imgid)
        })
        if (arr.indexOf('') != -1 || arr.indexOf(null) != -1 ){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
         }else{
            console.log(submitData,"bbbbbbbbbbbbbb",videoids)
            let res = await createManage({...submitData,imageId:picids.join(','),videoId:videoids.join(',')});
            console.log(res,"ggggggggggg")
            
            if(res.code=='S10000'){
                ToastAndroid.show('站班会议创建成功',ToastAndroid.SHORT)
                this.props.navigation.pop();
            }
         }

    }

opens(v){//接收子组件传递过来的数据
    console.log(v,"vvvvvvvvvvvv")
    let tt = Object.keys(v);
    this.handleInput('participantId',tt.join(','));
}
  render() {
      return (<View style={{flex:1,backgroundColor:"#FFF"}}>
               <HeaderBar   parent={this} name="站班会议创建"/>
               {!this.state.loading?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                    <ActivityIndicator color="#363434"/>
                    <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                    </View>}
               <ScrollView>
                    {!this.state.loading&&<View style={{justifyContent:'center',alignContent:'center',flexDirection:'column',alignItems:'center',width:'100%'}}>
                        <View style={styles.content}>
                        <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>负责人*</Text>
                                <View style={styles.inputValve}>
                                <Selectone 
                                    gets={this.Mygets.bind(this)} 
                                    textStyle={{color:'#666',fontSize:13}} 
                                    data={this.state.userList}
                                    keysitem='realname'//用于区分要展示的列表元素
                                    itemkeys={'responsePerson'}//用于存储的key值
                                    // defaultNumber={this.state.type}//默认的值
                                    style={{justifyContent:'center',paddingLeft:6,height:'100%'}} />
                                    </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>主要成员*</Text>
                                <View style={styles.inputValve}>
                                   <TicketDropdownCheckBox 
                                         opens={this.opens.bind(this)} 
                                         SelectData={this.state.userList} 
                                         style={{flexWrap:'wrap',paddingTop:8,paddingLeft:5}} 
                                         TextColor={{color:'#666',fontSize:13}}
                                            />
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>会议主题*</Text>
                                <View style={styles.inputValves}>
                                    <TextareaItem rows={3} 
                                         onChange={(e)=>this.handleInput('theme',e)} 
                                         last={true}  
                                         placeholderTextColor="#666" 
                                         style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:14,
                                         minWidth:'75%',maxWidth:'75%',borderRadius:5}} placeholder="请输入会议主题"/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>会议纪要*</Text>
                                <View style={styles.inputValves}>
                                    <TextareaItem rows={6} 
                                         onChange={(e)=>this.handleInput('summary',e)} 
                                         last={true}  
                                         placeholderTextColor="#666" 
                                         style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:14,
                                         minWidth:'75%',maxWidth:'75%',borderRadius:5}} placeholder="请输入会议纪要"/>
                                </View>
                            </View>
                            
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>会议内容*</Text>
                                <View style={styles.inputValves}>
                                    <TextareaItem rows={6} 
                                         onChange={(e)=>this.handleInput('content',e)} 
                                         last={true}  
                                         placeholderTextColor="#666" 
                                         style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:14,
                                         minWidth:'75%',maxWidth:'75%',borderRadius:5}} placeholder="请输入主要内容"/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>开始时间*</Text>
                                <View style={[styles.inputValve,{top:5}]}>
                                <DatePicker customStyles={{
                                    dateInput: {
                                    justifyContent:'center',
                                    borderWidth:0,
                                    height:40
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
                                    placeholder={"请选择创建时间"}      
                                    onDateChange={(e)=>{this.setState({Datess:e});this.handleInput('startTime',e)}}/>
                                </View>
                            </View>
                            <View style={styles.modelsContent}>
                                <Text style={{width:80,color:"#000",fontSize:13}}>结束时间*</Text>
                                <View style={[styles.inputValve,{top:5}]}>
                                <DatePicker customStyles={{
                                    dateInput: {
                                    justifyContent:'center',
                                    borderWidth:0,
                                    height:40
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
                                    date={this.state.DateEnd}
                                    mode="datetime"        
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="确定"        
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(2015, 1, 1)}
                                    placeholder={"请选择结束时间"}      
                                    onDateChange={(e)=>{this.setState({DateEnd:e});this.handleInput('endTime',e)}}/>
                                </View>
                            </View>
                            <View style={styles.selectImage}>
                                    {/* 图片列表 */}
                                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',width:"95%",borderColor:'#eee',borderWidth:1,borderStyle:'solid',padding:10}}>
                                            {this.state.avatarSource&&this.state.avatarSource.map((items,index)=>{
                                                return<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}} key={index}>
                                                    <Image source={{uri:items.uri}} style={styles.image}/>
                                                    <TouchableOpacity onPress={()=>this.delectImg(index,"avatarSource")} style={{width:15,height:15,right:10}}>
                                                        <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                                    </TouchableOpacity>
                                                </View> 
                                            })}
                                            <TouchableOpacity  onPress={()=>this.choosePic('photo','拍照','相册')} style={styles.upload}>
                                                <Image source={require('../../images/addimg.png')} style={{width:30,height:30}}/>
                                                <Text style={{fontSize:8}}>请上传图片</Text>
                                            </TouchableOpacity>
                                        </View>
                                    {/* 图片列表 */}
                            </View>

                            <View style={styles.selectImage}>
                                    {/* 视频列表 */}
                                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',width:"95%",borderColor:'#eee',borderWidth:1,borderStyle:'solid',padding:10}}>
                                            {this.state.VideoSource&&this.state.VideoSource.map((items,index)=>{
                                                return<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}} key={index}>
                                                    <Text style={styles.image}>{items.name}</Text>
                                                    <TouchableOpacity onPress={()=>this.delectImg(index,"VideoSource")} style={{width:15,height:15,right:10}}>
                                                        <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                                    </TouchableOpacity>
                                                </View> 
                                            })}
                                            <TouchableOpacity   onPress={()=>this.choosePic('video','拍摄','相册')} style={styles.upload}>
                                                <Image source={require('../../images/addimg.png')} style={{width:30,height:30}}/>
                                                <Text style={{fontSize:8}}>请上传视频</Text>
                                            </TouchableOpacity>
                                        </View>
                                    {/* 视频列表 */}
                            </View>
                        </View>
                   </View>}
                  
               </ScrollView>
               <TouchableOpacity 
                    style={styles.searchs}
                    activeOpacity={0.8}
                    onPress={()=>this.submit()}>
                    <Text style={{color:"#FFF"}}>创建</Text>
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
        width:'95%',
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
     upload:{
        width:85,
        height:60,
        marginRight:10,
        marginBottom:5,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderColor:'#aaa',
        borderWidth:1,
        borderStyle:'solid'
    },
  })