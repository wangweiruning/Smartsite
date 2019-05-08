/****
 * 
 * 用户信息设置
 */

import React from 'react';
import {Text,View,Image,TouchableOpacity,TextInput,ToastAndroid,StyleSheet,ScrollView} from 'react-native';
import HeaderBar from './common/HeaderBar';
import SelectDialog from 'react-native-select-dialog';
import DatePicker from 'react-native-datepicker'
export default class UserSetting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            oldpassword:'',
            newpassword:'',
            data:[
                {name:"姓名：",key:'name',placeholder:"请填写姓名",more:1},
                {name:"身份号码：",key:'idcard',placeholder:"请填写身份号码",more:1},
                {
                    name:"性别：",
                    key:'sex',
                    placeholder:"请选择",
                    more:2,
                    data:[{txt:'男',id:'sex'},{txt:'女',id:'sex'}]
                },
                {
                    name:"学历：",
                    key:'xueli',
                    placeholder:"请选择",
                    more:2,
                    data:[{txt:'中专',id:'xueli'},{txt:'高中',id:'xueli'},{txt:'大专',id:'xueli'},{txt:'本科',id:'xueli'},{txt:'研究生',id:'xueli'},{txt:'博士及以上',id:'xueli'},]
                },
                {name:"手机号码：",key:'phone',placeholder:"请填写手机号码",more:1},
                {name:"参加工作时间：",key:'time',placeholder:"请填写参加工作时间",more:3},
                {name:"现工作单位：",key:'danwei',placeholder:"请填写现工作单位",more:1},
                {name:"工作单位注册省份：",key:'shengfen',placeholder:"请选择",
                more:2,
                data:[
                    {txt:'北京',id:'shengfen'},
                    {txt:'天津',id:'shengfen'},
                    {txt:'上海',id:'shengfen'},
                    {txt:'重庆',id:'shengfen'},
                    {txt:'河北省',id:'shengfen'},
                    {txt:'山西省',id:'shengfen'},
                    {txt:'内蒙古',id:'shengfen'},
                    {txt:'辽宁省',id:'shengfen'},
                    {txt:'吉林省',id:'shengfen'},
                    {txt:'黑龙江省',id:'shengfen'},
                    {txt:'江苏省',id:'shengfen'},
                    {txt:'浙江省',id:'shengfen'},
                    {txt:'福建省',id:'shengfen'},
                    {txt:'江西省',id:'shengfen'},
                    {txt:'山东省',id:'shengfen'},
                    {txt:'河南省',id:'shengfen'},
                    {txt:'湖北省',id:'shengfen'},
                    {txt:'湖南省',id:'shengfen'},
                    {txt:'广东省',id:'shengfen'},
                    {txt:'广西省',id:'shengfen'},
                    {txt:'海南省',id:'shengfen'},
                    {txt:'四川省',id:'shengfen'},
                    {txt:'贵州省',id:'shengfen'},
                    {txt:'云南省',id:'shengfen'},
                    {txt:'西藏',id:'shengfen'},
                    {txt:'陕西省',id:'shengfen'},
                    {txt:'甘肃省',id:'shengfen'},
                    {txt:'青海省',id:'shengfen'},
                    {txt:'宁夏',id:'shengfen'},
                    {txt:'新疆',id:'shengfen'},
                    {txt:'香港',id:'shengfen'},
                    {txt:'澳门',id:'shengfen'},
                ]},
                {
                    name:"用工属性：",
                    key:'Employment',
                    placeholder:"请选择",
                    more:2,
                    data:[
                        {txt:'正式人员',id:'Employment'},
                        {txt:'社会化用工',id:'Employment'},
                    ]
                },
                {
                    name:"人员类别：",
                    key:'Personnel',
                    placeholder:"请选择",
                    more:2,
                    data:[
                        {txt:'业主项目经理',id:'Personnel'},
                        {txt:'业主安全专责',id:'Personnel'},
                        {txt:'业主质量专责',id:'Personnel'},
                        {txt:'总监理工程师',id:'Personnel'},
                        {txt:'专业监理工程师',id:'Personnel'},
                        {txt:'安全监理工程师',id:'Personnel'},
                        {txt:'施工项目经理',id:'Personnel'},
                        {txt:'施工项目总工',id:'Personnel'},
                        {txt:'施工项目部技术员',id:'Personnel'},
                        {txt:'施工项目部安全员',id:'Personnel'},
                        {txt:'施工项目部质检员',id:'Personnel'},
                        {txt:'班长',id:'Personnel'},
                        {txt:'指挥',id:'Personnel'},
                        {txt:'班组质检员',id:'Personnel'},
                        {txt:'班组安全员',id:'Personnel'},
                        {txt:'班组技术员',id:'Personnel'},
                        {txt:'牵张机械操作手',id:'Personnel'},
                    ]
                },
                ],
                submitData:{
                    name:'',
                    idcard:"",
                    sex:'',
                    xueli:'',
                    phone:"",
                    time:"",
                    danwei:"",
                    shengfen:"",
                    Employment:"",
                    Personnel:''
                }
            
        }
    }

    submit(){
        let {submitData}=this.state;
        let {name,idcard,sex,xueli,phone,time,danwei,shengfen,Employment,Personnel}={...submitData};
        if(name&&idcard&&sex&&xueli&&phone&&time&&danwei&&shengfen&&Employment&&Personnel){
            ToastAndroid.show('信息填写成功',ToastAndroid.SHORT);
            this.props.navigation.pop()
        }else{
            ToastAndroid.show('请将信息填写完整！',ToastAndroid.SHORT);
        }
    }

    handleInput=(key,value)=>{
        this.state.submitData[key]=value;
        this.forceUpdate();
}

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }

    testBlur(key){
        this.refs[key].blur();
    }
    changList(item){
        this.state.submitData[item.id]=item.txt;
        this.state.vallistChange=true;
         this.forceUpdate();
    }
    showList(res){
            this.refs[res].show()
        
    }
    render(){ 
        console.log(this.state.submitData)
        let data = this.state.data;
        return(<View style={{width:'100%',height:"100%"}}>
            <HeaderBar parent={this} name="个人信息完善"/>  
            <ScrollView> 
            <View style={styles.main}>
            {data.map((item,indexs)=>{
                const showData = !this.state.submitData[item.key]?item.placeholder:this.state.submitData[item.key];
                return <View style={styles.netinut} key={indexs+"tt"}>
                        <Text>{item.name}</Text>
                       {item.more==1? <TextInput onEndEditing={()=>{this.testBlur(item.key)}}
                            ref={item.key} style={{width:'90%',}} 
                            onChangeText={(e)=>this.handleInput(item.key,e)} />
                        : item.more==2 ?
                        <View style={{width:'60%'}}>
                            <TouchableOpacity style={{flexDirection:'row',height:50,width:"100%"}}  
                                onPress={()=>this.showList(item.key)}
                                underlayColor="transparent">
                                <View style={styles.gongList}>
                                    <Text numberOfLines={1} 
                                        style={{width:'90%',left:5,color:showData==item.placeholder?'#AAA':"#000",fontSize:16}}>
                                        {showData} 
                                    </Text>
                                    <Image style={{width:18,height:18}} source={require('../images/setdown.png')} />
                                </View>
                        </TouchableOpacity>
                        <SelectDialog 
                            ref={item.key} 
                            titles={item.placeholder} 
                            valueChange={this.changList.bind(this)} 
                            datas={item.data}
                            animateType={'fade'}
                            positionStyle={{backgroundColor:"#1884CD"}}			  
                            />
                        </View>
                        :
                        <View style={{width:'70%'}}>
                            <DatePicker customStyles={{
                                            dateInput: {
                                            borderWidth:0,
                                            justifyContent:'center'
                                            },
                                            dateText:{
                                                color:'#000',
                                                fontSize: 16,
                                                fontWeight:'400',
                                                // left:10
                                            },
                                            placeholderText:{
                                                color:'#AAA',
                                                fontSize: 16,
                                                textAlign:'left',
                                                fontWeight:'400'
                                            }
                                    }}
                                    style={{justifyContent:'flex-start',height:40,width:'70%',alignItems:'center'}}   
                                    date={this.state.submitData[item.key]}
                                    mode="date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="确定"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    minDate={new Date(1990, 1, 1)}
                                    maxDate={new Date()}
                                    placeholder={item.placeholder}
                                    onDateChange={(value)=>this.handleInput(item.key,value)} />
                        </View>
                        }
                </View>
            })}
            </View>
            </ScrollView> 
            <View style={styles.saves}>
                    <TouchableOpacity 
                        onPress={()=>this.submit()} 
                        style={styles.saveItem}>
                        <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>保存个人信息</Text>
                    </TouchableOpacity>
                </View>
        </View>)
    }

}

const styles = StyleSheet.create({
main:{
    marginTop:10,
    width:'95%',
    backgroundColor:'white',
    justifyContent:"center",
    alignItems:'center',
    borderRadius:5,
},
network:{
    height:50,
    width:'100%',
    borderBottomColor:'grey',
    borderStyle:'solid',
    borderBottomWidth:1,
    justifyContent:'center'
},
networkstyle:{
    color:'#0390e8',
    marginLeft:10,
    fontSize:18
},
netinut:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'grey',
    borderRadius:5,
    width:'96%',
    marginTop:10,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10
},
saves:{
    marginTop:10,
    width:'100%',
    borderTopColor:'grey',
    borderStyle:'solid',
    borderTopWidth:1,
    justifyContent:'flex-end',
    flexDirection:'row',
    height:50,
    alignItems:'center'
},
saveItem:{
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0390e8',
    },
    gongList:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
    },
})