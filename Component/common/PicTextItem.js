/**
 *      上下图文元素 
 *
 * @param{parent} 父组件 parent={this}
 * @param{Icon}图标
 * @param{Text}文字
 * @param{Color}文字、图标颜色
 * @param{onRightPress}点击事件
 * @param{rightRouteTo}；路由跳转
 * @param{replaceRoute}路由替换
 * @param{data}传递蚕食
 */

import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types'


export class PicTextItem extends React.Component {
    static propTypes = {
        /** 父组件 */
        parent: PropTypes.object,
        Icontop: PropTypes.number,
        /** 文字名称 */
        TextName: PropTypes.string,
        /** 文字或图标的颜色 */
        Color: PropTypes.string,
        /** 右边图标press事件回调 */
        onRightPress: PropTypes.func,
        /** 右边按钮点击跳转路由，如果设置了该属性，则{onRightPress}失效 */
        rightRouteTo: PropTypes.string,
        /** 是否调用路由对象的replace方法跳转路由 */
        replaceRoute: PropTypes.bool,
        /** 传输数据，跳转路由时携带，或者执行任意press事件时的第二个参数 */
        data: PropTypes.any,
        /** 高度 */
        height:PropTypes.number,
        /** 宽度 */
        width:PropTypes.number,
        Pwidth:PropTypes.string,
        borderStyle:PropTypes.object,
        imgwidth:PropTypes.number,
        imgheight:PropTypes.number,
    };

    static defaultProps = {
        Icontop: require('../../images/gongsi.png'),
        TextName: '智慧工地',
        Color:'#000000',
        height:60,
        width:50,
        Pwidth:100,
        imgwidth:25,
        imgheight:25
    };
    constructor(props) {
        super(props);
        this.state={
            waiting: false
        }
    }

    /** 右边按钮点击 */
    _onRightIconPress=()=>{
        this.props.parent.navigate(this.props.rightRouteTo, this.props.data);              
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
            Pwidth,
            Icontop,
            TextName,
            Color,
            height,
            borderStyle,
            width,
            imgwidth,
            imgheight,
            rightRouteTo,
            parent,
            data
        } = this.props;
        
        return (<TouchableOpacity
            activeOpacity={0.6}
            onPress={()=>this._repeatClick()}
            disabled={this.state.waiting} 
            style={{
                width: Pwidth,
                height: height,
                backgroundColor: "#FFFFFF",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'center',
                ...borderStyle
            }}
        >
            <View style={{
                    width: 60,
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent:'center',
                    paddingVertical:10
                }}>
                 <Image source={Icontop} size={18} color={'white'} style={{width:imgwidth,height:imgheight}}/>
                 <Text style={{top:5,color:Color, fontSize: 12}} >{TextName}</Text>
            </View>
        </TouchableOpacity>)
    }
}