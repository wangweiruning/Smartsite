import React from 'react';
import {View,Text,TouchableOpacity,FlatList,Modal} from 'react-native';
import {Checkbox} from 'antd-mobile-rn';


export default class KeModals extends React.Component{
constructor(props){
    super(props)
    this.state={
        show:false,//控制model显示隐藏
        data:this.props.data,
        active:null,//选中id
        keys:this.props.keysitem,//用于显示data的每一个item对象中的某个数据
        defaultNumber:this.props.defaultNumber,
        isfirst:true
    }
}

componentWillReceiveProps(nextProps){//接收新的数据
    this.state.show = nextProps.show;
    this.state.data = nextProps.data;
    let datas = nextProps.data;
    let defaultNum = nextProps.defaultNumber;
    if(!!defaultNum&&this.state.isfirst){
        datas.map((item,keys)=>{
            if(item.id==defaultNum||item[this.state.keys]==defaultNum){
                this.setState({
                    active:item.id,
                    isfirst:false
                })
            }
        })
    }

}

open(keys){//显示选中的元素
    let active = this.state.active;
    let datas = this.state.data;
    let name = null;
    let id = null
    for(let i=0;i<datas.length;i++){
        let data = datas[i];
        name = data[keys],
        id = data.id||data.userid;
        if(active == null){
            return '请选择'
        }
        else if(active == id){
            return name
        }
    };
}

gazi(){//将选中数据返回到父组件
    let datas = this.state.data;
    let ds={};
    let active = this.state.active;
    for(let i=0;i<datas.length;i++){
        let data = datas[i];
        if(data.id == active||data.userid==active)ds = data;
    };
    this.props.gets(ds,this.props.itemkeys);//子组件向父组件传递数据
}

opens(){//打开model
    this.setState({show:true})
}

returns(){//回到父组件
    this.gazi();
    this.setState({show:false})
}

cancels(){
    this.props.gets([]);
    this.setState({active:null})
}

choose(item){
    this.state.active = item.id||item.userid;
    this.forceUpdate();
}


render(){

    const {
        data,
        show,
        keys
        } = this.state;

    return(
        <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={.8} style={{...this.props.style}} onPress={()=>this.opens()}>
                <Text style={{...this.props.textStyle,left:13}}>
                    {this.open(keys)}
                </Text>
            </TouchableOpacity>
            {show&&<Modal hardwareAccelerated={true} animationType='slide' onRequestClose={()=>this.returns()} transparent={true}>
                <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
                    <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>this.returns()}></TouchableOpacity>
                    <View style={{backgroundColor:'white',width:'100%',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
                        <View style={{height:40,alignItems:"center",flexDirection:'row',padding:7,justifyContent:"space-between",backgroundColor:"#0390e8",borderTopStartRadius:5,borderTopEndRadius:5}}>
                          <TouchableOpacity  onPress={()=> this.cancels()}>
                            <Text style={{color:'white',fontSize:16}} >取消</Text>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={()=> this.returns()}>
                            <Text style={{color:'white',fontSize:16}}>确定</Text>
                          </TouchableOpacity>
                        </View>
                        <FlatList style={{height:'100%',marginTop:8}} data = {data} keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index}) =>
                                <View key={index} style={{marginBottom:8,marginLeft:15,flexDirection:'row',width:'96%',borderRadius:5}}>
                                    <Checkbox 
                                        checked={this.state.active == (item.id||item.userid)} //元素是否选中
                                        onChange={(e)=>this.choose(item)}>
                                        <Text style={{width:'100%',left:5,color:'black',fontSize:15,borderBottomColor:'#ccc',borderBottomWidth:1,borderStyle:'solid',paddingTop:8,paddingBottom:8}}>
                                            {item[keys]}
                                            {/* 选中的元素列表 */}
                                        </Text>
                                   </Checkbox>
                                </View>}
                        />
                    </View>
                </View>
            </Modal>}
        </View>
    )
}
}