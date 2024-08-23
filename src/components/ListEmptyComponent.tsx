import React, { PureComponent } from 'react';

import { View } from 'react-native';

import { StyleSheet } from 'react-native';

export const simpleListEmptyStyles = StyleSheet.create({
    root: {
    },
    listPlaceholderContainer: {
        justifyContent: 'center',
        height: 52,
    },
    listPlaceholder: {
        backgroundColor: 'rgba(0,0,0, 0.07)',
        marginHorizontal: 16,
        borderRadius: 2,
        overflow: 'hidden',
        height: 16,
    },
});


const placeholdersList = ['80%', '40%', '58%', '25%', '30%', '45%', '60%', '54%', '85%', '44%', '63%', '53%'];
const placeholderOpacity = [1, 1, 1, 1, 0.9, 0.75, 0.6, 0.5, 0.45, 0.4, 0.3, 0.2, 0.1];

const SimpleListEmpty = () => {

   const handlePlaceholdersList = (list = [], opacities = [])=> {
        return list.map((widthValue, index) => (
            <View
                key={widthValue}
                style={simpleListEmptyStyles.listPlaceholderContainer}
            >
                <View style={[
                    simpleListEmptyStyles.listPlaceholder,
                    {
                        width: widthValue,
                        opacity: opacities[index] || 1,
                    },
                ]}
                />
            </View>
        ));
    };
        const list = placeholdersList.slice(0, 1);
        const opacities = placeholderOpacity.slice(0, 1);

        return (
            <View style={simpleListEmptyStyles.root}>
                {handlePlaceholdersList(list, opacities)}
            </View>
        );
    };


export default SimpleListEmpty;
