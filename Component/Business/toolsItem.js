
/***
 * 工具器列表元素
 * 
 * 左边图片文字   + 右边文字信息
 * @param{parent}父组件
 * @param{showLeft}判断左边图标是否显示
 * @param{leftName}左边文字
 * @param{rightText}右边文字
 * @param{rightColor}文字图标颜色
 * @param{onRightPress}点击事件
 * @param{rightRouteTo}路由跳转
 * @param{data}页面跳转传递参数
 * ***/

import React from 'react'
import {StatusBar, Text, TouchableOpacity, View,Alert,Image} from 'react-native';
import PropTypes from 'prop-types'
const DEFAULT_HEIGHT = 40;
export default class ToolsItem extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.instanceOf(React.Component).isRequired,
        /** 标题名称 */
        leftName: PropTypes.string.isRequired,
        /** 右边按钮显示文字，优先级低于rightIcon */
        rightText: PropTypes.number,
        /** 右边按钮文字或图标的颜色 */
        rightColor: PropTypes.string,
        leftColor:PropTypes.string,
        /** 右边图标press事件回调 */
        onRightPress: PropTypes.func,
        /** 右边按钮点击跳转路由，如果设置了该属性，则{onRightPress}失效 */
        rightRouteTo: PropTypes.string,
        /** 传输数据，跳转路由时携带，或者执行任意press事件时的第二个参数 */
        data: PropTypes.any,
        /** 元素高度 */
        height: PropTypes.number,
        onLayout: PropTypes.func,
        /**背景颜色 */
        BKcOLOR:PropTypes.string,
        rightBgColor:PropTypes.string
    };

    /**默认参数 */
    static defaultProps = {
        
        height: DEFAULT_HEIGHT,
        leftColor:"#000",
        rightColor: '#c3c3c3',
        BKcOLOR:"#FFFFFF",
        rightBgColor:"#edba69"
    };
    
    /** 标题栏默认高度，不包含状态栏 */
    static DEFAULT_HEIGHT = DEFAULT_HEIGHT;

    /** 标题栏+状态栏总高度 */
    static FULL_HEIGHT = DEFAULT_HEIGHT;

    state = {};

    constructor(props) {
        super(props);
    }

   
    /** 按钮点击 */
    _onRightIconPress = e => {
        this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);    
    };

    render() {
        const {
            leftName,
            rightText,
            leftColor,
            rightColor,
            height,
            BKcOLOR,
            rightBgColor,
			toolsNum
        } = this.props;

        return (<TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this._onRightIconPress}
                    style={{
                        width: '100%',
                        height: height,
                        backgroundColor: BKcOLOR,
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop:1,
                        justifyContent:'center',
                        borderBottomWidth:1,
                        borderBottomColor:"#E9E9EF",
                        borderStyle:'solid'
                    }}
                    onLayout={this.props.onLayout}>

                        <View style={{flexDirection: 'column', width: "85%"}}>
                            <View style={{
                                height: 24,
                                top:3,
                                width:'100%',
                                justifyContent:'space-between',
                                alignContent:'center', 
                                flexDirection: 'row',
                            }}>
                                <Text style={{color: leftColor, fontSize: 12,textAlign:'left'}} numberOfLines={1}>{leftName}</Text>
                                <View style={{
                                        height: 18,
                                        borderRadius:15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor:rightBgColor,
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{color: rightColor, fontSize: 12,textAlign:'center',paddingLeft:5,paddingRight:5}}>{rightText}</Text>
                                </View>
                        </View>
                        <View style={{borderRadius:5,width:'100%',height:10,backgroundColor:'#E9E9EF'}}>
                        </View>
                        <View style={{borderRadius:5,width:`${parseInt(rightText)/toolsNum*100}%`,height:10,backgroundColor:'orange',bottom:10}}>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',left:5}}>
                    <Image resizeMode = 'contain' source = { require('../../images/goto.png')} style = { { width: 20, height: 20 }}/>
                    </View>
        </TouchableOpacity>)
    }
}