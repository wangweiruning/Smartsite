/**
 * 检查问题
 * 
 */
import React from 'react';
import { Text, View, ScrollView, RefreshControl, Image, TouchableOpacity, TextInput, ToastAndroid ,StyleSheet} from 'react-native';
import MySorage from '../../api/storage';
import FindTitle from './FindTitle';
import { Tabs, Pagination, ActivityIndicator } from 'antd-mobile-rn';
import HaveNoData from '../common/HaveData';
import { checkquestion, checkquestionall, searchquestion } from '../../api/api';
import config from '../../api/serviceAPI.config'
export default class FindMsg extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      http: jconfig.netWorkIp ? jconfig.netWorkIp : config.URL,
      isFetching: false,
      isFetching1: false,
      isFetching2: false,
      token: jconfig.userinfo.token,
      bools: 1,
      progrom: [],
      progroms: [],
      progromsed: [],
      pagenow: 1,
      searchValue: 1,
      pagesnow: 1,
      daipage: 1,
      daipagesnow: 1,
      loading: true,
      havedatas:false
    }
  }

  getUserInfo() {
    MySorage._load("progrom", (data) => {
      let res = data;
      if (!res) {
        this.setState({
          progrom: []
        })
      } else {
        this.setState({
          progrom: res
        })
      }
    })
  }



   componentDidMount() {
      this.getnewdata()
  }

  getnewdata = async ()=>{
    let tts = {status:[2]};
    let tts1 = {status:[0,1]};
    let datas = await checkquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts)}`);
    let listdata = await checkquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts1)}`, this.state.token)
     
    if(datas.isSuccess()&&listdata.isSuccess()){
        this.setState({
          progroms: listdata.data.data,
          daipage: listdata.data.totalPage,
          daipagesnow: listdata.data.currentPage,
          loading: false,
          progromsed: datas.data.data,
          pagenow: datas.data.totalPage,
          pagesnow: datas.data.currentPage,
          havedatas:true
        }) 
  }else{
    this.setState({
      loading: false,
      havedatas:false
    }) 
    ToastAndroid.show('无权访问检查问题',ToastAndroid.SHORT)
  }
  }
   refreshings=async()=> {
    let tts = {status:[2]};
    let datas = await checkquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts)}`);
    this.setState({
      progromsed: datas.data.data,
      pagenow: datas.data.totalPage,
      pagesnow: datas.data.currentPage
    })
    this.tostShow(datas.code)
  }

  refreshingk() {
    this.getUserInfo()
  }

  tostShow(tpye){
    if(tpye=='S10000'){
      ToastAndroid.show('数据已刷新',ToastAndroid.SHORT)
    }else{
      ToastAndroid.show('数据加载失败',ToastAndroid.SHORT)
    }
  }
 async onRefresh(){
   let tts = {status:[0,1]};
    let listdata = await checkquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts)}`, this.state.token)
    console.log(listdata)
    this.setState({
      progroms: listdata.data.data,
      daipage: listdata.data.totalPage,
      daipagesnow: listdata.data.currentPage,
    })
    this.tostShow(listdata.code)

  }
   onChanegeTextKeyword(text) {
    this.setState({
      searchValue:text
    })
  }
  searchData=async(text,key)=>{//搜索从新获取数据
    let tts1 = {status:[0,1]};
    let tts = {status:[2]};
    if(key==1){
      
      let cd = await searchquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts)}&search=${text}`)
      this.setState({
        progromsed: cd.data.data,
        pagenow: cd.data.totalPage,
        pagesnow: cd.data.currentPage
      })
    this.tostShow(cd.code)
    }else{
      let listdata = await searchquestion(this.state.http, `projectId=5&requestType=jcwt&filters=${JSON.stringify(tts1)}&search=${text}`)
      console.log(listdata)
      this.setState({
        progroms: listdata.data.data,
        daipage: listdata.data.totalPage,
        daipagesnow: listdata.data.currentPage,
      })
      this.tostShow(listdata.code)
    }
    
  }
  async changepage(e) {
    let tts = {status:[2]};
    let keds = await checkquestion(this.state.http, `currentPage=${e}&projectId=5&requestType=jcwt&filters=${JSON.stringify(tts)}`);
    this.setState({
      progromsed: keds.data.data,
      pagesnow: keds.data.currentPage,
      pagesnow: keds.data.currentPage
    })
    this.tostShow(keds.code)
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  Dotsc(v) {
    return (<View>
      {v.map((vd, i) => <TouchableOpacity onPress={() => this.props.navigation.navigate('MsgDetail', vd)} key={i} style={{ borderBottomColor: '#999', borderBottomWidth: .5, marginBottom: 10, padding: 5 }}>
        <Text style={{ color: '#0390e8' }}>{vd.question}</Text>
        {/* <Text style={{color:'grey'}}>不合格项：{vd.unqualified}</Text> */}
        <Text style={{ color: 'grey' }}>依据：{vd.gist != null && vd.gist.name}</Text>
        <Text style={{ color: 'grey' }}>状态：{vd.status == 0 ? '待整改' : vd.status == 1 ? '整改中' : vd.status == 2 ? '已整改' : ''}</Text>
        <Text style={{ color: 'grey' }}>区域：{vd.area && vd.area.local}</Text>
        <Text style={{ color: 'grey' }}>责任人：{vd.checkMan ? vd.checkMan.realname : '暂无责任人'}</Text>
        <Text style={{ color: 'grey' }}>责任单位：{vd.checkUnit ? vd.checkUnit.name : '暂无责任单位'}</Text>
        <Text style={{ color: 'grey' }}>检查时间：{vd.checkTime}</Text>
        <Text style={{ color: 'grey' }}>整改截止时间：{vd.deadline}</Text>
        <View style={{ flexDirection: 'row', padding: 10, borderBottomColor: '#999', borderBottomWidth: .5, borderTopWidth: .5, borderTopColor: '#999', overflow: 'hidden' }}>
          {/* {vd.image.length>0 && vd.image.map((v,i)=><Image key={i} source={{uri:'http://192.168.2.3:7100'+v.path}} style={{width:90,height:60,marginRight:5}}/>)} */}
        </View>
      </TouchableOpacity>)}
    </View>)
  }

  Dotzg(v) {
    return (<View>
      {v.map((vd, i) => <TouchableOpacity key={i} style={{ marginLeft: '2%', width: '96%', backgroundColor: "white", borderRadius: 5, marginBottom: 10, padding: 5 }}>
        <Text style={{ color: '#0390e8', fontSize: 16, borderBottomColor: '#eee', borderBottomWidth: .5 }}>{vd.question}</Text>
        <Text style={{ color: 'grey' }}>依据：{vd.gist != null && vd.gist.name}</Text>
        <Text style={{ color: 'grey' }}>状态：{vd.status == 0 ? '待整改' : vd.status == 1 ? '整改中' : vd.status == 2 ? '已整改' : ''}</Text>
        <Text style={{ color: 'grey' }}>区域：{vd.area && vd.area.local}</Text>
        <Text style={{ color: 'grey' }}>责任人：{vd.checkMan ? vd.checkMan.realname : '暂无责任人'}</Text>
        <Text style={{ color: 'grey' }}>责任单位：{vd.checkUnit ? vd.checkUnit.name : '暂无责任单位'}</Text>
        <Text style={{ color: 'grey' }}>检查时间：{vd.checkTime}</Text>
        <Text style={{ color: 'grey' }}>整改截止时间：{vd.deadline}</Text>
        <View style={{ flexDirection: 'row', padding: 10, overflow: 'hidden' }}>
          {vd.attachs.length > 0 && vd.attachs.map((v, i) => <Image key={i} source={{ uri: this.state.http + v.path }} style={{ width: 90, height: 60, marginRight: 5 }} />)}
        </View>
      </TouchableOpacity>)}
    </View>)
  }

  Dotwc(v) {
    return (<View>
      {v.map((vd, i) => <TouchableOpacity onPress={() => this.props.navigation.navigate('MsgDetail', vd)} key={i} style={{ marginLeft: '2%', width: '96%', backgroundColor: "white", borderRadius: 5, marginBottom: 10, padding: 5 }}>
        <Text style={{ color: '#0390e8', fontSize: 16, borderBottomColor: '#eee', borderBottomWidth: .5 }}>{vd.question}</Text>
        {/* <Text style={{color:'grey'}}>不合格项：{vd.unqualified}</Text> */}
        <Text style={{ color: 'grey' }}>依据：{vd.gist != null && vd.gist.name}</Text>
        <Text style={{ color: 'grey' }}>状态：{vd.status == 0 ? '待整改' : vd.status == 1 ? '整改中' : vd.status == 2 ? '已整改' : ''}</Text>
        <Text style={{ color: 'grey' }}>区域：{vd.area && vd.area.local}</Text>
        <Text style={{ color: 'grey' }}>责任人：{vd.checkMan ? vd.checkMan.realname : '暂无责任人'}</Text>
        <Text style={{ color: 'grey' }}>责任单位：{vd.checkUnit ? vd.checkUnit.name : '暂无责任单位'}</Text>
        <Text style={{ color: 'grey' }}>检查时间：{vd.checkTime}</Text>
        <Text style={{ color: 'grey' }}>整改截止时间：{vd.deadline}</Text>
        <View style={{ flexDirection: 'row', padding: 10, overflow: 'hidden' }}>
          {vd.attachs.length > 0 && vd.attachs.map((v, i) => <Image key={i} source={{ uri: this.state.http + v.path }} style={{ width: 90, height: 60, marginRight: 5 }} />)}
        </View>
      </TouchableOpacity>)}
    </View>)
  }

  render() {
    const tabs = [
      { title: '已整改' },
      { title: '待整改' },
      { title: '未上传' }
    ];
    const { isFetching, progrom, progroms, progromsed,loading,havedatas} = this.state;
    return (<View style={{ backgroundColor: 'white', flex: 1 }}>
      <FindTitle name='检查问题' parent={this} rightRouteTo={'CreateFindMsg'} haveRoute={true} haveSearch={false} />
      <View style={{ flex: 1 }}>
        <Tabs tabs={tabs} swipeable={false}>
          <View style={{ flex: 1, backgroundColor: '#eee' }}>
            {
              loading && <View style={{ top: "-6%", justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
                <ActivityIndicator color="#363434" />
                <Text style={{ color: '#363434', fontSize: 15, marginTop: 15, zIndex: 1000000 }}>加载中...</Text>
              </View>
            }
           
               <View style={styles.searchView}> 
                        <TextInput underlineColorAndroid={'transparent'} 
                            multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                            style={styles.searchInput} placeholder="请输入关键字"/>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={()=>this.searchData(this.state.searchValue,1)}>
                            <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                        </TouchableOpacity>
                  </View>
            
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => this.refreshings()}
                colors={['#11A6FF']}
              />}>
              <View style={{ flex: 1, alignContent: 'center', marginTop: 10 }}>
                {progromsed.length == 0 ? <HaveNoData /> : this.Dotwc(progromsed)}
              </View>
            </ScrollView>
            {havedatas&&<Pagination total={this.state.pagenow} current={this.state.pagesnow} onChange={(e) => this.changepage(e)} />}
          </View>
          <View style={{ flex: 1, backgroundColor: '#eee' }}>
          <View style={styles.searchView}> 
                        <TextInput underlineColorAndroid={'transparent'} 
                            multiline={true} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                            style={styles.searchInput} placeholder="请输入关键字"/>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={()=>this.searchData(this.state.searchValue,2)}>
                            <Image source={require('../../images/finding.png')} style={{width:20,height:20,right:0}}/>
                        </TouchableOpacity>
                  </View>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => this.onRefresh(isFetching)}
                colors={['#11A6FF']}
              />}>
              <View style={{ flex: 1, alignContent: 'center', marginTop: 10 }}>
                {progroms.length == 0 ? <HaveNoData /> : this.Dotzg(progroms)}
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 1, backgroundColor: '#eee' }}>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => this.refreshingk()}
                colors={['#11A6FF']}
              />}>
              {progrom.length == 0 ? <HaveNoData /> : this.Dotsc(progrom)}
            </ScrollView>
          </View>
        </Tabs>
      </View>
    </View>)
  }
}

//   https://blog.csdn.net/z93701081/article/details/83587175
//   上传图片


const styles = StyleSheet.create({
  searchView:{
     marginTop:10,
     marginBottom:10,
     backgroundColor:'#fff',
     flexDirection:'row',
     alignItems:'center',
     height:40,
     paddingLeft:20,
     paddingRight:20,
     borderRadius:20
 },
 searchInput:{
     fontSize:13, 
     color: '#363434',
     overflow:'hidden',
     width:'95%',
     height:40,
     padding:0
 },
})