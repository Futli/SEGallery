import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ImageCard } from '../types';
const { width: deviceWidth } = Dimensions.get('window');



type ItemComponentProps = {
    onItemPress: (image : string) => void
    imagesPerRow: number
    item: ImageCard
}

export const ItemComponent: React.FC<ItemComponentProps> = React.memo(
    ({ onItemPress, imagesPerRow, item:{ image, id }}) => {

const itemComponentStyle = StyleSheet.create({
    image:{
        width: Math.round(deviceWidth / imagesPerRow), aspectRatio: 1,
        borderRadius: 6,
        backgroundColor: 'gray',
    },
    card: {
        padding: 2,
    },
});

    return <TouchableOpacity onPress={() => onItemPress(image)} style={itemComponentStyle.card}>
        <FastImage
            key={id}
            resizeMode={FastImage.resizeMode.cover}
            source={{uri: image, priority: FastImage.priority.normal}}
        style={itemComponentStyle.image} />

    </TouchableOpacity>;
});
