import React, {Component} from "react";
import {View,Image} from 'react-native';
import {Carousel} from 'antd-mobile-rn';

export default class LunboComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgList:[
                require('../images/banner1.png'),
                require('../images/banner2.png'),
                require('../images/banner3.png')
            ]
        };
    }

    render() {
        return (<View style={{height:150,width:'100%'}}> 
          <Carousel autoplay={true} selectedIndex={2} infinite autoplayInterval={4000}>
          {
              this.state.imgList.map((v,i) =>(
                <Image key={i} style={{width:'100%',height:150}} resizeMode='stretch' source={v}/>
              )
            )
          }
          </Carousel>
        </View>)
    }
}