import React from 'react';
import {View,Text,TouchableOpacity,FlatList,Modal} from 'react-native';
import {Checkbox} from 'antd-mobile-rn';


export default class KeModals extends React.Component{
constructor(props){
    super(props)
    this.state={
        show:false,
        data:this.props.data,
        active:null
    }
}

componentWillReceiveProps(nextProps){
    this.state.show=nextProps.show;
    this.state.data=nextProps.data
}


open(){
    let active = this.state.active;
    let datas = this.state.data;
    let name = null;
    let id = null
    for(let i=0;i<datas.length;i++){
        let data = datas[i];
        name = data.name || data.local || data.inspectbody||data.typename
        id = data.id
        if(active == id){
            return name
        }
    }
    if(active == null){
        return '请选择'
    }
}

gazi(){
    let datas = this.state.data;
    let ds={};
    let active = this.state.active;
    for(let i=0;i<datas.length;i++){
        let data = datas[i];
        if(!data.id)continue;
        if(data.id == active)ds = data;
    };
    this.props.gets(ds);
}

opens(){
    this.setState({show:true})
}

returns(){
    this.setState({show:false})
}

cancels(){
    this.setState({active:null})
}

choose(item){
    this.state.active = item.id;
    this.forceUpdate();
}


render(){

    const {
        data,
        show
    } = this.state;

    return(
        <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={.8} style={{...this.props.style}} onPress={()=>this.opens()}>
                <Text style={{...this.props.textStyle}}>
                    {this.open()}
                </Text>
            </TouchableOpacity>
            {show&&<Modal hardwremarkccelerated={true} animationType='slide' onRequestClose={()=>{this.returns();this.gazi()}} transparent={true}>
                <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
                    <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>this.returns()}></TouchableOpacity>
                    <View style={{backgroundColor:'white',width:'100%',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
                        <View style={{height:40,alignItems:"center",flexDirection:'row',padding:7,justifyContent:"space-between",backgroundColor:"#0390e8",borderTopStartRadius:5,borderTopEndRadius:5}}>
                          <Text style={{color:'white',fontSize:16}} onPress={()=>{this.cancels();this.props.gets([]);
                        }}>取消</Text>
                          <Text style={{color:'white',fontSize:16}} onPress={()=>{this.returns();this.gazi()}}>确定</Text>
                        </View>
                        <FlatList style={{height:'100%',marginTop:8}} data = {data} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                            <View key={index} style={{marginBottom:8,width:'100%',alignItems:'center'}}>
                                <View style={{width:'96%',flexDirection:'row',backgroundColor:'#eee',borderRadius:5,paddingLeft:7}}>
                                    <Checkbox checked={this.state.active == item.id} onChange={(e)=>this.choose(item)}>
                                    <Text style={{width:'100%',marginLeft:7,color:'black',fontSize:15,paddingTop:8,paddingBottom:8}}>{item.name||item.local||item.inspectbody||item.typename}</Text>
                                   </Checkbox>
                                </View>
                            </View>}/>
                    </View>
                </View>
            </Modal>}
        </View>
    )
}
}