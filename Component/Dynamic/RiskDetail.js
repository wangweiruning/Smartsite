import React from 'react';
import {Text,View,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {tpdetails} from '../../api/api'
import {ActivityIndicator} from 'antd-mobile-rn';

export default class RiskDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.navigation.state.params.item,
        }
    }

    render(){
        let {data} = this.state;
        return(<View style={{flex:1,backgroundColor:"white"}}>
            <HeaderBar name='风险详情' parent={this} />
            {/* {this.state.id?null:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
              <ActivityIndicator color="#363434"/>
              <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
            </View>} */}
            <ScrollView>
            <View style={{alignItems:'center'}}>
                <View style={{width:'93%'}}>
                    <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>计划开始时间：{data.planStartDate}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>计划结束时间：{data.planEndDate}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>风险点：{data.riskPointId}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>风险等级：{data.riskLevel&&data.riskLevel.typename}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>作业票名称：{data.riskName}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>工程阶段：{data.projectStage}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',minHeight:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>工序：{data.process}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>作业施工部位：{data.workPart}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',paddingTop:10,paddingBottom:10}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>作业施工内容：</Text>
                        <Text style={{color:'black',fontSize:16,marginRight:5,flex:1}}>{data.workContent}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>主要风险：{data.anticipateDanger}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',minHeight:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>重点控制措施：{data.precontrolMethod}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>工作负责人：{data.controllecrUser}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999',height:45}}>
                        <Text style={{color:'black',fontSize:16,marginRight:5}}>现场监理人：{data.supervisionUser}</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        </View>)
    }
}