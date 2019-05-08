/**
 * 亮点详情
 * 
 */
import React from 'react';
import {Text,View,ScrollView,Image} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import Lightbox from 'react-native-lightbox';
import config from '../../api/serviceAPI.config'
export default class MsgBrightSpot extends React.Component{
    constructor(props){
        super(props)
        this.state={
					  http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
            data:'',
            opens:false
        }
    }

    componentDidMount(){
        let data = this.props.navigation.state.params;
				console.log(data,"ggggggggggggggg")
        this.setState({
          data:data
        })
    }

    render(){
        let {data} = this.state;
				console.log(data,"ffffffffffff")
        return(
				<View style={{flex:1,backgroundColor:'white'}}>
           <HeaderBar name='亮点详情' parent={this} />
           <ScrollView>
							{data!=""&&<View style={{alignItems:'center'}}>
                       <View style={{width:'93%'}}>
													 <View style={{flexDirection:'row',paddingTop:15,
														 paddingBottom:15,alignItems:'center',borderBottomWidth:.5,
														 borderBottomColor:'#999'}}>
														 <Text style={{color:'black',fontSize:16,marginRight:5}}>
														 亮点描述*{data.remark} </Text>
													 </View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															检查单位* {data.mechanism!=null&&data.mechanism.name}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															检查部门* {data.departments!=null&&data.departments.name}</Text>
																</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															创建人* {data.checker!=null&&data.checker.realname}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															亮点类型* {data.type.type}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															亮点区域* {data.region!=null&&data.region.local}</Text>
														</View>
														<View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
														<Text style={{color:'black',fontSize:16,marginRight:5}}>
														创建时间* {data.create_time}</Text>
														</View>
													<View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
													{
													  data.attachs.length>0 && data.attachs.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
													  <Image source={{uri:this.state.http+v.path}} style={{width:this.state.opens?'100%':90,height:this.state.opens?200:60,marginRight:10}} />
													  </Lightbox>)
													}
													</View>
                     </View>
               </View>}
            </ScrollView>
        </View>)
    }
}