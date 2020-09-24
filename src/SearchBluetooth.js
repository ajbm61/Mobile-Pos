import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MenuTop() {

    const [listPrinter, setListPrinter] = useState([])

    const searchPrinter = async () => {
        await BluetoothManager.enableBluetooth().then((r) => {
            var paired = [];
            if (r && r.length > 0) {
                for (var i = 0; i < r.length; i++) {
                    try {
                        paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                    } catch (e) {
                        //ignore
                    }
                }
            }
            setListPrinter(paired)
            console.log(paired)
            console.log(JSON.stringify(paired))
        }, (err) => {
            console.log(err)
        });
    }    

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{paddingHorizontal: 10, marginTop: 10}}>
                {/* Looping */}
                {
                    listPrinter.map((item, index) => {
                        return (
                            <TouchableOpacity key={`printer-${index}`} style={{ backgroundColor: 'white', padding: 10 }}>
                                <Text>{item.name}</Text>
                                <Text>{item.address}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                {/* Looping */}
            </View>
            <View>
                <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                    <TouchableOpacity
                        onPress={() => searchPrinter()}
                        style={{ backgroundColor: '#43AB4A', marginHorizontal: 10, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="print-outline" size={20} color="#FFF" style={{}} />
                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>Search Printer</Text>
                    </TouchableOpacity>
                </View>                 
            </View>         
        </View>
    )
}