import JPushModule from 'jpush-react-native';
import React, {Component} from 'react';
import HomeScreen from './Component/HomeScreen';
import MimeExample from './Component/MimeExample';
import ActivityIndicatorExample from './Component/ActivityIndicatorExample';
import SeeExample from './Component/SeeExample';
import Login from './Component/Login';
import Litile from './Component/Litile';
import CodeReading from './Component/CodeReading';
import Tools from './Component/Business/Tools';
import Material from './Component/Business/Material';
import Personnel from './Component/Monitor/Personnel';
import Networks from './Component/Networks';
import Risk from './Component/Dynamic/Risk';
import MaterialMsg from './Component/Dynamic/MaterialMsg';
import CreateMaterial from './Component/Business/CreateMaterial';
import AwaitTodo from './Component/Dynamic/AwaitTodo';
import FindMsg from './Component/Business/FindMsg';
import BrightSpot from './Component/Business/BrightSpot';
import Environmental from './Component/Monitor/Environmental';
import EnvironData from './Component/Monitor/EnvironData';
import CreateBrightSpot from './Component/Business/CreateBrightSpot';
import CreateTools from './Component/Business/CreateTools';
import ToosList from './Component/Business/ToosList';
import RiskInspection from './Component/RiskInspection';
import CreateFindMsg from './Component/Business/CreateFindMsg';
import AwaitTrouble from './Component/Dynamic/AwaitTrouble';
import CreateRisk from './Component/Dynamic/CreateRisk';
import BigTools from './Component/Monitor/BigTools';
import BigToolsMsg from './Component/Monitor/BigToolsMsg';

import {
  createStackNavigator,
  createSwitchNavigator,
  createTabNavigator,
  NavigationActions,
  StackActions,
  TabBarTop,
} from 'react-navigation';
import {Animated, BackHandler, Easing, Image, NetInfo, StatusBar, ToastAndroid} from 'react-native';
import CreactCards from './Component/Business/CreactCards';
import CardDetail from './Component/Business/CardDetail';
import Progress from './Component/Business/Progress';
import Retrieval from './Component/Business/Retrieval';
import VoiceNavigation from './Component/Business/VoiceNavigation';
import VoiceTop from './Component/Business/VoiceTop';
import VoiceRegion from './Component/Business/VoiceRegion';
import Panorama from './Component/Monitor/Panorama';
import CardList from './Component/Business/CardList';
import MaterialLuxian from './Component/Business/MaterialLuxian';
import Binding from './Component/Business/Binding';
import Dynamic from './Component/Business/Dynamic';
import Password from './Component/Password';
import ReDetile from './Component/Business/RetrievalDatail';
import Aboutus from './Component/Aboutus';
import MsgDetail from './Component/Business/MsgDetail';
import MsgBrightSpot from './Component/Business/MsgBrightSpot';
import demoReact from './Component/RNScollView/demos';
import ToolsMsg from './Component/Business/ToolsMsg';
import RiskDetail from './Component/Dynamic/RiskDetail';
import Network from './Component/NetWork';
import PicCheck from './Component/PicCheck';
import ManagePage from './Component/Business/ManagePage';
import Workload from './Component/Business/Workload';
import CreateManagePage from './Component/Business/CreateManagePage';
import MsgManagePage from './Component/Business/MsgManagePage';
import PeopleLook from './Component/Business/PeopleLook';
import MsgPeopleLook from './Component/Business/MsgPeopleLook';
import CarManage from './Component/Monitor/CarManage';
import GetMoney from './Component/Monitor/GetMoney';
import Eticket from './Component/Monitor/Eticket';
import CreateEticket from './Component/Monitor/CreateEticket';
import SelectMapId from './Component/Monitor/SelectMapId';
import BigToolsInfo from './Component/Monitor/BigToolsInfo';
import AuthLogin from './Auth';
import {LocalStorage} from './api/local_storage';
import MySorage from './api/storage'
import MsgEticketPage from './Component/Monitor/MsgEticketPage'

console.disableYellowBox = true;//去除黄屏警告

const TabRouteConfigs = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页面
  HomeScreen: { //动态
    screen: HomeScreen, // 对应的路由页面
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '动态',
      tabBarIcon: ({focused}) => (
        <Image resizeMode='contain' source={focused ? require('./images/whome.png') : require('./images/home.png')}
               style={{width: 20, height: 20}}
        />
      ),
    }),
  },
  ActivityIndicatorExample: {//业务
    screen: ActivityIndicatorExample,
    navigationOptions: { // 指定路由页面的配置选项
      tabBarLabel: '业务', // 可用作头部标提headerTitle ，或者Tab标题 tabBarLabel
      tabBarIcon: ({focused}) => (
        <Image resizeMode='contain' source={focused ? require('./images/wmode.png') : require('./images/moda.png')}
               style={{width: 20, height: 20}}
        />
      ),
    },
  },
  SeeExample: {//监测
    screen: SeeExample,
    navigationOptions: { // 指定路由页面的配置选项
      tabBarLabel: '监测', // 可用作头部标提headerTitle ，或者Tab标题 tabBarLabel
      tabBarIcon: ({focused}) => (
        <Image resizeMode='contain' source={focused ? require('./images/wjiance.png') : require('./images/jiance.png')}
               style={{width: 20, height: 20}}
        />
      ),
    },
  },
  MimeExample: {
    screen: MimeExample,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({focused}) => (
        <Image resizeMode='contain' source={focused ? require('./images/wmy.png') : require('./images/my.png')}
               style={{width: 20, height: 20}}
        />
      ),
    },
  },
};
const TabNavigatorConfigs = {
  initialRouteName: 'HomeScreen', // 初始显示的Tab对应的页面路由名
  tabBarComponent: TabBarTop, // Tab选项卡组件，TabBarBottom TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop
  tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有top  bottom
  lazy: true, // 是否懒加载页面
  header: null,
  tabBarOptions: {
    activeBackgroundColor: '#1884CD',
    inactiveBackgroundColor: '#000000',
    activeTintColor: '#1884CD',
    inactiveTintColor: 'black',
    indicatorStyle: {backgroundColor: 'white'},//线颜色
    style: {backgroundColor: '#FFFFFF'},
    labelStyle: {fontSize: 10, margin: 0},
    IconStyle: {margin: 0},
    showIcon: true,
    pressOpacity: 1,
    tabStyle: {
      // backgroundColor: '#0C97E2',
    },
  }, // 在属性TabBarBottom与TabBarTop中有所不同
};
const Tab = createTabNavigator(TabRouteConfigs, TabNavigatorConfigs);

const StackRouteConfigs = {
  Tab: {
    screen: Tab,
  },
  litile: {
    screen: Litile,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CodeReading: {//二维码扫描
    screen: CodeReading,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Tools: {//工器具页面
    screen: Tools,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Material: {//甲供物资页面
    screen: Material,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Personnel: {//人员统计
    screen: Personnel,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  NetWork: {
    screen: Network,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  RiskInspection: {//风险信息
    screen: RiskInspection,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Risk: {//风险巡视 (待处理)
    screen: Risk,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MaterialMsg: {//物资信息
    screen: MaterialMsg,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  AwaitTodo: {//待办事项
    screen: AwaitTodo,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  FindMsg: {//检查问题
    screen: FindMsg,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  BrightSpot: { //检查亮点
    screen: BrightSpot,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Environmental: { //环境监测
    screen: Environmental,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  EnvironData: { //环境监测 数据图
    screen: EnvironData,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateBrightSpot: { //创建亮点
    screen: CreateBrightSpot,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateTools: { //创建工器具
    screen: CreateTools,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  ToosList: {//工器具列表
    screen: ToosList,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateMaterial: {//扫码创建甲供物资
    screen: CreateMaterial,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreactCards: {
    screen: CreactCards,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CardDetail: {
    screen: CardDetail,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateFindMsg: {//创建问题
    screen: CreateFindMsg,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  AwaitTrouble: {//处理待办事项问题界面
    screen: AwaitTrouble,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateRisk: {//风险创建
    screen: CreateRisk,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  BigTools: {//大型机具
    screen: BigTools,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  BigToolsMsg: {//大型机具情况
    screen: BigToolsMsg,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Progress: {
    screen: Progress,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Retrieval: {
    screen: Retrieval,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  VoiceNavigation: {
    screen: VoiceNavigation,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  VoiceTop: {
    screen: VoiceTop,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CardList: {//二维码列表
    screen: CardList,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MaterialLuxian: {//查看物资路线
    screen: MaterialLuxian,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },

  },
  VoiceRegion: {
    screen: VoiceRegion,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Panorama: {
    screen: Panorama,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Binding: {//绑定二维码
    screen: Binding,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Dynamic: {//甲供物资动态
    screen: Dynamic,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Password: {
    screen: Password,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  RetrievalDetail: {
    screen: ReDetile,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  // UserSetting:{//用户信息设置
  //   screen:UserSetting,
  //   navigationOptions:{
  //     header:null,
  //     gesturesEnabled:true
  //   }
  // },
  Aboutus: {//关于我们
    screen: Aboutus,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MsgDetail: {
    screen: MsgDetail,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MsgBrightSpot: {//亮点详情
    screen: MsgBrightSpot,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  demoReact: {
    screen: demoReact,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  ToolsMsg: {
    screen: ToolsMsg,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  RiskDetail: {
    screen: RiskDetail,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  PicCheck: {
    screen: PicCheck,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  ManagePage: {//站班会统计
    screen: ManagePage,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Workload: {//工作量统计
    screen: Workload,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateManagePage: {//站班会创建
    screen: CreateManagePage,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MsgManagePage: {//站班会详情
    screen: MsgManagePage,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  PeopleLook: {//人员检索
    screen: PeopleLook,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MsgPeopleLook: {//人员详情
    screen: MsgPeopleLook,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CarManage: {//车辆管理
    screen: CarManage,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  GetMoney: {//佣金管理
    screen: GetMoney,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  CreateEticket: {//创建工作票
    screen: CreateEticket,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Eticket: {//创建工作票
    screen: Eticket,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  SelectMapId: {//收发货坐标选择
    screen: SelectMapId,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  BigToolsInfo: {//扫码查看机具详情
    screen: BigToolsInfo,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  MsgEticketPage:{//电子作业票详情
    screen: MsgEticketPage,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },

  }
};

const StackNavigatorConfigs = {
  initialRouteName: 'Tab',
  headerMode: 'none',
  transitionConfig: () => (
    {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(3)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;
        const Width = layout.initWidth;
        //沿X轴平移
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [Width, 0, -(Width - 10)],
        });
        //透明度
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });
        return {opacity, transform: [{translateX}]};
      },
    }
  ),
};

const Navigators = createStackNavigator(StackRouteConfigs, StackNavigatorConfigs);
const LoginPage = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Networks:{
    screen:Networks,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  }
}, {initialRouteName: 'login'});

const SwitchNav = createSwitchNavigator({
  AuthLogin: AuthLogin,
  LoginPage: LoginPage,
  App: Navigators,
  },{
    initialRouteName: 'AuthLogin',
  })

export default class App extends Component {

  componentDidMount() {
    JPushModule.notifyJSDidLoad(resultCode => {
      if (resultCode === 0) {
      }
    });
  }

  componentWillMount(){
    this.getUserInfo();
    //监听网络状态改变
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(status) {
    status.type == 'none' && ToastAndroid.show('网络已断开', ToastAndroid.SHORT);
    //监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
  }

  getUserInfo() {
    JPushModule.initPush();
    // MySorage._load('netWorkIp',async (data)=>{
    //   window.jconfig.netWorkIp=data
    // });
    MySorage._load('userinfo', async (data) => {
      if (data == null) return this.navigator.dispatch(resetAction);
      if (data.code == 'S10000') {
        window.jconfig.userinfo = data.data;
        
        window.jconfig.token = await LocalStorage.get('user:token');
        window.jconfig.projects = await LocalStorage.get('user:project');
        JPushModule.initPush();
      } else {
        MySorage._remove('userinfo');
        return this.navigator.dispatch(resetAction);
      }
    });
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  render() {
    return (<React.Fragment>
      <StatusBar backgroundColor='transparent' translucent={true}/>
      <SwitchNav />
    </React.Fragment>)
  }
}

