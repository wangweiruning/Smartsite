import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

/**
 * Press事件封装组件
 */
export class Pressable extends React.PureComponent {
  /**
   * 除以下声明的属性，其它的属性都将作用在component属性传入的组件上
   */
  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    /** 父组件对象 */
    parent: PropTypes.instanceOf(React.Component).isRequired,
    /** 要渲染的组件,默认为View */
    component: PropTypes.any,
    /** 跳转路由名称，若指定了该属性，则onPress失效 */
    routeTo: PropTypes.string,
    /** 跳转路由时使用navigation.replace方法跳转 */
    routeReplace: PropTypes.bool,
    /** 数据，跳转路由时会携带，执行onPress/onLongPress时为第二个参数 */
    data: PropTypes.any,
    /** 附加在component上的样式 */
    style: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    component: View,
    routeReplace: false,
  };

  /**
   * 删除与渲染组件无关的属性
   * @param props
   * @return {*}
   * @private
   */
  static _removeUnnecessaryProps(props) {
    Object.keys(Pressable.propTypes).forEach(key => {
      delete props[key];
    });
    return props;
  }

  constructor(props) {
    super(props);

    this._onLongPress = typeof this.props.onLongPress === 'function' ?
      (e => this.props.onLongPress(e, this.props.data)) : null;
  }

  _onPress = e => {
    if (this.props.routeTo) {
      if (this.props.routeReplace) {
        this.props.parent.props.navigation.push(this.props.routeTo, this.props.data);
      } else {
        this.props.parent.props.navigation.push(this.props.routeTo, this.props.data);
      }
    } else {
      typeof this.props.onPress === 'function' && this.props.onPress(e, this.props.data);
    }
  };

  render() {
    const props = Pressable._removeUnnecessaryProps({...(this.props)});
    return <this.props.component
      {...props}
      onPress={this._onPress}
      onLongPress={this._onLongPress}
      style={this.props.style}
    >
      {this.props.children}
    </this.props.component>;
  }
}