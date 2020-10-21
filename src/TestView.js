import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';

export default function TestView() {
    return (
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
            <View style={{backgroundColor: 'yellow'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Mobile Simple POS</Text>
            </View>
            <View style={{backgroundColor: 'red'}}>
                <Text>Testing</Text>
            </View>
        </View>
    )
}