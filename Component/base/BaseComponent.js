import React from 'react';


export class BaseComponent extends React.Component {

  /**
   * 跳转路由页面
   * @param {string} routeName
   * @param [params]
   * @param [action]
   */
  navigateTo(routeName, params, action) {
    this.props.navigation.navigate(routeName, params, action);
  }

}