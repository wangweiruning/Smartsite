
/***
 * 小導航实现頁面跳轉
 * @param{parent}父组件
 * @param{showLeft}判断左边图标是否显示
 * @param{leftIcon}左边图标
 * @param{leftName}左边文字
 * @param{rightIcon}右边图标
 * @param{rightText}右边文字
 * @param{rightColor}文字图标颜色
 * @param{onRightPress}点击事件
 * @param{rightRouteTo}路由跳转
 * @param{replaceRoute}路由替换
 * @param{data}页面跳转传递参数
 * @param{borderRadius}设置圆角
 * ***/

import React from 'react'
import {StatusBar, Text, TouchableOpacity, View,Alert,Image} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types'


/** 标题栏默认高度，不包含状态栏 */
const DEFAULT_HEIGHT = 25;
export  class CommonItemTo extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.instanceOf(React.Component).isRequired,
        /** 是否显示返回图标，默认为true */
        showLeft: PropTypes.bool,
        /** 左边返回图标 */
        leftIcon: PropTypes.number,
        /** 标题名称 */
        leftName: PropTypes.string.isRequired,
        /** 标题栏右边图标，优先级高于rightText */
        rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        /** 右边按钮显示文字，优先级低于rightIcon */
        rightText: PropTypes.string,
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
        isGoto:PropTypes.bool,
        clear: PropTypes.func,
        goreturn:PropTypes.bool,
        iconHeight:PropTypes.number,
    };

    /**默认参数 */
    static defaultProps = {
        showLeft: true,
        height: DEFAULT_HEIGHT,
        leftColor:"#000",
        rightColor: '#c3c3c3',
        replaceRoute: false,
        BKcOLOR:"#FFFFFF",
        goreturn:true,
        iconHeight:35
    };
    
    /** 标题栏默认高度，不包含状态栏 */
    static DEFAULT_HEIGHT = DEFAULT_HEIGHT;

    /** 标题栏+状态栏总高度 */
    static FULL_HEIGHT = DEFAULT_HEIGHT + StatusBar.currentHeight;

    

    constructor(props) {
        super(props);
        this.state = {
            waiting: false
        };
        // this._onLayout = typeof this.props.onLayout === 'function' ? (e => this.props.onLayout(e)) : null;
    }

    /** 返回按钮 */
    _goBack = () => this.props.parent.props.navigation.goBack();
    /**清除缓存*/
   
    /** 右边按钮点击 */
    _onRightIconPress = e => {
        const {isGoto} = this.props;
        if(isGoto){
            Alert.alert(
                '提示','是否清除缓存？',
                [{text:'否'},
                 {text:'是',onPress:()=>this.props.clear()}
                ],{cancelable:false}
            );
        }else{
            if (this.props.rightRouteTo) {
                if (this.props.replaceRoute) {
                    this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);
                } else {
                    this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);
                }
            } else {
                typeof this.props.onRightPress === 'function' && this.props.onRightPress(e, this.props.data);
            }
        }
    };

    _repeatClick(){
        this.setState({waiting: true});
        this._onRightIconPress();//这里写你原本要交互的方法
        setTimeout(()=> {
            this.setState({waiting: false})
        }, 2000);//设置的时间间隔由你决定
    }
    render() {
        const {
            showLeft,
            leftIcon,
            leftName,
            rightIcon,
            rightText,
            leftColor,
            rightColor,
            height,
            borderRadius,
            BKcOLOR,
            iconHeight,
            goreturn,
        } = this.props;

        return (<TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>goreturn&&this._repeatClick()}
            disabled={this.state.waiting} 
            style={{
                width: '100%',
                height: height + StatusBar.currentHeight,
                backgroundColor: BKcOLOR,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop:5,
                borderRadius:borderRadius
            }}
            onLayout={this.props.onLayout}
        >
            <View
                style={{
                    width: '60%',
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                {showLeft && <Image source={leftIcon}  style={{marginLeft: 10,width:iconHeight,height:iconHeight}}/>}
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
                    width: 120,
                    height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
            {rightText && <Text style={{color: rightColor, marginRight: 10, fontSize: 14}}>{rightText}</Text>}
            <Image source={require('../../images/go1.png')} style={{width:20,height:20,marginRight:5}}/>
            </View>
        </TouchableOpacity>)
    }
}