import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5527438852236897/4889867041';

export default function TestView() {
    return (
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
            <View style={{backgroundColor: 'yellow'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Mobile Simple POS</Text>
            </View>
            <View style={{backgroundColor: 'red'}}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    )
}