
/***
 * 动态公共跳转ltem  
 * 左边图片文字   + 右边文字信息
 * @param{parent}父组件
 * @param{showLeft}判断左边图标是否显示
 * @param{leftIcon}左边图标
 * @param{leftName}左边文字
 * @param{rightText}右边文字
 * @param{rightColor}文字图标颜色
 * @param{onRightPress}点击事件
 * @param{rightRouteTo}路由跳转
 * @param{replaceRoute}路由替换
 * @param{data}页面跳转传递参数
 * @param{borderRadius}设置圆角
 * ***/

import React from 'react'
import {StatusBar, Text, TouchableOpacity, View,Alert,Image} from 'react-native';
import PropTypes from 'prop-types'


/** 标题栏默认高度，不包含状态栏 */
const DEFAULT_HEIGHT = 25;
export  class CreateItem extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.instanceOf(React.Component).isRequired,
        /** 是否显示返回图标，默认为true */
        showLeft: PropTypes.bool,
        /** 左边返回图标 */
        leftIcon: PropTypes.number,
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
        /** 是否调用路由对象的replace方法跳转路由 */
        replaceRoute: PropTypes.bool,
        /** 传输数据，跳转路由时携带，或者执行任意press事件时的第二个参数 */
        data: PropTypes.any,
        /**圆角 */
        borderRadius:PropTypes.number,
        /** 标题栏高度 */
        height: PropTypes.number,
        onLayout: PropTypes.func,
        /**背景颜色 */
        BKcOLOR:PropTypes.string,
        rightBgColor:PropTypes.string
    };

    /**默认参数 */
    static defaultProps = {
        showLeft: true,
        height: DEFAULT_HEIGHT,
        leftColor:"#000",
        rightColor: '#c3c3c3',
        replaceRoute: false,
        BKcOLOR:"#FFFFFF",
        rightBgColor:"#edba69"
    };
    
    /** 标题栏默认高度，不包含状态栏 */
    static DEFAULT_HEIGHT = DEFAULT_HEIGHT;

    /** 标题栏+状态栏总高度 */
    static FULL_HEIGHT = DEFAULT_HEIGHT + StatusBar.currentHeight;

    state = {};

    constructor(props) {
        super(props);
        // this._onLayout = typeof this.props.onLayout === 'function' ? (e => this.props.onLayout(e)) : null;
    }

    /** 返回按钮 */
    _goBack = () => this.props.parent.props.navigation.goBack();
    /**清除缓存*/
   
    /** 右边按钮点击 */
    _onRightIconPress = e => {
            if (this.props.rightRouteTo) {
                if (this.props.replaceRoute) {
                    this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);
                } else {
                    this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);
                }
            } else {
                typeof this.props.onRightPress === 'function' && this.props.onRightPress(e, this.props.data);
            }
    };

    render() {
        const {
            showLeft,
            leftIcon,
            leftName,
            rightText,
            leftColor,
            rightColor,
            height,
            borderRadius,
            BKcOLOR,
            rightBgColor
        } = this.props;

        return (<TouchableOpacity
            activeOpacity={0.8}
            onPress={this._onRightIconPress}
            style={{
                width: '100%',
                height: height + StatusBar.currentHeight,
                backgroundColor: BKcOLOR,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop:1,
                borderRadius:borderRadius
            }}
            onLayout={this.props.onLayout}
        >
            <View
                style={{
                    width: 140,
                    height: height,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                {showLeft && <Image source={leftIcon}  style={{marginLeft: 10,width:15,height:15}}/>}
                <Text style={{marginLeft: 15,color: leftColor, fontSize: 18, fontWeight: '400'}} numberOfLines={1}>{leftName}</Text>
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height,
                }}
            >
              
            </View>

            <View
                style={{
                    width:18,
                    right:18,
                    height: height,
                    borderRadius:9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:rightBgColor,
                    justifyContent: 'center',
                }}
            >
              <Text style={{color: rightColor, fontSize: 12,textAlign:'center'}}>{rightText}</Text>
            </View>
        </TouchableOpacity>)
    }
}