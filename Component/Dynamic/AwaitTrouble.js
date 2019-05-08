/***
 * 首页待办事项子流程 
 * 
 * 问题处理页面
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,ToastAndroid} from 'react-native';
import ImagePicker2  from 'react-native-image-picker';
import HeaderBar from './../common/HeaderBar';
import {InputItem,TextareaItem} from 'antd-mobile-rn';
import DatePicker from 'react-native-datepicker'
import {questionupdate,lightUpload,structJigou} from '../../api/api'
import Modals from '../Model';
import KeModals from '../kemodel';
import config from '../../api/serviceAPI.config'
var options = { 
    title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册',
      cameraType: 'back',
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
export default class AwaitTrouble extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        modelList:[],
        token:'',
        actulRectifyTime:'',
        actulReviewTime:'',
        zhenggairen:'',
        rectifyContent:"",//整个该内容
        reviewContent:"",//复查内容
        rectifyImage:[],//整改照片id
        reviewImage:[],//复查照片id
        status:0,
        id:'',
        avatarSource:[],//整改照片
        reviewImageList:[],//复查照片
        bools:1,
        reviewDepartments: "",
        reviewMan: "",
        reviewUnit: "",
        isPass:'',
        jigoulist:[],
        progromsed:[{name:'不通过',id:1},{name:'通过',id:2}]
    }
  }

  componentDidMount(){
        this.getdata();
        this.getnewdata();
        this.viewDidAppear=this.props.navigation.addListener(
            'willFocus', async(obj)=>{
                this.getdata();
                this.setState({
                    bools:this.state.bools+1,
                })
            
          }
      );
  }
  
  getnewdata=async()=>{
    let structdata =window.jconfig.userinfo.projects[0].id||5;
    let struct = await structJigou(this.state.http,structdata);//得到所有机构
    this.setState({
        jigoulist:struct.data,
    })
  }
  getdata(){
    let dataItem = this.props.navigation.state.params.item;
    console.log(dataItem)
    
    let responseUnitInfos = dataItem.responseUnitInfos;//部门信息
    let unit={name:''},person={name:''};
    if(responseUnitInfos!=null){
        unit = responseUnitInfos[0].unit;
        person= responseUnitInfos[0].person;
    }
    this.setState({
      modelList:[
          {name:'问题描述',placeholder:dataItem.question,type:1,status:0},
          {name:"区域",key:'quyu',placeholder:dataItem.area==null?"":dataItem.area.local,type:1,status:0},
          {name:"责任单位",key:'zerendanwei',placeholder:unit.name,type:1,status:0}, 
          {name:"负责人",key:'fuzeren',placeholder:person.realname,type:1,status:0},
          {name:"检查单位",key:'jianyandanwei',placeholder:dataItem.checkUnit!=null?dataItem.checkUnit.name:'',type:1,status:0}, 
          {name:"整改截止时间",key:'jiezhishijian',placeholder:dataItem.deadline,type:1,status:0},
          {name:"依据",key:'yiju',placeholder:dataItem.gist!=null&&dataItem.gist.name,type:1,status:0},
          {   name:'现场照片',
              key:'zhaopiao',
              type:2,
              data:dataItem.attachs,
              status:0
          },
          {name:"复查单位",key:'fuchadanwei',placeholder:dataItem.reviewUnit!=null?dataItem.reviewUnit.name:'',type:1,status:1},
          {name:"整改内容",key:'jiezhishijian',placeholder:dataItem.rectifyContent,type:1,status:1},
          {name:"整改时间",placeholder:dataItem.actulRectifyTime,type:1,status:1},
          {   name:'整改照片',
              key:'zhaopiao',
              type:2,
              data:dataItem.attachs,
              status:1
          },
        //   {name:"复查时间",placeholder:dataItem.actulReviewTime,type:1,status:2},
        //   {name:"复查内容",key:'jiezhishijian',placeholder:dataItem.reviewContent,type:1,status:2},
        //   {   name:'复查照片',
        //       key:'zhaopiao',
        //       type:2,
        //       data:dataItem.attachs,
        //       status:2
        //   },
      ],
      id:dataItem.id,
      token:window.jconfig.userinfo.token||'',
      status:dataItem.status
    })
  }
handleInput=(k,v)=>{
    this.setState({
        [k]:v
    })
}
 submit = async() => {
    const { actulRectifyTime,rectifyImage,rectifyContent,status ,id,reviewContent,actulReviewTime,reviewImage,reviewDepartments,reviewMan,reviewUnit,isPass}= this.state;
    if(status==0){
        if( !actulRectifyTime||!rectifyContent){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
            }else{ 
               
               let datas={actulRectifyTime,rectifyImage:rectifyImage.join(','),rectifyContent,status:1,id,targetType:'rectify',reviewDepartments,reviewMan,reviewUnit};
                console.log(datas,"ffffffffffffffffffssssss")
                // return
                let result = await questionupdate(this.state.http,datas);
                console.log(result,".................")
                ToastAndroid.show(' 问题整改成功!',ToastAndroid.SHORT)
                this.props.navigation.navigate('AwaitTodo')
        
             }
        }else if(status==1){
            if( !actulReviewTime||!reviewContent){
                ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
                }else{ 
                  let  datas={actulReviewTime,reviewImage:reviewImage.join(','),reviewContent,status:2,id,targetType:'review',isPass};
                    console.log(datas,"ffffffffffffffffffssssss")
                    // return
                    let result = await questionupdate(this.state.http,datas);
                    console.log(result,".................")
                    ToastAndroid.show(' 问题整改成功!',ToastAndroid.SHORT)
                    this.props.navigation.navigate('AwaitTodo')
            
            } 
    }   
}
ssgets(v){
    this.handleInput('reviewUnit',v.jigou)
    this.handleInput('reviewDepartments',v.bumen)
    this.handleInput('reviewMan',v.ren)
}
getss(v){
    this.handleInput('isPass',v.id)
}
 choosePic(key) {
    ImagePicker2.showImagePicker(options, async(response) => {
    if (response.didCancel) {
    console.log('用户取消了选择！');
    }
    else if (response.error) {
    return ToastAndroid.show("打开相机失败" + ToastAndroid.SHORT);
    }
    else if (response.customButton) {
    alert("自定义按钮点击：" + response.customButton);
    }
    else {
        if(key==0){
            let arr=this.state.rectifyImage;
            let imageArr = this.state.avatarSource;
            let fordata = new FormData();
            let file = {uri: response.uri, type:response.type, name:response.fileName,targetType:'rectify'};
            imageArr.push(file);
            fordata.append('file',file)
                    //获取图片的id
                let unload  = await lightUpload(this.state.http,fordata,this.state.token);
                    arr.push(unload.data[0].generatedMaps[0].id);
                this.setState({
                    rectifyImage: arr,
                    avatarSource:imageArr
            })
        }else{
            let arr=this.state.reviewImage;
            let imageArr = this.state.reviewImageList;
            let fordata = new FormData();
            let file = {uri: response.uri, type:response.type, name:response.fileName,targetType:'review'};
            imageArr.push(file);
            fordata.append('file',file)
                    //获取图片的id
                let unload  = await lightUpload(this.state.http,fordata,this.state.token);
                    arr.push(unload.data[0].generatedMaps[0].id);
                this.setState({
                    reviewImage: arr,
                    reviewImageList:imageArr
            })
        }
    }
    })
}

//删除图片
delectImg=(id,key)=>{
    let dd = [];
    if(key=='avatarSource'){
         dd = this.state.avatarSource;
    }else{
        dd = this.state.reviewImageList;
    }
    
    let arr =[];

        dd.map((item,i)=>{
            if(id!=i){
                arr.push(item)
            }
        })
        this.deleImg(arr,key);
}

deleImg = (arr,keys)=>{  
    this.setState({
        [keys]:arr
    })
}
  render() {
 
      return (<View style={{alignItems:'center',flex:1,backgroundColor:"#FFF"}}>
               <HeaderBar parent={this} name="待办事项处理流程"/>
               <ScrollView style={{width:'100%'}}>
                   <View style={{alignItems:'center',flex:1}}>
                        <View style={styles.content}>
                                    {this.state.modelList.map((item,indexs)=>{
                                    
                                            if(item.status==0){
                                                return <View style={styles.modelsContent} key={indexs}>
                                                        <Text style={{width:'25%',color:"#000"}}>{item.name}*</Text>
                                                        <View style={styles.inputValve}>
                                                        { item.type==1?
                                                        <View style={{flexDirection:'row',justifyContent:'flex-start',minHeight:50,alignItems:'center'}}>
                                                            <Text>{item.placeholder}</Text>
                                                        </View>
                                                            :
                                                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',width:'80%'}}>
                                                            {item.data.map((items,tts)=>{
                                                            return <Image source={{uri:'http://192.168.2.3:7100'+items.path}} style={{width:'30%',height:60,margin:10}} key={tts}/>
                                                            })}
                                                        </View>
                                                        }
                                                    </View>
                                            </View>
                                            }
                                            if(item.status==1&&(this.state.status==1||this.state.status==2)){
                                                return <View style={styles.modelsContent} key={indexs}>
                                                        <Text style={{width:'25%',color:"#000"}}>{item.name}*</Text>
                                                        <View style={styles.inputValve}>
                                                        { item.type==1?
                                                        <View style={{flexDirection:'row',justifyContent:'flex-start',minHeight:50,alignItems:'center'}}>
                                                            <Text>{item.placeholder}</Text>
                                                        </View>
                                                            :
                                                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',width:'80%'}}>
                                                            {item.data.map((items,tts)=>{
                                                            return <Image source={{uri:'http://192.168.2.3:7100'+items.path}} style={{width:'30%',height:60,margin:10}} key={tts}/>
                                                            })}
                                                        </View>
                                                        }
                                                    </View>
                                            </View>
                                            }
                                            // if(item.status==2&&this.state.status==2){
                                            //     return <View style={styles.modelsContent} key={indexs}>
                                            //             <Text style={{width:'25%',color:"#000"}}>{item.name}*</Text>
                                            //             <View style={styles.inputValve}>
                                            //             { item.type==1?
                                            //             <View style={{flexDirection:'row',justifyContent:'flex-start',minHeight:50,alignItems:'center'}}>
                                            //                 <Text>{item.placeholder}</Text>
                                            //             </View>
                                            //                 :
                                            //             <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',width:'80%'}}>
                                            //                 {item.data.map((items,tts)=>{
                                            //                 return <Image source={{uri:'http://192.168.2.3:7100'+items.path}} style={{width:'30%',height:60,margin:10}} key={tts}/>
                                            //                 })}
                                            //             </View>
                                            //             }
                                            //         </View>
                                            // </View>
                                            // }

                                    })}
                            </View>

                           { this.state.status==0&&<View style={styles.content}>
                                <View style={{flexDirection:'row',width:'100%',
                                    backgroundColor:'#123456',justifyContent:'center',alignItems:'center',height:50}}>
                                    <Text style={{color:"red",fontSize:18}}>整改填报</Text>
                                </View>
                                <View style={styles.modelsContent}>
                                        <Text style={{color:"#000",width:'20%'}}>复查单位/人*</Text>
                                        <View style={styles.inputValvesss}>
                                             <Modals gets={this.ssgets.bind(this)} 
                                            textStyle={{color:'#666',fontSize:13,width:'70%'}} 
                                            data={this.state.jigoulist}
                                            style={{justifyContent:'center',paddingLeft:6,height:'100%'}}/>
                                        </View>
                                       
                                </View>
                                <View style={styles.modelsContent}>
                                    <Text style={{color:"#000",width:'20%'}}>整改时间*</Text>
                                    <DatePicker customStyles={{
                                            dateInput: {
                                            borderWidth:0,
                                            justifyContent:'center',
                                            alignItems:'flex-start',
                                            left:10
                                            },
                                            dateText:{
                                                color:'#000',
                                                fontSize: 16,
                                                fontWeight:'400',
                                               
                                            },
                                            placeholderText:{
                                                color:'#AAA',
                                                fontSize: 16,
                                                fontWeight:'400'
                                            }
                                    }}
                                    style={{justifyContent:'flex-start',height:40,width:'80%'}}   
                                    date={this.state.actulRectifyTime}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    confirmBtnText="确定"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(2018, 1, 1)}
                                    placeholder={'请选择整改时间'}
                                    onDateChange={(value)=>this.handleInput('actulRectifyTime',value)} />
                                </View>
                                <View style={styles.modelsContent}>
                                    <Text style={{color:"#000",width:'20%'}}>整改内容*</Text>
                                    <View style={{width:'80%',}}>
                                        <TextareaItem
                                            rows={5}
                                            style={{borderWidth:1,borderColor:'#666666',borderRadius:5}}
                                            placeholder="请填写整改内容"
                                            textStyle={{fontSize:14}}
                                            placeholderStyle={{fontSize:14}}
                                            onChange={(v)=>this.handleInput('rectifyContent',v)} 
                                        />  
                                    </View>
                                </View>
                                <View style={styles.selectImage}>
                                            <View style={{flexDirection:'row',flexWrap:'wrap',width:"100%",alignItems:'center',justifyContent:'center'}}>
                                                {this.state.avatarSource&&this.state.avatarSource.map((items,index)=>{
                                                    return <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}}  key={index+"avatarSource"}>
                                                    <Image source={{uri:items.uri}} style={styles.image}/>
                                                    <TouchableOpacity onPress={()=>this.delectImg(index,'avatarSource')} style={{width:15,height:15,right:10}}>
                                                        <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                                    </TouchableOpacity>
                                                </View>
                                                })}
                                                <TouchableOpacity onPress={()=>this.choosePic(0)} style={{width:90,height:60,justifyContent:'center',alignItems:'center',borderColor:'#aaa',borderWidth:1,borderStyle:'dotted',marginRight:5,marginBottom:5}}>
                                                    <Image source={require('../../images/addimg.png')} style={{width:20,height:20}}/>
                                                    <Text style={{fontSize:8}}>请上传整改图片</Text>
                                                </TouchableOpacity>
                                            </View>
                                </View>
                            </View>}
                            {this.state.status==1&&<View style={styles.content}>
                                <View style={{flexDirection:'row',width:'100%',
                                            backgroundColor:'#123456',justifyContent:'center',
                                            alignItems:'center',height:50}}>
                                    <Text style={{color:"red",fontSize:18}}>复查填报</Text>
                                </View>
                                <View style={styles.modelsContent}>
                                        <Text style={{color:"#000",width:'20%'}}>是否通过*</Text>
                                        <View style={styles.inputValvesss}>
                                        <KeModals 
                                            gets={this.getss.bind(this)} 
                                            textStyle={{color:'#666',fontSize:13}} 
                                            data={this.state.progromsed}
                                            style={{justifyContent:'center',paddingLeft:6,top:15}} />
                                        </View>
                                </View>
                                <View style={styles.modelsContent}>
                                    <Text style={{color:"#000",width:'20%'}}>复查时间*</Text>
                                    <DatePicker customStyles={{
                                            dateInput: {
                                            borderWidth:0,
                                            justifyContent:'center',
                                            alignItems:'flex-start',
                                            left:10
                                            },
                                            dateText:{
                                                color:'#000',
                                                fontSize: 16,
                                                fontWeight:'400',
                                               
                                            },
                                            placeholderText:{
                                                color:'#AAA',
                                                fontSize: 16,
                                                fontWeight:'400'
                                            }
                                    }}
                                    style={{justifyContent:'flex-start',height:40,width:'80%'}}   
                                    date={this.state.actulReviewTime}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    confirmBtnText="确定"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(2018, 1, 1)}
                                    placeholder={'请选择复查时间'}
                                    onDateChange={(value)=>this.handleInput('actulReviewTime',value)} />
                                </View>
                                <View style={styles.modelsContent}>
                                    <Text style={{color:"#000",width:'20%'}}>复查内容*</Text>
                                    <View style={{width:'80%',}}>
                                        <TextareaItem
                                            rows={5}
                                            style={{borderWidth:1,borderColor:'#666666',borderRadius:5}}
                                            placeholder="请填写复查内容"
                                            textStyle={{fontSize:14}}
                                            placeholderStyle={{fontSize:14}}
                                            onChange={(v)=>this.handleInput('reviewContent',v)} 
                                        />  
                                    </View>
                                </View>
                                <View style={styles.selectImage}>
                                            <View style={{flexDirection:'row',flexWrap:'wrap',width:"100%",alignItems:'center',justifyContent:'center'}}>
                                                {this.state.reviewImageList&&this.state.reviewImageList.map((items,index)=>{
                                                    return <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}} key={index+"reviewImageList"}>
                                                    <Image source={{uri:items.uri}} style={styles.image} />
                                                    <TouchableOpacity onPress={()=>this.delectImg(index,'reviewImageList')} style={{width:15,height:15,right:10}}>
                                                        <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                                    </TouchableOpacity>
                                                </View>
                                                })}
                                                <TouchableOpacity onPress={()=>this.choosePic(1)} style={{width:90,height:60,justifyContent:'center',alignItems:'center',borderColor:'#aaa',borderWidth:1,borderStyle:'dotted',marginRight:5,marginBottom:5}}>
                                                    <Image source={require('../../images/addimg.png')} style={{width:20,height:20}}/>
                                                    <Text style={{fontSize:8}}>请上传复查图片</Text>
                                                </TouchableOpacity>
                                            </View>
                                </View>
                            </View> }
                            
                        </View>
               </ScrollView>
               {this.state.status != 2 && <TouchableOpacity 
                    style={styles.searchs}
                    activeOpacity={0.8}
                    onPress={()=>this.submit()}>
                    <Text style={{color:"#FFF"}}>提交整改</Text>
                </TouchableOpacity>}
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
        flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    modelsContent:{
        width:"90%",
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    inputValve:{
        width:'70%',
    },
    inputValvesss:{
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