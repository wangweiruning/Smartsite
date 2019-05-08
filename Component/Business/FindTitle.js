/**
 *      检查问题   标题栏 
 * 
 * 左边back按钮 中间标题title  右边文字
 * @param{parent} 父组件 parent={this}
 * @param{showBack}是否有返回按钮
 * @param{backIcon}返回图标
 * @param{name}中间文字
 * @param{rightIcon}右边图标
 * @param{onRightPress}右边点击事件
 * @param{rightRouteTo}路由跳转
 * @param{replaceRoute}路由替换
 * @param{data}传递蚕食
 */

import React from 'react'
import {StatusBar, Text, TouchableOpacity, View,Image} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types'


/** 标题栏默认高度，不包含状态栏 */
const DEFAULT_HEIGHT = 40;

export default class FindTitle extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.instanceOf(React.Component).isRequired,
        /** 是否显示返回图标，默认为true */
        showBack: PropTypes.bool,
        /** 左边返回图标 */
        backIcon: PropTypes.string,
        /** 标题名称 */
        name: PropTypes.string.isRequired,
        /** 标题栏右边创建+图标*/
        rightIcon: PropTypes.number,
        /** 右边搜索图标 */
        rightSearch: PropTypes.number,
        /** 右边user图标 */
        rightUser: PropTypes.number,
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
        haveRoute:PropTypes.bool,
        onLayout: PropTypes.func,
        haveSearch:PropTypes.bool
    };

    static defaultProps = {
        backIcon: 'arrowleft',
        showBack: true,
        height: DEFAULT_HEIGHT,
        replaceRoute: false,
        rightIcon:require('../../images/adds.png'),
        rightSearch:require('../../images/searchs.png'),
        haveSearch:true,
        haveRoute:false,
    };
    
    /** 标题栏默认高度，不包含状态栏 */
    static DEFAULT_HEIGHT = DEFAULT_HEIGHT;

    /** 标题栏+状态栏总高度 */
    static FULL_HEIGHT = DEFAULT_HEIGHT + StatusBar.currentHeight;

    state = {};

    constructor(props) {
        super(props);
        this.state={
            isShow:this.props.isShow
        }
    }

    /** 返回按钮 */
    _goBack = () => this.props.parent.props.navigation.goBack();

    /** 右边按钮点击 */
    _onRightIconPress = e => {
        this.props.parent.props.navigation.navigate(this.props.rightRouteTo, this.props.data);
    };

    render() {
        const {
            showBack,
            backIcon,
            name,
            rightIcon,
            rightSearch,
            haveSearch,
            height,
            haveRoute
        } = this.props;
        
        return (<View
            style={{
                width: '100%',
                paddingTop: StatusBar.currentHeight,
                height: height + StatusBar.currentHeight,
                backgroundColor: "#11A6FF",
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'space-between',
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
                    zIndex:33
                }}>
                {showBack && <Icon name={backIcon} size={24} color={'white'} style={{marginLeft: 10}}/>}
            </TouchableOpacity>

            {/* <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height,
                }}
            >
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '400'}} numberOfLines={1}>{name}</Text>
            </View> */}
            <View style={{flex:1,justifyContent:'center',width:'100%',height:38,position:'absolute',top:StatusBar.currentHeight,zIndex:0}}>
                <Text style={{textAlign:'center',color: 'white',fontSize:16,textAlign:"center"}}>{name}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            {haveSearch&&<TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.props.showSearch(this.props.isShowSearch)}
                style={{
                    width: 30,
                    height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex:33
                }}
            >
            <Image source={rightSearch} size={24}  style={{marginRight: 10,width:20,height:20}}/>
            </TouchableOpacity>}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{
                    if(haveRoute){
                        this._onRightIconPress()
                    }else{
                        this.props.showModel(this.props.isShow)
                    }
                    
                }}
                style={{
                    width: 30,
                    height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex:33
                }}
            >
            <Image source={rightIcon} style={{marginRight:10,width:22,height:22}}/>
            </TouchableOpacity>
            </View>
        </View>)
    }
}