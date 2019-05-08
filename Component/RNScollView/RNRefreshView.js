import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    RefreshControl,
    ScrollView,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import LoadMoreFooter from './LoadMoreFooter';
class Row extends Component {
    _onClick = ()=>{
        console.log('onclick');
        this.props.onClick(this.props.data);
    };
    render(){
        return(
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={{backgroundColor: '#3a5795', borderWidth: 1, padding: 20, borderColor: 'grey', margin: 5}}>
                    <Text style={{alignSelf:'center', color:'#fff'}}>
                        {this.props.data.text + '('+ this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default  class RNRefreshView extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRefreshing: false,
            isshowAll:true,
            isLoadAll:false,
            loaded: 0,
            //使用map创建对象数组
            rowData: Array.from(new Array(20)).map((val, i)=>({
                text: 'Inital row' + i,
                clicks: 0
                })
            )
        }
    }
    //传递当前的对象，将clicks+1，刷新界面
    _onClick22 =(row)=> {
        console.log('1111' + row.text);
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    };

    //判断滚动到底部
    handleScrollEnd = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;

        console.log(scrollOffset + scrollViewHeight,"444444444444",contentHeight);

        const isEndReached = scrollOffset + scrollViewHeight+45 >= contentHeight; // 是否滑动到底部
        const isContentFillPage = contentHeight >= scrollViewHeight; // 内容高度是否大于列表高度
    
        if (isContentFillPage && isEndReached) {
          this.loadMoreData();
        }
      };
      rows=()=>{
          if(this.state.rowData){
             
            return <View>
                    {this.state.rowData.map((row, i)=>{
                         return <Row key={i} data={row} onClick={this._onClick22}/>;
                    })}
                   
                    {this.state.isshowAll&&<LoadMoreFooter isLoadAll={this.state.isLoadAll}/>}
                </View>
          }
        
      }
    render(){
        //map遍历并创建Row类,row是数组的对象，i是索引位置
        
        const rows = this.state.rowData.map((row, i)=>{
            console.log('4444' + i);
            return <Row key={i} data={row} onClick={this._onClick22}/>;
        });
        return(
            <ScrollView style={{flex: 1, backgroundColor: '#ffaaff'}}
                        onScrollEndDrag={this.handleScrollEnd} //判断是否滚动到最底部
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefreshing}
                                            progressBackgroundColor={"#ff3377"}
                                            onRefresh={this._onRefresh}
                                            tintColor="#ff0000"
                                            title="Loading..."
                                            titleColor="#00ff00"
                                            colors={['#ff0000', '#00ff00', '#0000ff']}
                                            />
                        }>
                {this.rows()}
               
            </ScrollView>
        )
    }
    loadMoreData=()=>{
        if(this.state.loaded>30)return this.setState({isLoadAll:true});
          setTimeout(()=>{
            //.concat拼接字符串，数组
            let rowData = Array.from(new Array(10)).map((val, i)=>({
                text: 'Loaded row' + (+this.state.loaded + i),
                clicks: 0
            }))
                .concat(this.state.rowData);
            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            })
        });
    }
    _onRefresh =()=>{
        this.setState({
            isRefreshing: true,
            loaded:10
        });
        //间隔5秒结束下拉刷新
        setTimeout(()=>{
            //.concat拼接字符串，数组
            let rowData = Array.from(new Array(10)).map((val, i)=>({
                text: 'Loaded row' + (+this.state.loaded + i),
                clicks: 0
            }));  
            this.setState({
                isRefreshing: false,
                rowData: rowData,
                isLoadAll:false
            })
        }, 2000);
    }
}