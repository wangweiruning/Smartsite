/**
 * 问题详情
 * 
 */
import React from 'react';
import {ActivityIndicator} from 'antd-mobile-rn';
import {Text,View,ScrollView,Image} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import Lightbox from 'react-native-lightbox';
import config from './../../api/serviceAPI.config'
export default class MsgDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            data:{},
            id:'',
            opens:false
        }
    }

     componentDidMount(){
       let paramsdata = this.props.navigation.state.params;
        console.log(paramsdata,"ffffffffff")
        this.setState({
          id:paramsdata.id,
          data:paramsdata
      })
    }

    render(){
        let {data} = this.state;
        return(<View style={{flex:1,backgroundColor:'white'}}>
           <HeaderBar name='问题详情' parent={this} />
           {this.state.id?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
            </View>}
           <ScrollView>
                  <View style={{alignItems:'center'}}>
                       <View style={{width:'93%'}}>
                        <View style={{paddingTop:15,paddingBottom:15,alignItems:'center'}}>
                          {data.responseUnitInfos&&data.responseUnitInfos.map((v,i)=>
                          <View key={i} style={{borderBottomColor:'#999',borderBottomWidth:.5,paddingTop:5,paddingBottom:5}}>
                          <Text  style={{color:'black',fontSize:16,marginRight:5}}>
                          责任单位/人：{v.unit&&v.unit.name} / 
                          {v.department&&v.department.name} / 
                          {v.person&&v.person.realname}
                          </Text>
                         </View>)}
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                          <Text style={{color:'black',fontSize:16,marginRight:5}}>检查单位/人：{data.checkUnit&&data.checkUnit.name} / {data.departments&&data.departments.name} / {data.checkMan&&data.checkMan.realname}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                          <Text style={{color:'black',fontSize:16,marginRight:5}}>类型：{data.type!=null&&data.type.inspectbody}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                          <Text style={{color:'black',fontSize:16,marginRight:5}}>区域：{data.area&&data.area.local}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>问题描述：{data.question}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>依据：{data.gist!=null&&data.gist.name}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>检查起始时间：{data.checkTime}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>整改截至时间：{data.deadline}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>问题图片</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
                        {
                          data.attachs && data.attachs.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
                          <Image source={{uri:this.state.http+v.path}} style={{width:this.state.opens?'100%':90,height:this.state.opens?200:60,marginRight:10}} />
                          </Lightbox>)
                        }
                        </View>
                        <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                          <Text style={{color:'black',fontSize:16,marginRight:5}}>复查单位/人：{data.reviewUnit&&data.reviewUnit.name} / {data.reviewDepartments&&data.reviewDepartments.name} / {data.reviewMan&&data.reviewMan.realname}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>整改内容：{data.rectifyContent}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>实际整改时间：{data.actulRectifyTime}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>整改图片</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
                        {
                          data.attachs && data.attachs.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
                          <Image source={{uri:this.state.http+v.path}} style={{width:this.state.opens?'100%':90,height:this.state.opens?200:60,marginRight:10}} />
                          </Lightbox>)
                        }
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>复查内容：{data.reviewContent}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>复查时间：{data.actulReviewTime}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:45}}>
                            <Text style={{color:'black',fontSize:16,marginRight:5}}>复查图片</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
                        {
                          data.attachs && data.attachs.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
                          <Image source={{uri:this.state.http+v.path}} style={{width:this.state.opens?'100%':90,height:this.state.opens?200:60,marginRight:10}} />
                          </Lightbox>)
                        }
                        </View>
                      </View>
                  </View>
            </ScrollView>
        </View>)
    }
}