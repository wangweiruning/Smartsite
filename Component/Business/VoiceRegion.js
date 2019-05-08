/* 每个区域列表*/

import React from 'react';
import {Text,View,TouchableOpacity,FlatList,Image,TextInput,ScrollView} from 'react-native';
import HeaderBar from './../common/HeaderBar';

export default class VoiceRegion extends React.Component{
    constructor(props){
        super(props)
        this.state={
            TopId:this.props.navigation.state.params.id,
            RegionData:[
                  {
                    name:'东1辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:1,
                  },
                  {
                    name:'东2辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:1,
                  },
                  {
                    name:'东3辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:1,
                  },
                  {
                    name:'西1辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:2,
                  },
                  {
                    name:'西2辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:2,
                  },
                  {
                    name:'西3辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:2,
                  },
                  {
                    name:'站台',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:3,
                  },
                  {
                    name:'保安室',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:3,
                  },
                  {
                    name:'控制大厅',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:3,
                  },
                  {
                    name:'北1辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:4,
                  },
                  {
                    name:'北2辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:4,
                  },
                  {
                    name:'北3辅控楼',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:4
                  },
                  {
                    name:'南部监控室',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:5,
                  },
                  {
                    name:'南部控制室',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:5,
                  },
                  {
                    name:'南部食堂',
                    introduce:'欢迎您莅临±1000千伏古泉换流站参观指导。古泉换流站是全球能源互联网示范工程———昌吉至古泉±1100千伏特高压直流输电工程的受端换流站，换流容量12000兆瓦，占地面积37公顷，含调相机工程总投资88亿元。',
                    nextId:5,
                  },
            ],
        }
    }
    kidex=[];
    componentDidMount(){
        let myRegion = [];
        let key = this.state.TopId;
        let list = this.state.RegionData;
        for(let i=0;i<list.length;i++){
            let cs = list[i].nextId;
            if(key==cs){
                myRegion.push(list[i])
            }
        }
        this.kidex=myRegion;
        this.forceUpdate();
    }

    render(){
        return(<View style={{backgroundColor:'white'}}>
            <HeaderBar parent={this} name={this.props.navigation.state.params.name} />
            <FlatList style={{height:'100%'}} data={this.kidex} keyExtractor={(item,index)=>index.toString()}
             renderItem={({item,index})=><TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('VoiceNavigation',{name:item.name,introduce:item.introduce})} style={{padding:10,borderBottomColor:'black',borderBottomWidth:1,borderStyle:'solid'}}>
               <Text>{item.name}</Text>
             </TouchableOpacity>}
            />
        </View>)
    }
}