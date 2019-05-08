
import React from 'react';
import {ScrollView,Image,View, Text, StyleSheet} from 'react-native'
import HeaderBar from '../common/HeaderBar';
import Lightbox from 'react-native-lightbox';
import config from '../../api/serviceAPI.config'


const playerHeight = 180

export default class MsgEticketPage extends React.Component{
    constructor(props){
				super(props)
				this.player = null
        this.state={
					  http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
						data:'',
        }
    }

    componentDidMount(){
        let data = this.props.navigation.state.params;
				console.log(data,"ggggggggggggggg")
        this.setState({
					data:data,
        })
		}

	
	
	
	
		formatMediaTime(duration) {
			let min = Math.floor(duration / 60)
			let second = duration - min * 60
			min = min >= 10 ? min : '0' + min
			second = second >= 10 ? second : '0' + second
			return min + ':' + second
		}
	
	

    getmainperson(v){
        let tt = [];
        if(v.length>0){
          v.map(item=>{
            tt.push(item.realname)
          })
          return tt.join(',');
        }else{
          return '暂无'
        }
      }
    render(){
                const {data} = this.state;
                console.log(data,"cccccccccccccccccccc")
              
        return(
				<View style={{flex:1,backgroundColor:'white'}}>
           <HeaderBar name='作业票详情' parent={this} />	
           <ScrollView>
                {data!=""&&<View style={{alignItems:'center'}}>
                <View style={{width:'93%'}}>
                <View style={{flexDirection:'row',paddingTop:15,
                    paddingBottom:15,alignItems:'center',borderBottomWidth:.5,
                    borderBottomColor:'#999'}}>
                    <Text style={{color:'#000',fontSize:16,marginRight:5}}>
                    作业内容*<Text style={{color:'#0390e8'}}>{data.content}</Text></Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:15,
                    paddingBottom:15,alignItems:'center',borderBottomWidth:.5,
                    borderBottomColor:'#999'}}>
                    <Text style={{color:'#000',fontSize:16,marginRight:5}}>
                    关联工程*{data.project.name}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                    <Text style={{color:'black',fontSize:16,marginRight:5}}>
                    编号* {data.ticketNumber}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                    <Text style={{color:'black',fontSize:16,marginRight:5}}>
                    作业部位* {data.position}</Text>
                </View>
               
                <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                    <Text style={{color:'black',fontSize:16,marginRight:5}}>
                    开始时间* {data.startTime}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
                    <Text style={{color:'black',fontSize:16,marginRight:5}}>
                    结束时间* {data.endTime}</Text>
                </View>
            <View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
            {
                data.attaches.length>0 && data.attaches.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
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

