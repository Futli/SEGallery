import React, { useEffect } from 'react';
import {  SafeAreaView, StyleSheet, View, Button, Text} from 'react-native';
import gallery from '../store/Gallery';
import { observer } from 'mobx-react-lite';
import { ListComponent } from '../components/ListComponent';
import { toJS } from 'mobx';
import FullScreenView from '../components/FullScreenView';

const mainScreenStyle = StyleSheet.create({
   background: {backgroundColor: '#000'},
   fullScreen: {flex:1, justifyContent:'center', alignItems:'center'},
   image:{width: 'auto', height:'100%'},
   row: {flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'},
   text: {
        color: 'red',
        fontSize: 20,
   },
});

const MainScreen = observer(() => {

    useEffect(()=>{
        gallery.loadInit();
    },[]);

    const {
        items,
         isListEnd,
          isLoaded,
          error,
           isLoading,
            isLoadingMore,
            activeImage,
            imagesPerRow,
            setActiveImage,
            clearActiveImage,
               loadInit,
               setImagesPerRow,
                loadMore} = gallery;

    const selectSize = () => {
        const isActive = (value : number) => {
            return value === imagesPerRow ? 'green' : 'blue';
        };
            return <View style={mainScreenStyle.row}>
                <Button title="1 col" color={isActive(1)} onPress={()=> setImagesPerRow(1)}/>
                <Button title="2 cols" color={isActive(2)} onPress={()=> setImagesPerRow(2)}/>
                <Button title="3 cols" color={isActive(3)} onPress={()=> setImagesPerRow(3)}/>
            </View>;
        };

        if(error){
           return <View style={[mainScreenStyle.fullScreen, mainScreenStyle.background]}>
            <Text style={mainScreenStyle.text}>Что-то пошло не так</Text>
            <Button title={'Обновить'} onPress={loadInit} />
           </View>;
        }

    return <SafeAreaView style={mainScreenStyle.background}>
         <ListComponent
            itemsList={toJS(items)}
            isLoaded={isLoaded}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            isListEnd={isListEnd}
            renderHeader={selectSize}
            onRefresh={loadInit}
            onLoadMore={loadMore}
            imagesPerRow={imagesPerRow}
            onItemPress={setActiveImage}
        />
        <FullScreenView
        imageUri={toJS(activeImage)}
        onClose={clearActiveImage}
        />
    </SafeAreaView>;
});

export default MainScreen;
