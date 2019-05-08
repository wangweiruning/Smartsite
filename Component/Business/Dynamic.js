/***
 * 甲供物资动态列表
 * ** */
import React from 'react';
import {Text,View,Image,TouchableOpacity,ToastAndroid,ScrollView} from 'react-native';
import HeaderBar from '../common/HeaderBar';
import {Pagination,ActivityIndicator} from 'antd-mobile-rn';
import {tpmaterialList} from '../../api/api'
import config from '../../api/serviceAPI.config'
const locale = {
  prevText: '上一页',
  nextText: '下一页',
};


export default class Dynamic extends React.Component {

  constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        datas:[],
        loading:true,
        pagesnow:1,
        pagenow:1,
    }
  }

  componentDidMount(){
    this.getData(1);
  }

  getData = async (page=1)=>{
    let {http} = this.state;
    let subpage =  `projectid=5&currentPage=${page}&pageSize=10`
    let datas = await tpmaterialList(http,subpage);
    console.log(datas,"ggggggggggggg")
    if(datas.isCanUse()){
      this.setState({
        loading:false
      })
      ToastAndroid.show(datas.message,ToastAndroid.SHORT)
    }
    if(datas.isSuccess()){
       this.setState({
        datas:datas.data.data,
        pagesnow:datas.data.totalPage,
        pagenow:datas.data.currentPage,
        loading:false
    })
    }
   
  }

  Dotwc(v){
    return(<View>
          {v.map((vd,i)=>{
            return<TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('CreateMaterial',{datas:vd})} 
                    key={i} style={{marginLeft:'2%',width:'96%',backgroundColor:"white",borderRadius:5,marginBottom:10,padding:5}}>
                        <Text style={{color:'#0390e8',fontSize:16,
                            borderBottomColor:'#eee',borderBottomWidth:.5}}>物资名称：{vd.materialName}</Text>
                        <Text style={{color:'grey'}}>合同编号：{vd.materialContractNo}</Text>
                        <Text style={{color:'grey'}}>所属工程：{vd.projectid!=null&&vd.projectid.name}</Text>
                        <Text style={{color:'grey'}}>物资类型：{vd.materialType!=null&&vd.materialType.name}</Text>
                        <Text style={{color:'grey'}}>物料描述：{vd.materialRemark}</Text>
                        <Text style={{color:'grey'}}>物料净重/件数：{vd.materialNumber+vd.materialUnit}</Text>
                        <Text style={{color:'grey'}}>创建时间：{vd.createTime}</Text>
                        
                    </TouchableOpacity>
                    })
                  }
    </View>)
}

  render() {
      let {datas} = this.state;
      return (<View style={{alignItems:'center',flex:1}}>
                <HeaderBar  parent={this} name="甲供物资动态"/>
                {this.state.loading&&<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                        <ActivityIndicator color="#363434"/>
                        <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                        </View>}
                <ScrollView style={{width:'100%',height:'100%'}}>
                <View style={{flex:1,alignContent:'center',marginTop:10}}>
                        {datas.length>0&&this.Dotwc(datas)}
                        </View>
                </ScrollView>
                {datas.length>0&& <Pagination total={this.state.pagesnow} 
                        current={this.state.pagenow} 
                        locale={locale} 
                        onChange={(e)=>this.getData(e)}/>}
                
        </View> );
    }
  }