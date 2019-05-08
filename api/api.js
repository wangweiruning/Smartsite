
import {Requestor} from '../util/Requestor';

/****
 *
 * AjaxData  post方法
 *
 * AjaxDatas  get方法
 */

export function riskLevel(url) {
  return Requestor.get(url + `/tprisklevel/listall`);
}


export function tpriskmanager(url, data) {
  return Requestor.get(url + `/tpriskmanager/list?projectid=${data}`);
}


// 风险创建
export function tpriskinsert(url, data) {
  return Requestor.post(url + `/tpriskmanager/insert`, data);
}

//风险详情

export function tpdetails(url, data) {
  return Requestor.get(url + `/tpriskmanager/detail/${data}`);
}

//风险类型
export function risktype(url) {
  return Requestor.get(url + `/tprisktype/listall`);
}


/** 登录 */
export async function login(data) {
  return await Requestor.post('/mobile/login', data);
}

//token登录
export function loginToken(url) {
  return Requestor.post(url + `/mobile/token/login`, {});
}

//亮点类型获取
export function lightType(url, data) {
  return Requestor.get(url + '/spotins/listall?' + data);
}

//查询所有亮点
export function lightAll(url, data) {
  return Requestor.post(url + '/light/listall', data);
}

//模糊搜索查询亮点
export function lightSearch(url, data) {
  return Requestor.get(url + '/light/list?' + data);
}

//亮点上传图片
export function lightUpload(url, data) {
  return Requestor.post(url + '/light/upload', data);
}

export function questionDeta(url, data) {
  return Requestor.get(url + `/checkquestion/detail/${data}`);
}

//亮点删除图片light/delAttach
export function lightDelect(url, data) {
  return Requestor.post(url + '/light/delAttach', data);
}

//获取亮点信息
export function getImageList(url, data) {
  return Requestor.get(url + '/light/list?' + data);
}

//创建亮点
export function lightAdd(url, data) {
  return Requestor.post(url + '/light/add', data);
}

//获取所有工程project/listAll
export function projectList(url, data) {
  return Requestor.get(url + '/project/listAll?' + data);
}

//得到机构struct/list
export function structJigou(url, data) {
  return Requestor.get(url + `/struct/getDeMarc?projectid=${data}`);
}

//得到部门struct/list
export function structList(url, data) {
  return Requestor.get(url + `/struct/getDeMarc?mechanism=${data}`);
}

export function ByDePerson(url, data) {
  return Requestor.get(url + `/struct/getByDePerson?did=${data}`);
}


//问题列表---分页查询
export function checkquestionall(url, data) {
  return Requestor.get(url + `/checkquestion/list?projectId=${data}`);
}

//问题列表全部列表
export function questionlistall(url) {
  return Requestor.get(url + `/checkquestion/listall`);
}

//问题列表---参数分页查询

export function checkquestion(url, data, token) {
  return Requestor.get(url + `/checkquestion/list?` + data, token);
}

//问题搜索

export function searchquestion(url, data, data2) {
  return Requestor.get(url + `/checkquestion/list?projectId=${data}&search=${data2}`);
}

//问题提交----修改/checkquestion/update

export function questionupdate(url, data) {
  return Requestor.post(url + '/checkquestion/update', data);
}


/****
 * 工器具管理
 *  */


//工器具类型tools/listall
export function toolsTypes(url) {
  return Requestor.get(url + '/tools/listall');
}

//工器具状态列表toolstatus/listall
export function toolStatus(url, data) {
  return Requestor.get(url + '/toolstatus/listall?' + data);
}


//检查周期period/listall
export function periodList(url, data) {
  return Requestor.get(url + '/period/listall?' + data);
}

//区域选择local/listall
export function locallist(url, data) {
  return Requestor.get(url + `/local/listall?project=${data}`);
}


export function submitqus(url, data) {
  return Requestor.post(url + `/checkquestion/insert`, data);
}


export function cgins(url) {
  return Requestor.get(url + `/cgins/listcg`);
}

export function xgins(url) {
  return Requestor.get(url + `/xgins/listlookall`);
}

//完整程度 compolete/list
export function compoleteList(url, data) {
  return Requestor.get(url + '/compolete/list');
}


//疲劳施工提醒/struct/list
/*****
 * pageIndex: 1
 pageSize: 15
 projectid: 5
 searchValue:
 */

export function slist(url, data) {
  return Requestor.get(url + `/struct/list?projectid=${data}`);
}

export function structItem(url, data) {
  return Requestor.get(url + '/struct/list?' + data);
}

//获取平面图projectMap/getMapWithProjectId
export function projectMap(data) {
  return Requestor.post('/projectMap/getMapWithProjectId', data);
}

//标准管理/policycriterion/list
// currentPage: 1
// pageSize: 10

export function policycriter(url) {
  return Requestor.get(url + `/policycriterion/list`);
}

export function policycriterion(url, data) { 
  return Requestor.get(url + `/policycriterion/list?` + data);
}

//overview/list语音导航
/****
 *
 projectid: 5
 project: 5
 currentPage: 1
 pageSize: 15
 */
export function overview(url, data) {
  return Requestor.get(url + '/overview/list?' + data);
}

export function Voices(url, data) {
  return Requestor.get(url + `/local/item?id=${data}`);
}


///project/queryProject工程概况
/**
 * sorter: {}
 filters: {}
 searchValue:
 page: {"pageIndex":1,"pageSize":15}
 */
export function queryProject(url, data) {
  return Requestor.get(url + '/project/queryProject?' + data);
}


/***
 二维码绑定----获取二维码
 ****/
export function sqBind(url, data) {
  return Requestor.get(url + `/tpqrcode/query_detail/${data}`);
}


/**
 * 绑定二维码----提交绑定------待定
 * BindingSq  /tpqrcode/query_detail/
 */
export function BindingSq(url, data) {
  return Requestor.post(url + '/tpqrcode/qrcodeBindEquipment', data);
}


/**
 * 大型机具获取
 *
 */
export function BigTool(url, data) {
  return Requestor.get(url + '/machi/list?' + data);
}

//标准详情

export function pdetail(url, data) {
  return Requestor.get(url + `/policycriterion/detail/${data}`);
}

/*
**
* 获取所有工器具的名称
* toolmanagement/listall
* **/
export function getToolsNameList(url) {
  return Requestor.get(url + '/toolmanagement/listall');
}


/**
 *
 * 工器具列表查询---所有数据
 *
 */
export function getToolsList(url) {
  return Requestor.get(url + '/toolmanagement/count/byparam');
}

/**
 *
 * 工器具查询---条件查询
 * useUnitId
 */
export function getToolByparam(url, data) {
  return Requestor.get(url + '/toolmanagement/list/byparam?useUnitId=' + data);
}

/*****
 *
 * 获取具体工器具详情
 * params${id} 工器具id
 * *
 **/
export function getToolById(url, data) {
  return Requestor.get(url + `/toolmanagement/detail/${data}`);
}

/**
 *
 *二维码列表
 *tpqrcode/list
 * currentPage=1
 * pageSize=15
 * projectid=5
 * isBind=false 绑定和解除绑定
 ***/

export function getqrlist(url, data) {
  return Requestor.get(url + '/tpqrcode/list?' + data);
}


/**
 * 二维码删除
 * delete
 */
export function delectSqcode(url, data) {
  return Requestor.post(url + '/tpqrcode/list?', data);
}


/***
 * 获取工器具/大型机具
 * type：1工器具 2大型机具 3 物资信息
 * project：5工程id
 * /tpqrcode/listallnotbind
 * * */
export function getQRtools(url, data) {
  return Requestor.get(url + '/tpqrcode/listallnotbind?' + data);
}

/***
 * 添加工器具
 * toolmanagement/insert
 */

export function setTools(url, data) {
  return Requestor.post(url + '/toolmanagement/insert', data);
}

/***
 * 添加大型工具（绑定二维码）
 * machi/add
 */

export function setBigTools(url, data) {
  return Requestor.post(url + '/machi/add', data);
}

/***
 * 问题类型
 * cgins/listlook
 * ** */
export function listlook(url) {
  return Requestor.get(url + '/cgins/listlook?id=13');
}

/**
 * 人员统计  按月份统计
 * /tpinoutlog/data_month_statistics
 *
 * **/
export function data_month(url,type=0) {
  return Requestor.get(url + '/tpinoutlog/data_month_statistics?projectid=5&type='+type);
}

/**
 *
 * tpinoutlog/data_day_statistics
 * 人员统计 按天数统计
 */
export function data_day(url,type=0) {
  return Requestor.get(url + '/tpinoutlog/data_day_statistics?projectid=5&type='+type);
}


//
/****
 * 创建站班会数据
 * createManage
 * project
 * content
 * startTime
 * summary
 * videoId
 * imageId
 * participantId
 * responsePersonId
 * unit
 */
export function createManage(data) {
  return Requestor.post('/classmeeting/insert', data);
}


/****
 *
 * 获取站班会数据
 * getManageData
 * project=5&currentPage=1&pageSize=10
 * * */
export function getManageData(url, data) {
  return Requestor.get(url + '/classmeeting/list?' + data);
}

/****
 *
 * 站班会人员
 * classmeeting/listunitperson
 *
 * *** */
export function listunitperson(url, data,search) {
  return Requestor.get(url + `/classmeeting/listunitperson?id=${data}&search=${search}`);
}

/**
 * 
 * /struct/listuser
 * 人员检索
 */
export function listuser(data){
  return Requestor.get( `/struct/listuser?`+data);

}

/****
 *
 * 站班会图片、文件上传
 * classmeeting/uploadFile
 */
export function meetingupFile(url, data) {
  return Requestor.post(url + '/classmeeting/uploadFile', data);
}


/****
 * /electronicjobticket/insert
 *
 * 创建电子作业票
 * project  number  关联工程id
 ticketNumber  string  编号
 startTime  Date  开始时间
 endTime  Date  结束时间
 content  string  工序及作业内容
 position string  作业部位
 */
export function createTicket(url, data) {
  return Requestor.post(url + '/electronicjobticket/insert', data);
}

/****
 * 
 * 电子作业票图片上传
 */
export function uploadEleImage(data){
  return Requestor.post('/electronicjobticket/uploadFile',data)
}

/*****
 * /electronicjobticket/list
 * 电子票列表
 *
 */
export function eleTicket(url, data) {
  return Requestor.get(url + '/electronicjobticket/list?' + data);
}


/***
 * /apigates/list?
 * 工作量统计
 */
export function apigates(url, data) {
  return Requestor.get(url + '/gates/list?' + data);
}


/***
 * 物资添加
 Tpmaterialmanager/insert

 */

export function createTpmater(url, data) {
  return Requestor.post(url + '/tpmaterialmanager/insert', data);
}


/***
 * 物料类型
 * /matterstatic/listall
 */

export function matterstatic(url) {
  return Requestor.get(url + '/matter/listall');
}

/***
 * tpmaterialmanager/detail/
 * 物料详情
 */
export function tpmaterMsg(url, data) {
  return Requestor.get(url + `/tpmaterialmanager/detail/${data}`);
}


/***
 * /tpmaterialmanager/list
 * 物料列表
 */
export function tpmaterialList(url, data) {
  return Requestor.get(url + '/tpmaterialmanager/list?' + data);
}

/***
 * /tpmaterialmanager/listall
 * 物料列表----全部
 */
export function tpmateriallistall(url, data) {
  return Requestor.get(url + '/tpmaterialmanager/listall?' + data);
}

/****
 * /tpmaterialmanager/materialTypeStatistics
 * 物资统计图表
 *
 */

export function materialTypeStatistics(url, data) {
  return Requestor.get(url + '/tpmaterialmanager/materialTypeStatistics?' + data);
}


/***
 * datameteorological/list
 * 气象监测
 */
export function localdayMsgall(url, data) {
  return Requestor.get(url + '/datameteorological/list?' + data);
}

/***
 * 
 * /datameteorological/newest
 * 最新气象
 */

export function localdayMsgnew() {
  return Requestor.get('/datameteorological/newest');
}
/***
 * /bluetoothlabel/insert
 * 蓝牙标签创建
 *
 * labelMac  string  标签mac
 labelName  string  标签名称
 cardNumber  string  工牌编号
 unit  number  所在单位
 department  number  所在部门
 person  number  人员
 bindStatus  number  人员绑定状态 1：绑定；0：未绑定
 description  string  说明
 */

export function CreateBlueooth(url, data) {
  return Requestor.post(url + '/bluetoothlabel/insert', data);
}

/**
 * /bluetoothlabel/list
 * 蓝牙标签列表
 */
export function BluetoothList(url, data) {
  return Requestor.get(url + '/bluetoothlabel/list?' + data);
}

/**
 * /projectplanitem/list
 * 工程进度
 */
export function projectplanitem(url, token, prid) {
  return Requestor.get(url + '/projectplanitem/list', token, prid);
}

/***
 * /mproject/task/confirm
 * 工程确认完成
 *
 */
export function mprojectconfirm(url, data, token, prid) {
  return Requestor.post(url + '/mproject/task/confirm', data, token, prid);
}


/***
 * rewardpoints/list
 * 积分激励
 */
export function rewardList(data){
  return Requestor.get('/rewardpoints/list?'+data)
}
