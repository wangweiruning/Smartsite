import React from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
const EmptyView = ({ isRefreshing, onRefresh }) => (
    <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        contentContainerStyle={styles.no_data}
        style={styles.base}
        refreshControl={
            <RefreshControl
                style={styles.refreshControlBase}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                title="加载中..."
                colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
        }>
    </ScrollView>
);

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    no_data: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
        top : '40%'
    },
    refreshControlBase: {
        backgroundColor: 'transparent'
    }
});

export default EmptyView;




