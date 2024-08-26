import React, { useEffect } from 'react';
import { Modal, SafeAreaView, Image, StyleSheet, TouchableWithoutFeedback, View, Button, Text} from 'react-native';
import gallery from '../store/Gallery';
import { observer } from 'mobx-react-lite';
import { ListComponent } from '../components/ListComponent';
import { toJS } from 'mobx';

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

    const {page,
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

 console.log(page,isListEnd);

    const isFullScreenModalVisible = Boolean(activeImage);

    const selectSize = () => {
            return <View style={mainScreenStyle.row}>
                <Button title="1" onPress={()=> setImagesPerRow(1)}/>
                <Button title="2" onPress={()=> setImagesPerRow(2)}/>
                <Button title="3" onPress={()=> setImagesPerRow(3)}/>
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
        <Modal animationType="slide" visible={isFullScreenModalVisible} >
            <TouchableWithoutFeedback
                style={mainScreenStyle.fullScreen}
                onPress={clearActiveImage}
                onAccessibilityEscape={clearActiveImage}
                onAccessibilityAction={(e)=> console.log(e)}
            >
       <Image source={{uri: activeImage?.image}}
            resizeMethod="resize"
            resizeMode="contain"
            style={[mainScreenStyle.image, mainScreenStyle.background]} />

            </TouchableWithoutFeedback>
        </Modal>
    </SafeAreaView>;
});

export default MainScreen;
