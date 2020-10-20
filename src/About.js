import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';

export default function About() {
    return (
        <View>
            <View style={{marginHorizontal: 10, marginTop: 50}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>Mobile Simple POS</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={{height: 64, width: 64, justifyContent: 'center'}} source={require('./assets/img/logo-mobile-simple-pos.png')} />
            </View>
            <View style={{marginHorizontal: 10, marginTop: 20}}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Adalah sebuah aplikasi yang dapat memudahkan para pelaku usaha dalam melakukan pencatatan penjualan produk mereka dan mencetak ke dalam struk printer.</Text>
            </View>
        </View>
    )
}