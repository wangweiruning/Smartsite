/* 语音导航*/

import React, { Component } from 'react';
import {Text,View,TouchableOpacity,Slider,Image,ScrollView,ToastAndroid,StyleSheet,Dimensions,Platform} from 'react-native';
import HeaderBar from './../common/HeaderBar';
import {Checkbox} from 'antd-mobile-rn';
import Sound from 'react-native-sound';
import {Voices} from '../../api/api';
import config from '../../api/serviceAPI.config'

import Video from 'react-native-video'
import {commonStyle} from '../RNScollView/commonStyle'
import Icon from 'react-native-vector-icons/AntDesign';

Sound.setCategory('PlayAndRecord');
const deviceInfo = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}


const playerHeight = 180


export default class VoiceNavigation extends Component {
    constructor(props){
    super(props)
    this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
        playState:false,
        slidevalue:0,
        time:0,
        active:[1],
        dates:{},
        mysound:null,
        mysounds:null,
        check:[{type:'中文',id:1},{type:'英文',id:0}],
        title:'工程介绍',
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

    async  componentDidMount(){
      let Voice = await Voices(this.state.http,this.props.navigation.state.params.id)

      console.log(Voice,"‘或取到数据了")
      let musicattachs =Voice.data.musicattachs?Voice.data.musicattachs.length>0?Voice.data.musicattachs[0].path:null:null;
      let emusicattachs = Voice.data.emusicattachs?Voice.data.emusicattachs.length>0?Voice.data.emusicattachs[0].path:null:null;
      let urls = Voice.data.videoattachs?Voice.data.videoattachs.length>0?Voice.data.videoattachs[0].path:'':'';
      this.setState({
        dates:Voice.data,
        mysound:this.state.http+musicattachs,
        mysounds:this.state.http+emusicattachs,
        url:urls
      })
      this.playss()
    }


    playss(){
      this.Sounds = new Sound(this.state.active==1?this.state.mysound:this.state.mysounds,null,(e) => {
        if(e){
          return ToastAndroid.show('音频加载失败',ToastAndroid.SHORT);
        }
        this.setState({
          slidevalue:this.Sounds.getDuration()
        })
      });
      this.timeout = setInterval(()=>{this.Sounds.getCurrentTime((seconds) => this.setState({time:seconds}))},100)
    }
   

    componentWillUnmount(){
      if(this.timeout){
        this.Sounds.stop()
        clearInterval(this.timeout);
      }
    }

    getAudioTimeString(seconds){
      const m = parseInt(seconds%(60*60)/60);
      const s = parseInt(seconds%60);
      return ((m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    getAudioTimeStrings(seconds){
      const m = parseInt(seconds%(60*60)/60);
      const s = parseInt(seconds%60);
      return ((m) + '分' + (s<10?'0'+s+'秒':s+'秒'));
    }

    onSliderEditing(value){
      this.Sounds.setCurrentTime(value);
      this.setState({time:value});
    }


    choose(item){
      this.state.active = item.id;
      this.setState({playState:false})
      this.Sounds.stop()
      this.playss()
      this.forceUpdate();
    }

    myPlay(){
      this.player.seek(0)
      this.setState({
        playState:!this.state.playState,
        paused: true,
        playIcon: 'caretright',
        slideValue:0.00
      })
      
      if(this.state.playState){
        this.Sounds.pause()
      }
      else{
        this.Sounds.play((success)=>this.setState({
          playState:!this.state.playState,
        }))
        
      }
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
        playIcon: this.state.paused ? 'pause' : 'caretright',
        playState:false,
        time:0
      })
      if(!this.state.paused){
      this.Sounds.stop()
      }
		}
  render() {
    let minSeconds = this.getAudioTimeString(this.state.time);
    let maxSeconds = this.getAudioTimeString(this.state.slidevalue);
    let maxSecondss = this.getAudioTimeStrings(this.state.slidevalue)
    const {orientation, isLock,title,url,http} = this.state;
    return (<View style={{flex:1,backgroundColor:'white'}}>
       <HeaderBar parent={this} name={this.props.navigation.state.params.name} />
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
        <View style={{alignItems:"center"}}>
        {!this.state.mysound?<Text style={{marginTop:20}}>暂无音频文件</Text>:
        <View style={{width:'100%',alignItems:'center'}}>
        <View style={{marginTop:20}}>
          <View style={{alignItems:'center'}}>
            <Text style={{color:"#11A6FF",fontSize:13}}>{maxSecondss}语音介绍</Text>
            <View style={{flexDirection:"row",justifyContent:'center',marginTop:20}}>
              {this.state.check.map((v,i)=><View key={i} style={{alignItems:'center',flexDirection:'row',marginLeft:40}}>
                <Checkbox disabled={!this.state.mysound?true:false} checked={this.state.active==v.id} onChange={()=>this.choose(v)} />
                <Text style={{color:'black',fontSize:13,marginLeft:5}}>{v.type}</Text></View>)
              }
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
          <View>
          <TouchableOpacity onPress={()=>this.myPlay()}>
              <Image source={this.state.playState?require('../../images/ui_pause.png'):require('../../images/ui_play.png')} style={{width:30, height:30}}/>
          </TouchableOpacity>
          </View>
          <View style={{width:'75%',marginLeft:15}}>
            <Slider style={{width:"100%"}} thumbImage={require('../../images/blue.png')} minimumTrackTintColor='#11A6FF' value={this.state.time} maximumValue={this.state.slidevalue} onValueChange={(value)=>this.onSliderEditing(value)}/>
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginLeft:40,width:'66.5%'}}>
            <Text style={{color:'black',flex:1,fontSize:13}}>{minSeconds}</Text>
            <Text style={{color:'black',fontSize:13}}>{maxSeconds}</Text>
        </View>
        </View>}
        <View style={{width:"100%",alignItems:'center',paddingLeft:5,paddingRight:5}}>
          <Image source={require('../../images/dc.jpg')} style={{width:'90%',height:150,resizeMode:'stretch',marginTop:30}}/>
          <Text style={{lineHeight:25,fontSize:14,color:'black'}}>
            &nbsp;&nbsp;{this.state.dates.txt}
          </Text>
        </View>
        </View>
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