/**
 * 标题栏   
 * 左边back按钮 中间标题title  右边文字
 * @param{parent} 父组件 parent={this}
 * @param{showBack}是否有返回按钮
 * @param{backIcon}返回图标
 * @param{name}中间文字
 * @param{rightIcon}右边图标
 * @param{rightText}右边文字
 * @param{rightColor}右边文字、图标颜色
 * @param{onRightPress}右边点击事件
 * @param{rightRouteTo}；路由跳转
 * @param{replaceRoute}路由替换
 * @param{data}传递蚕食
 */

import React from 'react'
import {StatusBar, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types'


/** 标题栏默认高度，不包含状态栏 */
const DEFAULT_HEIGHT = 40;

export default class HeaderBar extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.instanceOf(React.Component).isRequired,
        /** 是否显示返回图标，默认为true */
        showBack: PropTypes.bool,
        /** 左边返回图标 */
        backIcon: PropTypes.string,
        /** 标题名称 */
        name: PropTypes.string.isRequired,
        /** 标题栏右边图标，优先级高于rightText */
        rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        /** 右边按钮显示文字，优先级低于rightIcon */
        rightText: PropTypes.string,
        /** 右边按钮文字或图标的颜色 */
        rightColor: PropTypes.string,
        /** 右边图标press事件回调 */
        onRightPress: PropTypes.func,
        /** 右边按钮点击跳转路由，如果设置了该属性，则{onRightPress}失效 */
        rightRouteTo: PropTypes.string,
        /** 是否调用路由对象的replace方法跳转路由 */
        replaceRoute: PropTypes.bool,
        /** 传输数据，跳转路由时携带，或者执行任意press事件时的第二个参数 */
        data: PropTypes.any,

        /** 标题栏高度 */
        height: PropTypes.number,

        onLayout: PropTypes.func,
    };

    static defaultProps = {
        backIcon: 'arrowleft',
        showBack: true,
        height: DEFAULT_HEIGHT,
        rightColor: '#fff',
        replaceRoute: false,
    };
    
    /** 标题栏默认高度，不包含状态栏 */
    static DEFAULT_HEIGHT = DEFAULT_HEIGHT;

    /** 标题栏+状态栏总高度 */
    static FULL_HEIGHT = DEFAULT_HEIGHT + StatusBar.currentHeight;

    state = {};

    constructor(props) {
        super(props);
    }
    
    /** 返回按钮 */
    _goBack = () => {
        // if(this.props.call){this.props.call(this.props.data)}
        // else{}
        if(this.props.isgoLogin){
            this.props.parent.props.navigation.navigate('login')
        }else{
             this.props.parent.props.navigation.goBack()
        }
       
    };

    /** 右边按钮点击 */
    _onRightIconPress = e => {
        if(this.props.flashing){
            this.props.gets()
        }else{
            this.props.parent.props.navigation.push(this.props.rightRouteTo, this.props.data);

        }
    };

    render() {
        const {
            showBack,
            backIcon,
            name,
            rightIcon,
            rightText,
            rightColor,
            height,
        } = this.props;

        return (<View
            style={{
                width: '100%',
                paddingTop: StatusBar.currentHeight,
                height: height + StatusBar.currentHeight,
                backgroundColor: "#11A6FF",
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onLayout={this.props.onLayout}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this._goBack}
                style={{
                    height: height,
                    alignItems: 'center',
                    flexDirection: 'row',
                    zIndex:44
                }}>
                {showBack && <Icon name={backIcon} size={24} color={'white'} style={{marginLeft: 10}}/>}
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center',width:'100%',height:38,position:'absolute',top:StatusBar.currentHeight,zIndex:0}}>
                <Text style={{textAlign:'center',color: 'white',fontSize:16,textAlign:"center"}}>{name}</Text>
            </View>
                {/* <Text style={{color: '#fff', fontSize: 18, fontWeight: '400',flex:1}} numberOfLines={1}>{name}</Text> */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this._onRightIconPress}
                style={{
                    position:'absolute',
                    top:StatusBar.currentHeight,
                    width: 80,
                    right:10,
                    height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    zIndex:44
                }}
            >
                {rightIcon ? <Icon name={rightIcon} size={20} color={rightColor} style={{marginRight: 10}}/> :
                    (rightText && <Text style={{color: rightColor, marginRight: 10, fontSize: 14}}>{rightText}</Text>)
                }
            </TouchableOpacity>
        </View>)
    }
}