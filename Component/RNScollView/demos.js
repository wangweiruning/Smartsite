import React, {Component} from 'react'
import {Image,View, Text, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform, Dimensions, StyleSheet} from 'react-native'
import Video from 'react-native-video'
import HeaderBar from '../common/HeaderBar';
import {commonStyle} from './commonStyle'
import Icon from 'react-native-vector-icons/AntDesign';
const deviceInfo = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}

const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const movieDetailUrl = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=125805'

const playerHeight = 250

export default class demoReact extends React.Component {

  constructor(props) {
    super(props)
    this.player = null
    this.state = {
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
      specificOrientation: null
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

    fetch(movieDetailUrl, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((responseData) => {
		  console.log(responseData.data)
        this.setState({movieInfo: responseData.data.basic.video})
      })
      .catch((error) => {
        console.log(error)
      })
      .done()


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

  renderModal() {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => alert("Modal has been closed.")}
      >
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            color={commonStyle.red}
            size="large"
          />
        </View>
      </Modal>
    )
  }

  render() {
    const {orientation, isLock} = this.state
    const url = this.state.movieInfo.url
    const title = this.state.movieInfo.title
    return ( url ? 
		<View style={{flex:1}}>
		  {/* <HeaderBar parent={this} name="滑动定位"/> */}
		  	<TouchableOpacity activeOpacity={1}
              style={[styles.movieContainer, {height: orientation === 'PORTRAIT' ? playerHeight/1.2 : deviceInfo.deviceWidth/1.25,
              marginTop:30}]}
              onPress={() => this.setState({isTouchedScreen: !this.state.isTouchedScreen})}>
        	<Video source={{uri: url}}
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
          !isLock ?
            <View style={styles.navContentStyle}>
              <View style={{flexDirection: 'row', alignItems: commonStyle.center, flex: 1}}>
                <TouchableOpacity
                  style={{backgroundColor: commonStyle.clear}}
                  onPress={()=>this.props.navigation.pop()}>
                 	<Icon name={'arrowleft'} size={24} color={'white'}/>
                </TouchableOpacity>
                <Text style={{backgroundColor: commonStyle.clear, color: commonStyle.white, marginLeft: 10}}>{title}</Text>
              </View>
            
            </View> : 
			<View style={{height: commonStyle.navContentHeight, backgroundColor: commonStyle.black}}/>
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
				{marginBottom: Platform.OS === 'ios' ? 0 : 
				orientation !== 'PORTRAIT' ? 25 : 0}]}>
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
        {this.renderModal()}
      </TouchableOpacity>
	  </View> : 
	  <View/>
    )
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
    bottom: 0,
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
    marginTop: 10,
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navToolBar: {
    backgroundColor: commonStyle.clear,
    marginHorizontal: 5
  }
})
