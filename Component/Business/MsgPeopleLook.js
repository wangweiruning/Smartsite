/**
 * 人员信息详情
 * 
 */
import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn';
import {Text,View,ScrollView,Image} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import Lightbox from 'react-native-lightbox';
import config from '../../api/serviceAPI.config'


export default class MsgPeopleLook extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            data:{},
            id:'',
            opens:false
        }
    }

     componentWillMount(){
       let {item} = this.props.navigation.state.params;
        console.log(item,"ffffffffff")
        this.setState({
          id:item.userid,
          data:item
      })
    }

    render(){
        let {data} = this.state;
        let {avatar,edu,mechanism,departments,job} = data;
        console.log(data)
        return(<View style={{flex:1,backgroundColor:'white'}}>
           <HeaderBar name='人员详情' parent={this} />
           {this.state.id?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
            </View>}
           <ScrollView>
                  <View style={{alignItems:'center'}}>
                       <View style={{width:'93%'}}>
                        <View style={{flexDirection:'row',justifyContent:"space-between",paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>姓名：{data.realname}</Text>
                        <Image source={{uri:this.state.http+(avatar!=null?avatar.path:'')}} style={{width:50,height:64}}/>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>身份证：{data.card}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>学历：{edu.name}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>手机号：{data.phonenum}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>性别：{data.sex==1?'男':'女'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>单位：{mechanism.name}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>部门：{departments.name}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>职位：{job.jobname}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>用工属性：{data.worktype}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>参加工作时间：{data.worktime}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>备注：{data.remark}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'red',fontSize:16,marginRight:5}}>状态：{data.userType==1?'启用':'禁用'}</Text>
                        </View>
                      </View>
                  </View>
            </ScrollView>
        </View>)
    }
}