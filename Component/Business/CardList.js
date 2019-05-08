/**
 * 
 * 二维码列表
 */
import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, ToastAndroid, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import HeaderBar from '../common/HeaderBar';
import { Tabs, ActivityIndicator, Pagination } from 'antd-mobile-rn';
import { getqrlist, BindingSq } from '../../api/api'
import QRCode from 'react-native-qrcode';//生成二维码
import config from '../../api/serviceAPI.config'
const locale = {
    prevText: '上一页',
    nextText: '下一页',
};
export default class CardList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            http: jconfig.netWorkIp ? jconfig.netWorkIp : config.URL,
            allData: [],
            isnolist: [],
            isyeslist: [],
            values: '',
            bools: 1,
            havenodata: true,//判断是否有未绑定数据
            pagesnow: '',
            pagesnow1: '',
            pagenow: '',
            pagenow1: '',
        };
    }

    componentDidMount() {//从下一个页面返回重新请求数据

        this.getdata('', 1)
        this.getdatanew('',1)
        this.viewDidAppear = this.props.navigation.addListener(
            'willFocus', async (obj) => {
                this.getdata('');
                this.getdatanew('',1)
                this.setState({
                    bools: this.state.bools + 1,
                })

            }
        );
    }

    async getdata(v, tt = 1) {

        let data = `currentPage=${tt}&pageSize=10&projectid=5&isBind=false&searchValue=${v}`

        let getdata = await getqrlist(this.state.http, data);//获取未绑定二维码
        let isnolist = getdata.data.data;
        this.setState({
            isnolist,
            pagesnow1: getdata.data.currentPage,
            pagenow1: getdata.data.totalPage,
            havenodata: false,
            values:''
        })
    }
    async getdatanew(v, tt = 1) {
        let data1 = `currentPage=${tt}&pageSize=10&projectid=5&isBind=true&searchValue=${v}`
        let bandingdata = await getqrlist(this.state.http, data1);//获取绑定二维码
        let isyeslist = bandingdata.data.data;
        this.setState({
            isyeslist,
            pagesnow: bandingdata.data.currentPage,
            pagenow: bandingdata.data.totalPage,
            havenodata: false,
            values:''
        })
    }
    setVales = (e) => {
        this.setState({ values: e })
    }
    searchData = () => {
        let { values } = this.state;
        this.getdata(values, 1)
        ToastAndroid.show(`数据已更新`, ToastAndroid.SHORT)
    }
    searchDatanew=()=>{
        let { values } = this.state;
        this.getdatanew(values, 1)
        ToastAndroid.show(`数据已更新`, ToastAndroid.SHORT)
    }
    gotoBind = (item) => {//前往绑定
        this.props.navigation.navigate('Binding', { data: item });
    }
    Unbinding = (item) => {//解除绑定
        Alert.alert(
            '提示', '确定解除二维码绑定？',
            [{ text: '否', onPress: this.opntion2Selected },
            { text: '是', onPress: () => this.removeCard(item) }
            ], { cancelable: false }
        );
    }

    removeCard = async (item) => {
        //解除绑定之后从新获取新的数据

        let removeDate = await BindingSq(this.state.http, { otherid: item.otherid, token: item.token, isBind: false, type: item.type });
        if (removeDate.code == 'S10000') {
            this.getdata('',1);
            this.getdatanew('',1);//重新获取数据
            ToastAndroid.show(`二维码解除绑定成功`, ToastAndroid.SHORT)

        } else {

            ToastAndroid.show(`解除绑定失败`, ToastAndroid.SHORT)

        }
    }
    render() {
        let { isnolist, isyeslist } = this.state;
        let tabs = [
            { title: '未绑定' },
            { title: '已绑定' }];

        return (<View style={{ flex: 1, }}>
            <HeaderBar parent={this} name="二维码列表" />
            <Tabs tabs={tabs} swipeable={false}>
                <View style={styles.style}>
                    {isnolist.length == 0 && this.state.havenodata && <View style={{ top: "-6%", justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
                        <ActivityIndicator color="#363434" />
                        <Text style={{ color: '#363434', fontSize: 15, marginTop: 15, zIndex: 1000000 }}>加载中...</Text>
                    </View>}
                    {/* 搜索功能 */}

                    {isnolist.length > 0 && <View>
                        <View style={styles.searchView}>
                            <TextInput underlineColorAndroid={'transparent'}
                                multiline={true} autoFocus={false} onChangeText={(e) => this.setVales(e)}
                                style={styles.searchInput} placeholder="请输入二维码编号" />
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={() => this.searchData()}>
                                <Image source={require('../../images/finding.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {isnolist.length > 0 && isnolist.map((item, index) => {
                                return <View style={styles.carditem} key={index + 1}>
                                    <View style={{ height: 80, flexDirection: 'column', width: "25%" }}>
                                        <QRCode
                                            value={item.token}
                                            size={80}
                                            bgColor='black'
                                            fgColor='white' />

                                    </View>
                                    <View style={{ height: 80, flexDirection: 'column', justifyContent: 'flex-start', width: "60%" }}>
                                        <Text style={{ color: "#000" }}>物资名称:{item.tool != null ? item.tool.name : '暂无'}</Text>
                                        <Text>二维码编号:</Text>
                                        <Text>{item.token}</Text>
                                        <Text>状态:{item.isBind == 1 ? "已绑定 " : "未绑定"}</Text>
                                    </View>
                                    <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', width: "15%", alignItems: 'center' }}>
                                        <TouchableOpacity activeOpacity={0.5} style={styles.bangding}
                                            onPress={() => this.gotoBind(item)}>
                                            <Text style={{ color: "#FFF" }}>绑定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            })}

                        </ScrollView>
                        <Pagination total={this.state.pagenow1}
                            current={this.state.pagesnow1}
                            locale={locale}
                            onChange={(e) => this.getdata('', e)} />
                    </View>}
                </View>

                <View style={styles.style}>

                    {isyeslist.length == 0 && this.state.havenodata && <View style={{ top: "-6%", justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
                        <ActivityIndicator color="#363434" />
                        <Text style={{ color: '#363434', fontSize: 15, marginTop: 15, zIndex: 1000000 }}>加载中...</Text>
                    </View>}
                    {isyeslist.length > 0 && <View>
                        <View style={styles.searchView}>
                            <TextInput underlineColorAndroid={'transparent'}
                                multiline={true} autoFocus={false} onChangeText={(e) => this.setVales(e)}
                                style={styles.searchInput} placeholder="请输入二维码编号" />
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={() => this.searchDatanew()}>
                                <Image source={require('../../images/finding.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView >
                            {isyeslist.length > 0 && isyeslist.map((item, index) => {
                                return <View style={styles.carditem} key={index + 1}>
                                    <View style={{ height: 80, flexDirection: 'column', width: "25%" }}>
                                        <QRCode
                                            value={item.token}
                                            size={80}
                                            bgColor='black'
                                            fgColor='white' />
                                    </View>
                                    <View style={{ height: 80, flexDirection: 'column', justifyContent: 'flex-start', width: "60%" }}>
                                        <Text style={{ color: "#000" }}>物资名称:{item.tool != null ? item.tool.name : '暂无'}</Text>
                                        <Text>二维码编号:</Text>
                                        <Text>{item.token}</Text>
                                        <Text>状态:{item.isBind == 1 ? '已绑定' : "未绑定"}</Text>
                                    </View>
                                    <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-between', width: "15%", alignItems: 'center' }}>
                                        <TouchableOpacity activeOpacity={0.5} style={styles.bangding}
                                            onPress={() => this.Unbinding(item)}>
                                            <Text style={{ color: "#FFF" }}>解绑</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            })}
                        </ScrollView>
                        <Pagination total={this.state.pagenow}
                            current={this.state.pagesnow}
                            locale={locale}
                            onChange={(e) => this.this.getdatanew('', e)} />
                    </View>}
                </View>
            </Tabs>

        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        marginTop: 10

    },
    searchView: {
        marginTop: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20
    },
    searchInput: {
        fontSize: 13,
        color: '#363434',
        overflow: 'hidden',
        width: '95%',
        height: 40,
        padding: 0
    },
    toolsList: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    carditem: {
        padding: 15,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF",
        borderBottomColor: "#eee",
        borderBottomWidth: 5,
        borderStyle: 'solid'
    },
    style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',

    },
    bangding: { width: 50, height: 50, borderRadius: 50, backgroundColor: "#11A6FF", justifyContent: 'center', alignItems: 'center' }
})