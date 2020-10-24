import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';

export default function HowToConnect() {

    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;


    return (
        <ScrollView>
            <View style={{ backgroundColor: 'white'}}>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10, marginTop: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10 }}>How To Connect Your Printer</Text>
                    <Text style={{fontSize: 16}}>1. Put On Your Bluetooth on your phone setting</Text>
                    <Text style={{fontSize: 16}}>2. Pair your Bluetooth Printer with your Phone</Text>
                </View>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Cara Menghubungkan Printer Bluetooth Anda</Text>
                    <Text style={{fontSize: 16}}>1. Silahkan nyalakan Bluetooth anda</Text>
                    <Text style={{fontSize: 16}}>2. Lakukan pencarian perangkat Bluetooth Printer menggunakan Handphone anda</Text>
                    <Text style={{fontSize: 16}}>3. Pilih dan cocokan/pairing perangkat Printer Bluetooth anda</Text>
                    <Text style={{fontSize: 16}}>4. Jika anda sudah melakukan pairing silahkan Klik Perangkat Printer anda</Text>
                </View>
                <View style={{backgroundColor: 'white'}}>
                    <Image resizeMode={'contain'} style={{ width: '100%' }} source={require('./assets/img/how-to-0.png')} />
                    <Image resizeMode={'contain'} style={{ width: '100%' }} source={require('./assets/img/how-to-1.png')} />
                    <Image resizeMode={'contain'} style={{ width: '100%' }} source={require('./assets/img/how-to-2.png')} />
                    <Image resizeMode={'contain'} style={{ width: '100%' }} source={require('./assets/img/how-to-3.png')} />
                </View>                
            </View>
        </ScrollView>
    )
}