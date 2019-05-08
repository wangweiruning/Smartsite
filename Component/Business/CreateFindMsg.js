/**
 * 创建问题
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,ToastAndroid,TextInput} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import ImagePicker2  from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import MySorage from '../../api/storage';
// import TicketDropdownCheckBox from '../TicketDropdownCheckBox';
import Modals from '../Model';
import KeModals from '../kemodel';
import config from '../../api/serviceAPI.config';
import {slist,locallist,listlook,xgins,submitqus,policycriterion,lightUpload} from '../../api/api';

//图片选择器参数设置

    var options = {
        title: '选择图片',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '相册',
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'medium',  // 图片质量
        //   durationLimit: 4,  // 
        //   maxWidth: 100, // 图片大小
        //   maxHeight: 100, // 图片大小
        quality: 0.8,
        angle: 0,
        allowsEditing: false,
        noData: false,
        storageOptions: {
            skipBackup: true
        }
    }

export default class CreateFindMsg extends React.Component {

  constructor(props){
    super(props)
    MySorage._getStorage();
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        token:window.jconfig.userinfo.token,
        value: [],
        stop:null,
        jcnum: 1,
        awaitNum:11,
        pickerValue:[],
        isShow:true,
        avatarSource: [],
        picData:[],
        listtxt:'',
        zrnum:1,
        index:null,
        vallistChange:false,
        showList:'',
        data:[],
        myBm:[],
        ryData:[],
        Dates:'',
        Datess:'',
        type:[],
        weizh:[],
        imgdata:[],
        progromsed:[],
        yj:[],
        keds:[],
        bt:[1],
        submitData:{
            area:'',
            checkMan:'',
            targetType:'check',
            checkTime:'',
            deadline:'',
            projectId:5,
            location:{x:null,y:null},
            question:'',
            image:'',
            responseUnit:[
                {
                 unitId:'',
                 departmentId:'',
                 personId:''
                }
            ],
            checkUnit:'',
            rectify_departments:'',
            departments:'',
            type:'',
            gist:'',
            status:0,
            // responsePerson:{userid:''},
            // attachId:'',
            // unit:'',
            // reviewUnit:{id:''},
            // reviewDepartments:{id:''},
            // reviewMan:{userid:''},
        }
      }
    }


    async componentDidMount(){
        let keds = await policycriterion(this.state.http,`currentPage=1&pageSize=100&project=5`,jconfig.userinfo.token);
        let jg = await slist(this.state.http,5);
        let area = await locallist(this.state.http,5);
        let type = await listlook(this.state.http);
        let weizh = await xgins(this.state.http);
        if(keds.code=='S10004'){
            this.setState({
                stop:keds.code
            })
            return
        }
        else{
            this.setState({
                keds:keds.data.data,
                data:jg.data.data,
                type:type.data.data,
                weizh:weizh.data,
                progromsed:area.data
            })
        }
        
        this.viewDidAppear = this.props.navigation.addListener(
            'willFocus', async(obj)=>{
             MySorage._load('XY',(data)=>{
                this.state.submitData.location.x=data.X;
                this.state.submitData.location.y=data.Y;
                this.forceUpdate();
            })
        })
    }

    handleInput=(key,value)=>{
        this.state.submitData[key]=value;
        this.forceUpdate();
    }

    handleInputs=(key,num,k,value)=>{
        this.state.submitData[key][num][k]=value;
        this.forceUpdate();
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }

        
    async submitup(){
        let k  =  this.state.submitData.responseUnit.filter(v=>!v.remove);
        let {avatarSource} =this.state;
            let images = [];
        avatarSource.map(item=>{
                images.push(item.imgid)
            })

        this.state.submitData.responseUnit = k;
        let tts = {...this.state.submitData,attachId:images.join(','),location:JSON.stringify(this.state.submitData.location)}
        console.log(tts)
        // return
        let tj = await submitqus(this.state.http,tts);
        if(tj.code=='S10000'){
            ToastAndroid.show('问题上传成功!',ToastAndroid.SHORT);
            this.props.navigation.navigate('FindMsg');
        }
        else{
            return ToastAndroid.show('上传失败',ToastAndroid.SHORT);
        }
    }

      
    submit=()=>{
        let arrsed = [];
        let kde = this.state.picData;
        let cd = this.state.submitData.pic;
        let g = Object.assign(cd,kde);
        this.state.submitData.pic = g;
        let kda = this.state.submitData;
        arrsed.push(kda);
        return
        MySorage._sava("progrom",arrsed);
        this.props.navigation.navigate('FindMsg');
        ToastAndroid.show('问题保存成功!',ToastAndroid.SHORT)
    }


      
    choosePic() {
        ImagePicker2.showImagePicker(options,async(response) => {
        if(response.didCancel){
        return ToastAndroid.show('已取消操作',ToastAndroid.SHORT)
        }
        if (response.error) {
        return ToastAndroid.show("打开相机失败",ToastAndroid.SHORT);
        }
        let fordata = new FormData()
        
        let file = {uri: response.uri, type:response.type, name:response.fileName}
        fordata.append('file',file)
        let unload  = await lightUpload(this.state.http,fordata,this.state.token);
       console.log(unload)
        let source = {uri: response.uri, type:response.type, name:response.fileName,imgid:unload.data[0].generatedMaps[0].id};
        let oldsource = this.state.avatarSource;
            oldsource.push(source)

            let arrs = this.state.imgdata;
            arrs.push(unload.data[0].generatedMaps[0].id);
            
            this.state.submitData.image = arrs.join(',')
            this.setState({
            avatarSource: oldsource,
            imgdata:arrs
            })
            this.forceUpdate();
        })
    }

    delectImg=(id)=>{
        let dd = this.state.avatarSource;
        let arr =[];
        dd.map((item,i)=>{
            if(id!=i){
                arr.push(item)
            }
        })
        this.setState({
            avatarSource:arr
        })
    }

    gets(v,i){
        this.handleInputs('responseUnit',i,'unitId',v.jigou)
        this.handleInputs('responseUnit',i,'departmentId',v.bumen)
        this.handleInputs('responseUnit',i,'personId',v.ren)
    }

 
    ssgets(v){
        this.handleInput('checkUnit',v.jigou)
        this.handleInput('departments',v.bumen)
        this.handleInput('checkMan',v.ren)
    }

    // sgets(v){
    //     this.handleInputs('reviewUnit',v.jg)
    //     this.handleInputs('reviewDepartments',v.bm)
    //     this.ehandleInput('reviewMan',v.ry)
    // }
    
    getss(v){
        this.handleInput('area',v.id)
    }

    gist(v){
        this.handleInput('gist',v.id)
    }

    Mygets(v){
        this.handleInput('type',v.id)
    }  

    adds(){
        this.setState(({key})=>{
        let arrs = this.state.submitData.responseUnit;
        let kds = this.state.bt;
        kds.push(1);
        arrs.push({
            unitId:'',
            departmentId:'',
            personId:''
        });
        return arrs;
        })
    }

    dele(i){
        let arrs = this.state.submitData.responseUnit;
        let dete = this.state.bt;
        dete.splice(1,1);
        arrs[i].remove = true;
        this.forceUpdate();
    }



    render(){
        return (<View style={{backgroundColor:'white',flex:1}}>
                    <HeaderBar name='创建问题' parent={this} />
                    {(this.state.data.length!==0)?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                    <ActivityIndicator color="#363434" animating={this.state.stop?false:true}/>
                    <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>{this.state.stop?'您无权操作':'加载中...'}</Text>
                    </View>}
                    <ScrollView style={{backgroundColor:'white'}}>
                    <View style={styles.models}>
                    <View style={{width:'93%'}}>
                        <View style={{paddingTop:10,paddingBottom:10,borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <View style={{paddingBottom:5,flexDirection:'row',alignItems:'center',marginBottom:10,borderBottomColor:'#999',borderBottomWidth:.5}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5,flex:1}}>
                                责任单位/人*
                            </Text>
                            <TouchableOpacity onPress={()=>this.adds()}>
                                <Image source={require('../../images/addimg.png')} style={{width:15,height:15,marginRight:5}}/>
                            </TouchableOpacity>
                        </View>
                        {this.state.submitData.responseUnit.map((v,i)=>{
                        if(v.remove)return false
                        else return(<View key={i} style={{flexDirection:'row',backgroundColor:'#eee',marginBottom:5,alignItems:'center',borderRadius:5}}>
                                <Modals my={i} gets={this.gets.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.data}
                                    style={{justifyContent:'center',padding:10}}/>
                                {this.state.bt.length>=2?<TouchableOpacity onPress={()=>this.dele(i)}>
                                    <Image source={require('../../images/delete.png')} style={{width:15,height:15,marginRight:5}}/>
                                </TouchableOpacity>:null}
                                </View>)
                        })}
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>检查单位/人*</Text>
                        <Modals gets={this.ssgets.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.data}
                            style={{justifyContent:'center',paddingLeft:6}}/>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',borderStyle:'dashed'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>检查要点*</Text>
                        <KeModals gets={this.Mygets.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.type}
                            style={{justifyContent:'center',paddingLeft:6}} />
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>区域*</Text>
                        <KeModals gets={this.getss.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.progromsed}
                            style={{justifyContent:'center',paddingLeft:6}} />
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('PicCheck',{type:1,local:this.state.submitData.location})} style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>具体位置*&nbsp;&nbsp;{this.state.submitData.location.x!=null?'重新选择':"请选择"}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>问题描述*</Text>
                        <TextareaItem rows={6} onChange={(e)=>this.handleInput('question',e)} last={true}  placeholderTextColor="#666" style={{borderWidth:1,borderColor:'#666666',color:"#363434",fontSize:14,minWidth:'85%',maxWidth:'85%',borderRadius:5}} placeholder="请输入"/>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>依据*</Text>
                        <KeModals gets={this.gist.bind(this)} textStyle={{color:'#666',fontSize:13}} data={this.state.keds}
                            style={{justifyContent:'center',paddingLeft:6}} />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>检查起始时间*</Text>
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
                        placeholder={"请选择时间"}      
                        onDateChange={(e)=>{this.setState({Datess:e});this.handleInput('checkTime',e)}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>整改截止时间*</Text>
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
                        placeholder={"请选择时间"}
                        onDateChange={(e)=>{this.setState({Dates:e});this.handleInput('deadline',e)}}/>
                        </View>
                        </View>
                            <View style={styles.selectImage}>
                                        {this.state.avatarSource&&this.state.avatarSource.map((items,index)=>{
                                            return <View key={index} style={{flexDirection:'row'}}>
                                            <Image source={items} style={styles.image} />
                                            <TouchableOpacity onPress={()=>this.delectImg(index)} style={{right:10}}>
                                                    <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                            </TouchableOpacity>
                                            </View>
                                        })}
                                    <TouchableOpacity onPress={()=>this.choosePic()} style={{width:85,height:60,justifyContent:'center',alignItems:'center',borderColor:'#aaa',borderWidth:1,borderStyle:'dotted'}}>
                                            <Image source={require('../../images/addimg.png')} style={{width:20,height:20}}/>
                                            <Text style={{fontSize:8}}>请上传图片</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                        </ScrollView>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
                            <TouchableOpacity style={styles.searchs} activeOpacity={0.8} onPress={this.submit}>
                                <Text style={{color:"#FFF"}}>保存问题</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.searchs} activeOpacity={0.8} onPress={()=>this.submitup()}>
                                <Text style={{color:"#FFF"}}>上传问题</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
            }

    const styles = StyleSheet.create({
        models:{
            alignItems:'center',
        },
        searchs:{
            width:'49%',
            height:50,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#11A6FF',
        },
        selectImage:{
            flexDirection:'row',
            flexWrap:'wrap',
            width:'95%',
            padding:10,
            alignItems:'center',
            borderWidth:1,
            borderColor:"#345678",
            marginBottom:10,
            borderRadius:10
        },
        image:{
            height:60,
            width:85,
        }
    })

//   https://blog.csdn.net/z93701081/article/details/83587175
//   上传图片

