import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { ItemComponent } from './ItemComponent';
import { ImageCard } from '../types';
import { toJS } from 'mobx';

const listComponentStyle = StyleSheet.create({
    spinner:{
        margin: 32,
    },
    listEmptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    listEmptyText: {
        textAlign: 'center',
        color: '#FFF',
    },
    listEndContainer:{alignItems: 'center', height: 50, padding: 16},
    listEndText: {
        color: '#FFF',
    },
});

type ListComponentProps = {
    itemsList: Array<ImageCard>,
    onRefresh: () => void,
    isLoaded: boolean,
    isLoading: boolean,
    isLoadingMore: boolean,
    isListEnd: boolean,
    onLoadMore: () => void,
    onItemPress: (item: ImageCard) => void,
    renderHeader: React.FC,
    imagesPerRow: number
}

export const ListComponent = ({
    itemsList,
    onRefresh,
    isLoaded,
    isLoading,
    isLoadingMore,
    isListEnd,
    onLoadMore,
    onItemPress,
    imagesPerRow,
    renderHeader,
    }:ListComponentProps) => {

        let onEndReachedCalledDuringMomentum: boolean = true;
        const blockEndReachedEvent = () => {
            onEndReachedCalledDuringMomentum = false;
        };
        const unblockEndReachedEvent = () => {
            onEndReachedCalledDuringMomentum = true;
        };



       const handleEndReached = () => {
            if (!onEndReachedCalledDuringMomentum) {
                onLoadMore();
                unblockEndReachedEvent();
            }
        };

        const emptyListView = () => {
            if (!isLoaded || isLoaded === null) {
                return null;
            }

            return (
                <View style={listComponentStyle.listEmptyContainer}>
                    <Text style={listComponentStyle.listEmptyText}>Пусто</Text>
                </View>
            );
        };

       const loadMoreView = () => {
            if (!isListEnd) {
                return isLoadingMore
                    && <ActivityIndicator animating style={listComponentStyle.spinner} />;
            }
            return <View style={listComponentStyle.listEndContainer}>
                         <Text style={listComponentStyle.listEndText}>Конец</Text>
                    </View>;
        };
console.log(itemsList.length);
    return <FlatList
        key={imagesPerRow}
        data={itemsList}
        stickyHeaderHiddenOnScroll
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <ItemComponent imagesPerRow={imagesPerRow} onItemPress={onItemPress} item={toJS(item)} />}
        refreshing={isLoading}
        onEndReached={handleEndReached}
        ListFooterComponent={loadMoreView}
        ListHeaderComponent={renderHeader}
        onRefresh={onRefresh}
        removeClippedSubviews
        ListEmptyComponent={emptyListView}
        showsVerticalScrollIndicator
        numColumns={imagesPerRow}
        windowSize={12}
        maxToRenderPerBatch={35}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={blockEndReachedEvent}
   />;
};
