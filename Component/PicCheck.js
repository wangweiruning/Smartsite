/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {Text, View, Dimensions, } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg, { Circle,Image } from 'react-native-svg';
import MySorage from '../api/storage';
import HeaderBar from './common/HeaderBar';
import { projectMap } from './../api/api'
import SvgUri from 'react-native-svg-uri'
import config from '../api/serviceAPI.config'
import {ActivityIndicator} from 'antd-mobile-rn';

export default class PicCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      http:jconfig.netWorkIp?jconfig.netWorkIp:config.URL,
      active: null,
      active1: null,
      type: 1,
      baseimg:null
    }
  }

  componentWillMount() {
    this.getImg();
  }
  getImg = async () => {
    let ttss = await projectMap({ projectId: 5 });
    console.log(ttss)
    if(ttss.isSuccess()){
      this.setState({
        baseimg:ttss.data.attach!=null?ttss.data.attach.path:null
      })
    }
  }
  dataXY(x, y, type) {
    console.log(x, y, "gggggggg")
    if (type == 1) {
      MySorage._sava('XY', { X: x, Y: y });
    } else if (type == 2) {
      MySorage._sava('light', { X: x, Y: y });
    } else {
      MySorage._sava('newXY', { X: x, Y: y });
    }

  }
  componentDidMount() {
    let { local, type } = this.props.navigation.state.params;
    this.setState({
      active: local.x,
      active1: local.y,
      type: type
    })
  }

  render() {
    
    return (<View style={{ flex: 1 }}>
      <HeaderBar name='具体位置选择' parent={this} />
     {this.state.baseimg!==null?<ImageZoom cropWidth={Dimensions.get('window').width}
        onClick={(IOnClick) => {
          this.setState({
            active: IOnClick.locationX,
            active1: IOnClick.locationY
          });

          this.dataXY(IOnClick.locationX, IOnClick.locationY, this.state.type)
        }}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={400}>
          <Svg style={{position:'absolute',top:0}} height={400} width={Dimensions.get('window').width}>
                <SvgUri
                  width={`${Dimensions.get('window').width}`}
                  height="400"
                  source={{
                    uri:this.state.http+this.state.baseimg,
                  }}
                />
          </Svg>
         <Svg style={{backgroundColor:'transparent',position:'absolute',top:0}}  height={400} width={Dimensions.get('window').width}>
              {this.state.active!==null && <Circle cx={this.state.active} cy={this.state.active1} r="5" />}
        </Svg>

      </ImageZoom>:<View style={{top:"-6%",justifyContent:'center',alignItems:'center',width:"100%",height:"100%"}}>
                  <ActivityIndicator color="#363434"/>
                  <Text style={{color:'#363434',fontSize:15,marginTop:15,zIndex:1000000}}>加载中...</Text>
                  </View>}
    </View>)
  }
}
