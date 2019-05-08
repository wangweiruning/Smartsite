import React from 'react';
import NavigationBar from './common/NavigationBar';
import {View,Text,TouchableOpacity,Alert,StyleSheet,Image,ToastAndroid,ScrollView,FlatList} from 'react-native';
import MySorage from '../api/storage';
import {StackActions, NavigationActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import * as CacheManager from 'react-native-http-cache';
import TouchBotton from './common/TouchBotton';
import ImagePicker from 'react-native-image-picker';
import {LocalStorage} from '../api/local_storage';

let chooseImgOptions = {
  title: '请选择图片来源',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册图片',
  quality: 1,
  maxWidth: 100,
  maxHeight: 200,
  allowsEditing: true,
  noData: false,
  storageOptions: {
      skipBackup: true,
      path: 'images',
  },};

let abb='',name='',remark='';
export default class MimeExample extends React.Component {
  constructor(props){
    super(props);
    this.state={
      device:{},
      baseImg:'',
      userName:"",
      userPhone:"",
      datas:[]
    }
  }

componentDidMount(){

  this.getCacheSize();
  let device = {};
  device.AppVersion = DeviceInfo.getVersion();//APP版本
  device.AppReadableVersion = DeviceInfo.getReadableVersion();
  this.getUserInfo();
  this.setState({
    device:device
  })
}

async getUserInfo () {
  let {user} = window.jconfig.userinfo;
  let projects = await LocalStorage.get('user:project');
  console.log(projects,111111111111)
    name=projects!=""?projects.ownername:'暂无数据';
    remark=projects!=""?projects.constrname:'暂无数据';
    abb=projects!=""?projects.abb:'暂无数据';
  if(user){
    this.setState({
      userName:user.realname,
      userPhone:user.phonenum,
      datas:[
        {leftName:abb,leftIcon:require('../images/project.png'),lat:true},
        {leftName:name,leftIcon:require('../images/gongsi.png'),lat:true},
        // {leftName:remark,leftIcon:require('../images/bumeng.png'),lat:true},
        {rightRouteTo:"Password",leftName:"密码设置",leftIcon:require('../images/password.png')},
       
        {rightRouteTo:"NetWork",leftName:"服务器地址",leftIcon:require('../images/server.png')},
        {rightRouteTo:"GetMoney",leftName:"积分激励",leftIcon:require('../images/money.png')},
        {rightRouteTo:"Aboutus",leftName:"关于我们",leftIcon:require('../images/aboutus.png')},
      ]
    })
  }
  
  }
// 获得缓存大小
  async getCacheSize() {
    const data = await CacheManager.getCacheSize();
    const size = data / (1024 * 1024);
    this.setState({ cacheSize: size.toFixed(2) + 'M'});
  }

  out(){
    Alert.alert(
      '提示','确定退出吗？',
      [{text:'否',onPress:this.opntion2Selected},
       {text:'是',onPress:()=>this.reset()}
      ],{cancelable:false}
  );
  }
/***
 * 清除缓存用户信息
 * * */

  async reset() {
    MySorage._remove('userinfo');
    await LocalStorage.remove('user:token');
    await LocalStorage.remove('user:project');
    window.jconfig.token = null;
    window.jconfig.project = null;
    this.props.navigation.navigate('LoginPage')
  }
//头像上传
uploadImage = async() => {
  await ImagePicker.showImagePicker(chooseImgOptions, (val) => {

    if (val.didCancel) {
      ToastAndroid.show('取消上传头像', ToastAndroid.SHORT);
    }
    else if (val.error) {
      ToastAndroid.show('不支持拍照，请选择相册', ToastAndroid.SHORT);
    }
    else {
      console.log(val)
      let type = val.type;
      if(!(type && type.startsWith("image/"))){
          return ToastAndroid.show('请选择图片文件上传', ToastAndroid.SHORT);
      }

      let size = val.fileSize / 1024;
      if(size > (1024 * 2)){
        return ToastAndroid.show('上传的图片大小不能超过2M', ToastAndroid.SHORT);
      }

      this.setState({baseImg:{uri:val.uri}});

      //上传图片
      let fromdate = new FormData();
      let file = {uri: val.uri, type:val.type, name:val.fileName};
      console.log(file)
      fromdate.append('uploadfiles', file);
      fromdate.append('name', 'useravatar');
      console.log(fromdate)
      // let res = await AxiosFn('uploadImage',fromdate);
      // if(!(res && res.code == 0)) {
      //     ToastShort('上传失败!');
      //     return;
      // }
      // ToastShort('上传成功!');
      // let filename = res.data.filename;
      // this.setState({avatar:filename})
    }
  });
};

unloadAvator=()=>{
  this.uploadImage();
  // this.props.navigation.navigate('UserSetting');
}
  render() {
    const data = this.state.datas;
    const {navigate} = this.props.navigation;
    return (<View style={{flex:1,width:"100%",height:"100%",justifyContent:'center',alignItems:'center'}}>
      <NavigationBar navigation={this.props.navigation} centertext={'个人信息'}/>
        <ScrollView style={{width:"100%"}}>
          <View style={{justifyContent:'center',alignItems:'center',}}>
              <View style={styles.usermsg}>
                  <TouchableOpacity onPress={()=>this.unloadAvator()} style={styles.userImg}>
                    <Image source={this.state.baseImg?this.state.baseImg:require('../images/userimg.png')} style={styles.userImg}/>
                  </TouchableOpacity>
                  <Text style={{color:"#ffffff",paddingVertical:5,marginTop:10}}>{this.state.userName?this.state.userName:'暂无用户'}</Text>
                  <Text style={{color:"#ffffff",paddingVertical:5}}>{this.state.userPhone?this.state.userPhone:'暂无电话'}</Text>
              </View>
              <View style={{backgroundColor:'white',width:'100%'}}>
                  <FlatList data = {data} keyExtractor={(v,idx)=>idx.toString()} 
                  renderItem={({item,index})=>
                  <TouchBotton showRight={false} paddingnum={12} lat={item.lat} last={{da:data.length,ks:index}} navigation={this.props.navigation} key={index} rightRouteTo={item.rightRouteTo} leftName={item.leftName}  leftIcon={item.leftIcon} />
                  }/>
              </View>
              <TouchableOpacity onPress={()=>this.out()} style={styles.logout}>
                <Text style={{color:"#FFF"}}>退出</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        {/* <View>
          <Text>版本号v.{this.state.device.AppVersion}</Text>
        </View> */}
      </View>);
  }
}
const styles = StyleSheet.create({
    usermsg:{
      width:'100%',
      height:120,
      backgroundColor:'#11A6FF',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    },
    userImg:{
      width:50,
      height:50,
      borderRadius:50
    },
    logout:{
      marginTop:20,
      justifyContent:'center',
      alignItems:'center',
      width:'80%',
      backgroundColor:'#00a6e7',
      borderRadius:5,
      height:40
    }
})