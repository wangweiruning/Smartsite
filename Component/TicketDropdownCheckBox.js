import React from 'react';
import {Checkbox} from 'antd-mobile-rn';
import {View,Text,Image,TouchableOpacity,Modal,TextInput,FlatList,ToastAndroid} from 'react-native';

export default class TicketDropdownCheckBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SelectData:this.props.SelectData,
            visible:false,
            activeItemObj:{},
        }
    }

    componentWillReceiveProps(nxprops){
        this.state.SelectData=nxprops.SelectData;
    }
   
    open(){
        let activeItem = this.state.activeItemObj;
        let display = [];
        for(let i in activeItem){
            if(activeItem[i]){
                display.push(activeItem[i]);
            }
        }
        if(display.length>0){

            return <Text style={{width:'90%'}}>{display.join(',')}</Text>;
        }else{
            return <Text>请选择</Text>
        }
    }

    option(){
            this.setState({
                visible:false,
                SelectData:this.props.SelectData
            });
            let activeItemObj = this.state.activeItemObj;
            let actives={};
            for(let i in activeItemObj){
                if(!!activeItemObj[i]){
                    actives[i] = activeItemObj[i];
                }
            }   
        this.props.opens(actives)
    }

    cansol(){
        this.setState({
            visible:false,
            activeItemObj:{}
        });
        this.props.opens({});
    }

    selects(e,v){
        let s = e.target.checked;
        this.state.activeItemObj[v.id||v.userid] = s?v.inspectbody||v.realname:null;
        this.forceUpdate();
    }


    render(){
        let {color,fontSize} = {...this.props.TextColor}
        return(<View style={this.props.style}>
            <TouchableOpacity onPress={()=>this.setState({visible:true})} style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={{...this.props.style,backgroundColor:'white',minWidth:"95%",maxWidth:'95%'}}>
                   {this.open()}
            </View>
            </TouchableOpacity>
            {this.state.visible && <Modal animationType={'slide'} transparent={true} onRequestClose={()=>this.option()}>
            <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
            <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>{
                this.setState({visible:false});
                // this.cansol();
            }}></TouchableOpacity>
            <View style={{width:'100%',backgroundColor:'white',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:7,alignItems:'center',borderTopStartRadius:5,borderTopEndRadius:5,backgroundColor:'#0390e8'}}>
            <Text style={{color:'white',fontSize:16}} onPress={()=>this.cansol()}>取消</Text>
            <Text style={{color:'white',fontSize:16}} onPress={()=>this.option()}>确定</Text>
            </View>
            <FlatList style={{height:'100%',marginTop:8}} data = {this.state.SelectData} keyExtractor={(item, index) => index.toString()}
                renderItem={({item,index}) =>{
                    let isChecked = this.state.activeItemObj[item.id||item.userid];
                    if(isChecked == undefined){
                        isChecked = this.state.activeItemObj[item.id||item.userid] = false;
                    }
                    return(<View key={index} style={{marginLeft:9,marginBottom:8,flexDirection:'row',padding:5,width:'95%'}}>
                    <Checkbox checked={!!isChecked} onChange={(e)=>this.selects(e,item)}>
                    <Text style={{width:'92%',left:5,color:'black',fontSize:fontSize?fontSize:18,borderBottomColor:'#ccc',borderBottomWidth:1,borderStyle:'solid',paddingTop:8,paddingBottom:8}}>{item.inspectbody||item.realname}</Text>
                    </Checkbox>
                    </View>)
                  }}
                />
            </View>
            </View>
            </Modal>}
        </View>
        )
    }
}