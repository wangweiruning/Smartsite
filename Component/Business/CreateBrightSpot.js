/**
 * 创建亮点
 * 
 */
import React from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,ScrollView,ToastAndroid} from 'react-native';

import HeaderBar from '../common/HeaderBar';
import {InputItem,TextareaItem,ActivityIndicator} from 'antd-mobile-rn';
import ImagePicker2  from 'react-native-image-picker';
import MySorage from '../../api/storage';
import {lightType,lightUpload,lightAdd,projectList,structList,locallist,structJigou} from '../../api/api'
import config from '../../api/serviceAPI.config'
import Selectone from '../common/Selectone'
import Modals from '../Model'
//图片选择器参数设置
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

export default class CreateBrightSpot extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        awaitNum:11,
        isShow:true,
        token:'',
        mechanismList:[],//单位列表
        departmentsList:[],//责任部门列表
        typeList:[],//亮点类型列表
        areaList:[],//亮点区域
        avatarSource: [],
        initlistTxt:'请选择区域',
        listtxt:'',
        index:null,
        vallistChange:false,
        type:'',
        remark:'',
        local:{x:null,y:null},
        region:'',
        checker:'',
        unit:'',
        departments:"",
        project:'5',//工程id
        mechanism:'',//机构（责任单位）
        mechanism_id:'',//机构id
        type_id:'',//类型id
        departments_id:"1",//部门id
        attachIds:[],//图片id
        region_id:'',
        cancreate:false,
        laoding:true
  }

}

 componentDidMount(){
    this.props.navigation.addListener(
        'willFocus', async(obj)=>{
         MySorage._load('light',(data)=>{
            this.setState({
                local:{x:data.X,y:data.Y}
            })
         })
    })
    let token = window.jconfig.userinfo.token;
    console.log(window.jconfig.userinfo,"tokkkkkkkkkkk")
    if(this.props.navigation.state.params!==undefined){

    this.setState({
         ...this.props.navigation.state.params.item
        })
    }
	
    this.setState({
        token,
        checker:window.jconfig.userinfo.user.realname
    })
    this.getdateList(token);
   
}


    getdateList= async(token)=>{

        let structdata =5;
        console.log(window.jconfig.userinfo,"hhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        let struct = await structJigou(this.state.http,structdata,token);//得到所有机构
    
        let mechanism =struct.data[1].id;
        let departments = await structList(this.state.http,mechanism,token);//得到所有部门

        let lighttypes = '';
        let lightTypeList = await lightType(this.state.http,lighttypes,token);//得到亮点类型

        let checkedlist = this.state.project;
        let checkList = await locallist(this.state.http,checkedlist,token);//得到亮点区域

        if(struct.isSuccess()&&departments.isSuccess()&&lightTypeList.isSuccess()&&checkList.isSuccess()){
        this.detlightType(lightTypeList);
        this.getdepartments(departments);
        this.getStructList(struct);
        this.getcheckList(checkList)
        this.setState({
            laoding: false,
            cancreate: true
        })

        }else if(struct.isCanUse()||departments.isCanUse()||lightTypeList.isCanUse()||checkList.isCanUse()){
            this.setState({
                cancreate:false,
                laoding:false
            })
            ToastAndroid.show('没有权限创建亮点',ToastAndroid.SHORT)
        }
       
    }
    /***得到亮点的所有机构 */
    getStructList(struct){
        console.log("struct---->",struct);
        if(struct.data!=null) this.state.mechanismList=struct.data;
        this.forceUpdate();
    }

    /***得到部门 */
    getdepartments(departments){
        this.state.departmentsList=departments.data;
    
        this.forceUpdate();
    }

    /***得到亮点的类型并绑定数据 */
    detlightType(lightTypeList){
        this.state.typeList=lightTypeList.data;
        this.forceUpdate();
    }

    /***得到区域 */
    getcheckList(departments){
        this.state.areaList=departments.data||[];

        this.forceUpdate();
    }
    handleInput=(key,value)=>{
        this.setState({
            [key]:value
        })
    }
    CurentTime(){ 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
       
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) 
        clock += '0'; 
        clock += mm + ":";
        if (ss < 10) clock += '0';
        clock += ss; 
        return(clock); 
    } 

    submitup=async()=>{
        let arrs = [];
        let imgArr = [];
        const {type,remark,region_id,local,departments,checker,unit,project,avatarSource} = this.state;
            avatarSource.map(item=>{
                imgArr.push(item.imgid)
            })
        if(!type|| !remark|| !region_id||!local||!checker||!unit){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
        }else{
           
            let allData = {
                    remark,
                    region:region_id,
                    local:JSON.stringify(local),
                    responseDepartments:departments,
                    type:type,
                    responsePerson:checker,
                    responseUnit:unit,
                    project,
                    attachIds:imgArr.join(',')
                };
console.log(allData)
            if(this.props.navigation.state.params!==undefined){
                let indexid = this.props.navigation.state.params.indexid;//得到传过来的indexid
                MySorage._load("brightspot",(data)=>{
                    let res=JSON.parse(data);
                    if (res) {
                    arrs=res;
                    }
                    arrs.splice(indexid,1);
                    MySorage._sava("brightspot", JSON.stringify(arrs));
                    this.resultsub(allData);
                })
                }else{
                this.resultsub(allData);
                }
            
        }
    }

    submit = () => {
        let arrs = [];
        const { type,
                remark,
                local, 
                region,
                region_id,
                checker,
                unit,
                departments,
                project,
                mechanism,
                mechanism_id,
                type_id,
                departments_id,
                avatarSource} = this.state;
        let   clock = this.CurentTime();//得到时间
        if(!type|| !remark|| !region_id||!local||!mechanism||!checker||!unit){
            ToastAndroid.show('请将数据填写完整',ToastAndroid.SHORT)
        }else{
            MySorage._load("brightspot",(data)=>{//如果没有网路，直接保存到本地
           
                let res=JSON.parse(data);
                if (res) {
                arrs=res;
                }
                let  brightspot = { type,
                                    remark,
                                    local, 
                                    region,
                                    region_id,
                                    checker,
                                    unit,
                                    departments,
                                    project,
                                    mechanism,
                                    mechanism_id,
                                    type_id,
                                    departments_id,
                                    avatarSource,clock
                                };
                if(this.props.navigation.state.params!==undefined){
                    let indexid = this.props.navigation.state.params.indexid;//得到传过来的indexid
                    arrs.map((item,index)=>{
                        if(indexid==index){
                          arrs[index] = brightspot;
                        }
                    })
                }else{
                     arrs.push(brightspot)
                }
                MySorage._sava("brightspot", JSON.stringify(arrs));
                this.props.navigation.navigate('BrightSpot');
                ToastAndroid.show('亮点保存成功!',ToastAndroid.SHORT)
            })
        }
    }
    
    //创建亮点
    resultsub = async(allData)=>{
        let result = await lightAdd(this.state.http,allData,this.state.token);
        console.log(result,'创建成功返回')
        if(result&&result.code==='S10000'){
            this.props.navigation.navigate('BrightSpot');
            ToastAndroid.show(result.message,ToastAndroid.SHORT)
        }else{
            ToastAndroid.show(result.message,ToastAndroid.SHORT)
        }
    }

    //选择照片按钮点击
    choosePic() {
      ImagePicker2.showImagePicker(options,async (response) => {
        if (response.didCancel) {
            console.log('用户取消了选择！');
        }
        else if (response.error) {
            alert("ImagePicker发生错误：" + response.error);
        }
        else if (response.customButton) {
            alert("自定义按钮点击：" + response.customButton);
        }
        else {
            let source = {uri: response.uri, type:response.type, name:response.fileName};
            
            //上传图片
            let fromdate = new FormData();
                fromdate.append('file',source);
            
            //获取图片的id
            let unload  = await lightUpload(this.state.http,fromdate,this.state.token);
            console.log(unload,"图片上传返回值")
            if(unload.code == 'S10005'){
                ToastAndroid.show(unload.message,ToastAndroid.SHORT)
                return this.props.navigation.navigate('login');
            }
            let newsource = {uri: response.uri, type:response.type, name:response.fileName,imgid:unload.data[0].generatedMaps[0].id};
            let oldsource = this.state.avatarSource;

                oldsource.push(newsource)
            this.setState({
                avatarSource: oldsource
            });
            }
        });
    }

    //删除图片
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

    //弹框选择
    async changList(item,index,key){
        if(key=='mechanism'){
            let mechanism =`mechanism=${item.id}`;
            let departments = await structList(this.state.http,mechanism,this.state.token);//重新得到所有部门
            this.getdepartments(departments);
            this.setState({
                departments:'',
                departments_id:''
            })
        }
        this.setState({
            [key]:item.name||item.type,
            vallistChange:true,
            [key+'_id']:item.id
        })		
    }

    //判断弹出层显示
    region(res){
        this.refs[res].show() 
    }
    
    //接收返回过来的数据
    Mygets(v,keys){
        if(keys == 'unit'){//亮点类型
            this.handleInput(keys,v.name)
        }else if( keys =='region'){//亮点区域
            this.handleInput(keys,v.local)
            this.handleInput('region_id',v.id)
        }else{
            this.handleInput(keys,v.id)
        }
    }
    getmechanismList(v){//获取单位部门
        this.handleInput('mechanism',v.jg);
        this.handleInput('departments',v.bm);
        this.handleInput('mechanism_id',v.danweiname);
        this.handleInput('departments_id',v.bumenname);
    } 
    ssgets(v){
        this.handleInput('unit',v.jigou)
        this.handleInput('mechanism',v.jigou)
        this.handleInput('departments',v.bumen)
        this.handleInput('checker',v.ren)
    }
  render() {
    let {cancreate,laoding} = this.state;
      return (<View style={{backgroundColor:'#FFF',flex:1}}>
                    <HeaderBar  name='创建亮点' parent={this} />
                    {laoding&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                    <ActivityIndicator color="#363434"/>
                    <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                    </View>}
                    {cancreate&&<ScrollView style={{width:"100%"}}>
                        <View style={styles.models}>
                        <View style={{width:'92%',flexDirection:'row',paddingTop:15,paddingBottom:15,
                                alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                            <Text style={{color:'black',fontSize:16,}}>检查单位/人*</Text>
                            <View style={{width:'100%'}}>
                                <Modals gets={this.ssgets.bind(this)} 
                                            textStyle={{color:'#666',fontSize:13,width:'70%'}} 
                                            data={this.state.mechanismList}
                                            style={{justifyContent:'center',paddingLeft:6,height:'100%'}}/>
                            </View>
                            </View>

                            <View style={{width:'92%',flexDirection:'row',paddingTop:15,paddingBottom:15,
                                alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                            <Text style={{color:'black',fontSize:16,}}>亮点类型*</Text>
                            <Selectone  gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.typeList}
                                        keysitem='type'//用于区分要展示的列表元素
                                        itemkeys={'type'}//用于存储的key值
                                        defaultNumber={this.state.type}//默认的值
                                        style={{justifyContent:'center',paddingLeft:6}} />
                            </View>

                            <View style={{width:'92%',flexDirection:'row',paddingTop:15,paddingBottom:15,
                                alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                            <Text style={{color:'black',fontSize:16,}}>亮点区域*</Text>
                            <Selectone gets={this.Mygets.bind(this)} 
                                        textStyle={{color:'#666',fontSize:13}} 
                                        data={this.state.areaList}
                                        keysitem='local'//用于区分要展示的列表元素
                                        itemkeys={'region'}//用于存储的key值
                                        defaultNumber={this.state.region}
                                        style={{justifyContent:'center',paddingLeft:6}} />
                            </View>
                            
                            <View style={{width:'92%',flexDirection:'row',paddingTop:5,paddingBottom:5,
                                alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                            <Text style={{color:'black',fontSize:16,}}>具体位置*</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('PicCheck',{type:2,local:this.state.local})} 
                            style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center'}}>
                            <Text style={{color:'#666',fontSize:13,marginRight:5}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;{this.state.local.x != null?'重新选择':'请选择'}
                            </Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{width:'92%',flexDirection:'row',paddingTop:5,paddingBottom:5,
                                alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                            <Text style={{color:'black',fontSize:16,}}>亮点描述*</Text>
                            <TextareaItem
                                    rows={6}
                                    placeholder="请填写详细描述"
                                    defaultValue={this.state.remark}
                                    onChange={(v)=>this.handleInput('remark',v)} 
                                    style={{fontSize:13,padding:10,minWidth:'88%',maxWidth:'88%',borderWidth:2,borderColor:'#345678',borderStyle:'solid',borderRadius:5}}
                                    placeholderTextColor={'#666'}
                                    textStyle={{fontSize:13}}
                            />
                            </View>
                            
                            <View style={styles.selectImage}>
                                    {/* 图片列表 */}
                                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',width:"95%"}}>
                                            {this.state.avatarSource&&this.state.avatarSource.map((items,index)=>{
                                                return<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}} key={index}>
                                                    <Image source={{uri:items.uri}} style={styles.image}/>
                                                    <TouchableOpacity onPress={()=>this.delectImg(index)} style={{width:15,height:15,right:10}}>
                                                        <Image source={require('../../images/no.png')} style={{width:15,height:15}}/>
                                                    </TouchableOpacity>
                                                </View> 
                                            })}
                                            <TouchableOpacity  onPress={this.choosePic.bind(this)} style={styles.upload}>
                                                <Image source={require('../../images/addimg.png')} style={{width:30,height:30}}/>
                                                <Text style={{fontSize:8}}>请上传图片</Text>
                                            </TouchableOpacity>
                                        </View>
                                    {/* 图片列表 */}
                            </View>
                        </View>
                    </ScrollView>}
                    {cancreate&&<View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity 
                            style={styles.searchs}
                            activeOpacity={0.8}
                            onPress={()=>this.submit()}>
                            <Text style={{color:"#FFF"}}>保存</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.searchs}
                            activeOpacity={0.8}
                            onPress={()=>this.submitup()}>
                            <Text style={{color:"#FFF"}}>上传</Text>
                        </TouchableOpacity>
                    </View>}
        </View> );
    }
  }

  const styles = StyleSheet.create({
    content:{
      width:'100%',
      marginTop:50
    },
    bottom:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        paddingBottom:10
    },
    leftText:{
        width:35,
        height:35,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F7A12C',
    },
    rightContent:{
        left:5,
        width:"88%",
        justifyContent:'center',
        flexDirection:'column'
    },
    itemImg:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        paddingTop:10
    },
    anzhaung:{
        width:"90%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0C6BAF',
        borderRadius:10
    },
    gotuditu:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0C6BAF',
        borderRadius:50,
        position:'absolute',
        right:20,
        bottom:100
    }
    ,
    //model styles
    models:{
        width:"100%",
        backgroundColor:"#ffffff",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    modelsTitle:{
        width:"100%",
        height:50,
        justifyContent:'center',
        backgroundColor:'#1884CD',
        alignItems:'center',
        padding:5,
        borderBottomColor:"#eee",
        borderBottomWidth:2,
        borderStyle:'solid'
    },
    modelsCreate:{
        color:"#fff",
        fontSize:18,
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
    inputValve:{
        width:'100%',
        justifyContent:'space-between'
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
        width:'49%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#11A6FF',
    },
    selectImage:{
        width:'90%',
        padding:15,
        justifyContent:'flex-start',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#345678",
        alignItems:'center',
        flexDirection:'column',
        marginBottom:10,
        borderRadius:10
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


//   https://blog.csdn.net/z93701081/article/details/83587175
//   上传图片