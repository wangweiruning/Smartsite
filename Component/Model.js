import React from 'react';
import {View,Text,TouchableOpacity,FlatList,Modal} from 'react-native';
import {Checkbox} from 'antd-mobile-rn';
import HttpUtils from '../api/Httpdata3';
import {structList,ByDePerson} from '../api/api'
import config from '../api/serviceAPI.config'
export default class Modals extends React.Component{
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
        }
    }

    componentWillReceiveProps(nextProps){
        this.state.show=nextProps.show;
        this.state.data=nextProps.data
        this.setState(this.state)
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
            if(active == id){
                return name+' '+this.state.names+' '+this.state.nams
            }
        }
        if(active == null||active2 == null||active3==null){
            return '请选择'
        }
    }

    gazi(){
        let active = this.state.active;
        let active2 = this.state.active2;
        let active3 = this.state.active3;
        let ds={jigou:active,bumen:active2,ren:active3};
        this.props.gets(ds,this.props.my)
    }

    opens(){
        this.setState({show:true})
    }

    returns(){
        this.setState({show:false})
    }

    cancels(){
        this.setState({show:false,active:null,active2:null,active3:null,myBm:[],ryData:[]})
        // this.props.gets([])
    }

    async choose(item){
        let bm = await structList(this.state.http,item.id)
        this.setState({
            myBm:bm.data,
            active:item.id,
            active2:null,
            active3:null,
            names:'',
            nams:'',
            ryData:[]
        })
    }

    async choose2(item){
        let ry = await ByDePerson(this.state.http,item.id)
        this.setState({
            ryData:ry.data,
            names:item.name,
            active2:item.id,
            nams:'',
            active3:null
        })
    }

    async choose3(item){
        this.state.nams = item.realname;
        this.state.active3 = item.userid;
        this.forceUpdate();
    }

    render(){

    const {data,show,myBm,ryData} = this.state;

    return(<View style={{flex:1}}>
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
                          <TouchableOpacity onPress={()=>this.cancels()}><Text style={{color:'white',fontSize:16}}>取消</Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>{this.returns();this.gazi()}}><Text style={{color:'white',fontSize:16}}>确定</Text></TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',flex:1}}>
                        <FlatList style={{marginTop:8,width:'37%'}} data = {data} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginLeft:5,marginBottom:5,backgroundColor:'#eee',paddingTop:8,paddingBottom:8,width:'90%',borderRadius:5}}>
                                    <Checkbox style={{marginLeft:5}} checked={this.state.active == item.id} onChange={(e)=>this.choose(item)}>
                                        <Text style={{width:'70%',color:'black',fontSize:14,marginLeft:5}}>{item.name}</Text>
                                    </Checkbox>
                                </View>}
                        />
                        <View style={{width:1,height:'90%',backgroundColor:'#999'}}></View>
                        <FlatList style={{marginTop:8,width:'32%'}} data = {myBm} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginLeft:5,marginBottom:5,backgroundColor:'#eee',paddingTop:8,paddingBottom:8,width:'90%',borderRadius:5}}>
                                    <Checkbox style={{marginLeft:5}} checked={this.state.active2 == item.id} onChange={(e)=>this.choose2(item)}>
                                        <Text style={{width:'70%',color:'black',marginLeft:5,fontSize:14}}>{item.name}</Text>
                                    </Checkbox>
                                </View>}
                        />
                        <View style={{width:1,height:'90%',backgroundColor:'#999'}}></View>
                        <FlatList style={{marginTop:8,width:'30%'}} data = {ryData} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginLeft:5,marginBottom:5,backgroundColor:'#eee',paddingTop:8,paddingBottom:8,width:'90%',borderRadius:5}}>
                                    <Checkbox style={{marginLeft:5}} checked={this.state.active3 == item.userid} onChange={(e)=>this.choose3(item)}>
                                        <Text style={{width:'70%',color:'black',fontSize:14,marginLeft:5}}>{item.realname}</Text>
                                    </Checkbox>
                                </View>}
                        />
                        </View>
                    </View>
                </View>
            </Modal>}
        </View>)
    }
}