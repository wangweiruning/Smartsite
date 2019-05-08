
import React from 'react';
import {ScrollView,Image,View, Text, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform, Dimensions, StyleSheet} from 'react-native'
import HeaderBar from '../common/HeaderBar';
import Lightbox from 'react-native-lightbox';
import config from '../../api/serviceAPI.config'
import Video from 'react-native-video'
import {commonStyle} from '../RNScollView/commonStyle'
import Icon from 'react-native-vector-icons/AntDesign';
const deviceInfo = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}


const playerHeight = 180

export default class MsgManagePage extends React.Component{
    constructor(props){
				super(props)
				this.player = null
        this.state={
					  http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
						data:'',
						title:'',
						opens:false,
						rate: 1,
						slideValue: 0.00,
						currentTime: 0.00,
						duration: 0.00,
						paused: false,
						playIcon: 'pause',
						isTouchedScreen: true,
						modalVisible: true,
						isLock: false,
						movieInfo: {},
						orientation: null,
						specificOrientation: null,
						url:''
        }
    }

    componentDidMount(){
        let data = this.props.navigation.state.params;
        this.setState({
					data:data,
					title:data.theme,
					url:data.videos.length>0?data.videos[0].path:'',
        })
		}
		
		loadStart(data) {
			console.log('loadStart', data)
		}
	
		setDuration(duration) {
			this.setState({duration: duration.duration})
		}
	
		setTime(data) {
			let sliderValue = parseInt(this.state.currentTime)
			this.setState({
				slideValue: sliderValue,
				currentTime: data.currentTime,
				modalVisible: false
			})
		}
	
		onEnd(data) {
		this.player.seek(0)
		this.setState({
			paused: !this.state.paused,
			playIcon:  'caretright',
			slideValue:0.00
			})
		}
	
		videoError(error) {
			this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
			this.setState({
				modalVisible: false
			})
		}
	
		onBuffer(data) {
			console.log('onBuffer', data)
		}
	
		onTimedMetadata(data) {
			console.log('onTimedMetadata', data)
		}
	
		showMessageBar = title => msg => type => {
			// 消息
		}
	
		formatMediaTime(duration) {
			let min = Math.floor(duration / 60)
			let second = duration - min * 60
			min = min >= 10 ? min : '0' + min
			second = second >= 10 ? second : '0' + second
			return min + ':' + second
		}
	
		play() {
			this.setState({
				paused: !this.state.paused,
				playIcon: this.state.paused ? 'pause' : 'caretright'
			})
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
				const {orientation, isLock,data,title,url,http} = this.state;
        return(
				<View style={{flex:1,backgroundColor:'white'}}>
           <HeaderBar name='站班会详情' parent={this} />
					 {url!==''&&<View style={{width:'100%',height:220,
										borderBottomColor:'#000',backgroundColor:'#000',
										borderBottomWidth:1,borderStyle:'solid'}}>
		  		<TouchableOpacity activeOpacity={1}
              style={[styles.movieContainer,{height:deviceInfo.deviceWidth/1.5,
											width:'100%'} ]}
              onPress={() => this.setState({isTouchedScreen: !this.state.isTouchedScreen})}>
        	<Video source={{uri: http+url}}
               ref={ref => this.player = ref}
               rate={this.state.rate}
               volume={1.0}
               muted={false}
               paused={this.state.paused}
               resizeMode="contain"
               repeat={true}
               playInBackground={false}
               playWhenInactive={false}
               ignoreSilentSwitch={"ignore"}
               progressUpdateInterval={250.0}
               onLoadStart={(data) => this.loadStart(data)}
               onLoad={data => this.setDuration(data)}
               onProgress={(data) => this.setTime(data)}
               onEnd={(data) => this.onEnd(data)}
               onError={(data) => this.videoError(data)}
               onBuffer={(data) => this.onBuffer(data)}
               onTimedMetadata={(data) => this.onTimedMetadata(data)}
               style={[styles.videoPlayer]}
        />
        {
          !isLock &&<View style={styles.navContentStyle}>
              <View style={{flexDirection: 'row', alignItems: commonStyle.center, flex: 1}}>
                <Text style={{backgroundColor: commonStyle.clear, color: commonStyle.white, marginLeft: 10}}>{title}</Text>
              </View>
						</View>
					}
        {
          orientation !== 'PORTRAIT' ?
            <TouchableOpacity
              style={{
				  marginHorizontal: 10,
				   backgroundColor: commonStyle.clear, 
				   width: 30,
					height: 30, 
					alignItems: commonStyle.center, 
					justifyContent: commonStyle.center}}
              onPress={() => this.setState({isLock: !this.state.isLock})}
            >
              {/* <Icon name={`oneIcon|${this.state.isLock ? 'locked_o' : 'unlocked_o'}`} size={20} color={commonStyle.white} style={{backgroundColor: commonStyle.blue}}/> */}
            </TouchableOpacity> : null
        }
        {
          this.state.isTouchedScreen && !isLock ?
			<View style={[styles.toolBarStyle, 
				{marginBottom:20}]}>
              <TouchableOpacity onPress={() => this.play()}>
                <Icon name={this.state.playIcon} size={18} color={commonStyle.white}/>
              </TouchableOpacity>
              <View style={styles.progressStyle}>
                <Text style={styles.timeStyle}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                <Slider
                  style={styles.slider}
                  value={this.state.slideValue}
                  maximumValue={this.state.duration}
                  minimumTrackTintColor={commonStyle.themeColor}
                  maximumTrackTintColor={commonStyle.iconGray}
				  step={1}
                  onValueChange={value => this.setState({currentTime: value})}
                  onSlidingComplete={value => this.player.seek(value)}
                />
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 35}}>
                  <Text style={{color: commonStyle.white, fontSize: 12}}>{this.formatMediaTime(Math.floor(this.state.duration))}</Text>
                </View>
              </View>
             
            </View> : <View style={{height: 40}}/>
        }
      
      </TouchableOpacity>
						</View>}
           <ScrollView>
							{data!=""&&<View style={{alignItems:'center'}}>
                       <View style={{width:'93%'}}>
                       <View style={{flexDirection:'row',paddingTop:15,
														 paddingBottom:15,alignItems:'center',borderBottomWidth:.5,
														 borderBottomColor:'#999'}}>
														 <Text style={{color:'#000',fontSize:16,marginRight:5}}>
														 主题：<Text style={{color:'#0390e8'}}>{data.theme}</Text></Text>
													 </View>
													 <View style={{flexDirection:'row',paddingTop:15,
														 paddingBottom:15,alignItems:'center',borderBottomWidth:.5,
														 borderBottomColor:'#999'}}>
														 <Text style={{color:'#000',fontSize:16,marginRight:5}}>
														 会议纪要*{data.summary}</Text>
													 </View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															单位* {data.unit!=null&&data.unit.name}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															负责人* {this.getmainperson(data.responsePerson)}</Text>
																</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															会议成员* {this.getmainperson(data.participant)}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															会议内容* {data.content}</Text>
														</View>
														<View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,alignItems:'center',borderBottomWidth:.5,borderBottomColor:'#999'}}>
															<Text style={{color:'black',fontSize:16,marginRight:5}}>
															会议时间* {data.createTime}</Text>
														</View>
													<View style={{flexDirection:'row',borderBottomWidth:.5,borderBottomColor:'#999',padding:10,flexWrap:'wrap'}}>
													{
													  data.images.length>0 && data.images.map((v,i)=><Lightbox willClose={()=>this.setState({opens:false})} didOpen={()=>this.setState({opens:true})} underlayColor="white" key={i} style={{flex:1}}>
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

const styles = StyleSheet.create({
  movieContainer: {
	justifyContent: 'space-between',
  },
  videoPlayer: {
	position: 'absolute',
    top: 0,
    left: 0,
    bottom: 20,
    right: 0,
  },
  navContentStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: commonStyle.black
  },
  toolBarStyle: {
    backgroundColor: commonStyle.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    // marginTop: 10,
    height: 30
  },
  timeStyle: {
    width: 35,
    color: commonStyle.white,
    fontSize: 12
  },
  slider: {
   margin:0,
   padding:0,
   flex:1
  },
  progressStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10
  },
  indicator: {
    height: playerHeight,
    width: deviceInfo.deviceWidth,
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navToolBar: {
    backgroundColor: commonStyle.clear,
    marginHorizontal: 5
  }
})
