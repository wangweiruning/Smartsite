import React from 'react';
import {View,Text,TouchableOpacity,FlatList,Modal} from 'react-native';
import {Checkbox} from 'antd-mobile-rn';
import {structList,ByDePerson} from '../../api/api';
import config from '../../api/serviceAPI.config'
export default class SelectMore extends React.Component{
constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL, 
        show:false,
        data:this.props.data,
        active:null,
        myBm:[],
        ryData:[],
        name:'',
        names:'',
        nams:'',
        active2:null,
        active3:null,
        corui:false,
        isfirst:true,
    }
}

componentWillReceiveProps(nextProps){
    console.log(nextProps,"ggggggggggggg")
    this.state.show=nextProps.show;
    this.state.data=nextProps.data
    let datas = nextProps.data;
    let defalutDanwei=nextProps.defaultDanwei;//存在默认单位
    let defalutBumen=nextProps.defaultBumen;//默认部门
console.log(defalutDanwei,defalutBumen);
    if(defalutDanwei!="" && defalutBumen!=""&&this.state.isfirst){
        datas.map((item,keys)=>{
            if(item.id==defalutDanwei){
                this.setState({
                    active:item.id,
                    isfirst:false
                })
                this.choose(item,defalutBumen);
            }
        })
    }

}


open(){
    let active = this.state.active;
    let active2 = this.state.active2;
    let active3 = this.state.active3;
    let datas = this.state.data;
    let name = null;
    let id = null;
    for(let i=0;i<datas.length;i++){
        let data = datas[i];
        name = data.name,
        id = data.id
        if(active == null&&active2 == null&&active3==null){
            return '请选择'
        }
        else if(active == id){
            return name+' '+this.state.names+' '+this.state.nams
        }
    };
}

gazi(){
    console.log(this.state,"fffffffffffffffff")
    let {active,active2,active3,name,names,} = this.state;
    let ds={jg:active,bm:active2,ry:'asdaf',danweiname:name,bumenname:names};
    this.props.gets(ds)
}

opens(){
    this.setState({show:true})
}

returns(){
    this.setState({show:false})
}

cancels(){
    this.setState({show:false,active:null,active2:null,active3:null})
}

async choose(item,DanweiID=''){
    let bm = await structList(this.state.http,item.id);
    let datas = bm.data;
        if(DanweiID!=''){
            datas.map((itemss,ins)=>{
                if(itemss.id==DanweiID){
                    this.choose2(itemss)
                }
            })
        }
      this.setState({
          myBm:bm.data,
          active:item.id,
          active2:null,
          active3:null,
          name:item.name,
          names:'',
          nams:'',
          ryData:[]
    })
}

async choose2(item){
    let ry = await ByDePerson(this.state.http,item.id);
      this.setState({
        // ryData:ry.data,
        names:item.name,
        active2:item.id,
        // nams:'',
        // active3:null
    })
}

async choose3(item){
    console.log(item)
    this.state.nams = item.realname;
    this.state.active3 = item.userid;
    this.forceUpdate();
}


render(){

    const {data,show,myBm,ryData,corui} = this.state;

    return(
        <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={.8} style={{...this.props.style}} onPress={()=>this.opens()}>
                <Text style={{...this.props.textStyle}}>
                    {this.open()}
                </Text>
            </TouchableOpacity>
            {show&&<Modal hardwareAccelerated={true} animationType='slide' onRequestClose={()=>{this.returns();this.gazi()}} transparent={true}>
                <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
                    <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>this.returns()}></TouchableOpacity>
                    <View style={{backgroundColor:'white',width:'100%',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
                        <View style={{height:40,alignItems:"center",flexDirection:'row',padding:7,justifyContent:"space-between",backgroundColor:"#0390e8",borderTopStartRadius:5,borderTopEndRadius:5}}>
                          <TouchableOpacity onPress={()=>{this.cancels();this.props.gets([])}}><Text style={{color:'white',fontSize:16}}>取消</Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>{this.returns();this.gazi()}}><Text style={{color:'white',fontSize:16}}>确定</Text></TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',flex:1,borderRightWidth:1,borderStyle:'solid',borderRightColor:'#000'}}>
                        {data.length>0&&<FlatList style={{marginTop:8,width:'45%'}} data = {data} keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({item,index}) =>
                                                        <View key={index} style={{marginBottom:8,marginLeft:10,flexDirection:'row',width:'96%',borderRadius:5}}>
                                                            <Checkbox checked={this.state.active == item.id} onChange={(e)=>this.choose(item,corui)}>
                                                                <Text style={{width:'80%',left:5,color:'black',fontSize:15,borderBottomColor:'#ccc',borderBottomWidth:data.length==index+1?0:1,paddingTop:8,paddingBottom:8}}>{item.name}</Text>
                                                            </Checkbox>
                                                        </View>}
                                                />}
                        <View style={{width:1,height:'90%',backgroundColor:'#999',margin:10}}></View>
                        <FlatList style={{marginTop:8,width:'45%'}} data = {myBm} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginBottom:8,flexDirection:'row',width:'96%',borderRadius:5}}>
                                    <Checkbox checked={this.state.active2 == item.id} onChange={(e)=>this.choose2(item)}>
                                        <Text style={{width:'100%',left:5,color:'black',fontSize:15,borderBottomColor:'#ccc',borderBottomWidth:myBm.length==index+1?0:1,paddingTop:8,paddingBottom:8}}>{item.name}</Text>
                                    </Checkbox>
                                </View>}
                        />

                        {/* <View style={{width:1,height:'90%',backgroundColor:'#999',margin:10}}></View>
                        <FlatList style={{marginTop:8,width:'32%'}} data = {ryData} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginBottom:8,marginLeft:10,flexDirection:'row',width:'96%',borderRadius:5}}>
                                    <Checkbox checked={this.state.active3 == item.userid} onChange={(e)=>this.choose3(item)}>
                                        <Text style={{width:'100%',left:5,color:'black',fontSize:15,borderBottomColor:'#ccc',borderBottomWidth:1,paddingTop:8,paddingBottom:8}}>{item.realname}</Text>
                                    </Checkbox>
                                </View>}
                        /> */}
                        </View>
                    </View>
                </View>
            </Modal>}
        </View>
    )
}
}