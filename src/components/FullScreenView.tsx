import React from 'react';
import { Image, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const style = StyleSheet.create({
    background: {backgroundColor: '#000'},
    fullScreen: {flex:1, justifyContent:'center', alignItems:'center'},
    image:{width: 'auto', height:'100%'},
 });

type FullScreenViewProps = {
    imageUri: string | null
    onClose: () => void
}

const FullScreenView = ({imageUri, onClose} : FullScreenViewProps) => {
    if(!imageUri) {
        return null;
    }

    return <Modal animationType="slide" visible={Boolean(imageUri)} >
            <TouchableWithoutFeedback
                style={style.fullScreen}
                onPress={onClose}
                onAccessibilityEscape={onClose}
            >
       <Image
            source={{uri: imageUri}}
            resizeMethod="resize"
            resizeMode="contain"
            style={[style.image, style.background]} />
            </TouchableWithoutFeedback>
        </Modal>;
};

export default FullScreenView;
