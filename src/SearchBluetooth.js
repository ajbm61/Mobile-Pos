import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createTableConfigBluetooth, updateBluetooth, readConfig } from './model/Config'

export default function MenuTop() {

    const [listPrinter, setListPrinter] = useState([])
    const [selectedPrinter, setSelectedPrinter] = useState([])

    useEffect(() => {
        readConfig(2)
            .then((res) => {
                let item = JSON.parse(res.result.CONTENT)
                setSelectedPrinter(item)
                console.log(item)
            })
    }, [])    

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
        }, (err) => {
            console.log(err)
        });
    }

    const chooseBluetooth = (item) => {

        createTableConfigBluetooth()

        let data = {
            name: item.name,
            address: item.address
        }

        let myObjStr = JSON.stringify(data);

        updateBluetooth(myObjStr)
        setSelectedPrinter(data)
        
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Text>Selected Device</Text>
                </View>            
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#43AB4A', padding: 10 }}>
                        <Text>{selectedPrinter.name}</Text>
                        <Text>{selectedPrinter.address}</Text>
                    </TouchableOpacity>
                </View>
                {
                    (listPrinter.length > 0) &&
                        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                            <Text>Available Devices</Text>
                        </View>
                }
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    {/* Looping */}
                    {
                        listPrinter.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => chooseBluetooth(item)} key={`printer-${index}`} style={{ backgroundColor: 'white', padding: 10 }}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.address}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {/* Looping */}
                </View>                
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