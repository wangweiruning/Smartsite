# Smartsite
智慧工地APP，国家级项目


智慧工地APP项目开发过程总结

1首先需求不明确
2PSD不完整
3工作分配方案不完善
4技术水平不全面

开发框架 react-native
版本@0.55.4

使用到的插件：
antd-mobile-rn  antd ui框架

消息推送
jcore-react-native
jpush-react-native

native-echarts 图表插件echarts（制作扇形图、折线图、饼状图）
存在的问题：
      在模拟器上面调试时图表可以加载出来，但是APP打包之后加载不出来
解决方法：
      将native-echarts里面的node_modules\native-echarts\src\components\Echarts\tpl.html提出来，放在android\app\src\main\assets文件夹里面
并且修改node_modules\native-echarts\src\components\Echarts\index.js里面的图片的为：source={Platform.OS !== 'ios'?{uri:'file:///android_asset/tpl.html'}:require('./tpl.html')}；
从新打包就可以显示出来了

react-native-camera相机调用
react-native-image-picker相册调用
存在问题：ImagePickerManager.showImagePicker
解决方案：
https://github.com/react-native-community/react-native-image-picker/issues/815


react-native-datepicker 时间选择插件 

react-native-device-info获取设备信息（主要获取app版本）
react-native-http-cache缓存
react-native-linear-gradient设置渐变的插件
react-native-qr-scanner二维码扫描（直接扫描+调用相册选择二维码（这个功能不靠谱：只能得到二维码的表象信息，得不到二维码所包含的具体意义））
react-native-select-dialog弹框选择组件
react-native-sound声音播放插件   运行出现错误 修改react-native-sound下的build.grade 文件
dependencies {
  compileOnly 'com.facebook.react:react-native:+'
}
里的compileOnly 换成compile

react-native-storage本地存储
react-native-string-distinction字符串切割插件（关键字搜索时将关键字单独切割出来并改变关键字颜色）===其实就是将字符串切割为三段显示 
这个插件感觉还行，但是功能不全面
react-native-vector-icons图标库
react-navigation@2.17.0导航插件（新版本问题很多，最好不使用新版本）主要用于底部导航
webview的使用：
地图导航：使用高德地图（使用的是webview方式加载页面，原因：原生没有集成关于路线绘制的功能）
全景视频：https://pannellum.org/ 适用于Web的轻量级全景查看器

刷新组件（上拉加载跟多，下拉刷新）React Native Large List V3
https://bolan9999.github.io/react-native-largelist/#/zh-cn/README

工作难点：
1地图路线的实现 开始使用原生的方法，可惜不会java，搞了半天没啥用，后面采用webview方式轻松实现功能需求
2全景视频的实现 开始毫无头绪，一直在查找资料，功夫不负有心人，找到了一个可以满足需求的插件，同样通过webview轻松实现
3扫码功能（调用相册）这个真的是坑啊，调用相册扫码得到的不是真正需要的。。。无法放弃调用相册
4图表的实现（echarts不熟练）
https://echarts.baidu.com/echarts2/doc/example.html
通过这个模板慢慢匹配，最终的到了我需要的功能图表
5组件封装（基本上每一个模块都封装成了一个组件  头部导航（创建东西+二维码扫描+普通导航）、单个元素列表（左右图+左右文字+点击跳转传参、上图下文+点击跳转传参））
6关键字搜索：改变关键字的颜色
react-native-parsed-text 组件完美解决问题
目前的实现思路：以关键字为分割点、关键字前面的内容作为一部分、关键字为一部分、关键字后面的内容为一部分
单独给关键字添加颜色
7本地存储工能的实现：
在不能连接网络的情况下，将需要的数据（文字+图片）保存在本地，有网络的时候将这些数据上传

Textinput失去焦点问题：
在scollview里面需要点击两次才能失去焦点（第一次失去，第二次提交）

改变搜索文字的颜色：react-native-parsed-text   利用正则的手段匹配搜索的关键字，改变关键字的样式
http://npm.taobao.org/package/react-native-parsed-text

视频播放
音频播放

百度地图路线绘制
全景视频播放https://pannellum.org/documentation/overview/

动画库
lottie-react-native 
地址：https://www.lottiefiles.com/
随便改颜色。
地址：https://bodymovin-editor.firebaseapp.com/

热更新：react-native-code-push
https://www.jianshu.com/p/8c8fc214b977
https://www.jianshu.com/p/cbc6a1dbfe30
https://www.cnblogs.com/jackson-zhangjiang/p/9805266.html -----------  push配置
code-push release-react APP名字   android/ios --t 旧的版本号 --dev false --d Production --des "描述" --m true

code-push release-react zhihuigongdi   android --t 1.0.0 --dev false --d Production --des "app新增几个功能" --m true

打包运行
执行
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
react-native bundle --platform Android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
React-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 
 Android Studio 运行 React Native 问题： 
 https://www.cnblogs.com/marylee/p/7698640.html
    控件(2018-1最新)：http://wiki.jikexueyuan.com/project/react-native/navigator.html
    导航栏库：https://reactnavigation.org/docs/intro/quick-start

打包的生成签名文件
my-release-key.keystore
my-key-alias
wangwei

使用react-native画圆
https://segmentfault.com/a/1190000006714122

圆形进度条 组件 react-native-percentage-circle  强大的功能组件


http://m.sui.taobao.org/demos/
单页webapp开发


GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest查看请求

错误总结
react-redux  ：  _react.default.memo不是一个函数。（在'_react.default.memo（ConnectFunction）中，'_ final.default.memo'未定义）

将版本降级可解决问题



react-native插件汇总
https://www.cnblogs.com/bruce-gou/p/10030625.html




