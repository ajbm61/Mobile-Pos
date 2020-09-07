import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, ToastAndroid } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';

export default function ListProduct() {

    const [listProduct, setListProduct] = useState([])
    const [listOrder, setListOrder] = useState([])

    useEffect(() => {
        BluetoothManager.enableBluetooth().then((r) => {
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
            console.log(JSON.stringify(paired))
        }, (err) => {
            alert(err)
        });
    }, []);

    const cetakPrint = async () => {
        await BluetoothEscposPrinter.printText("Testing Printer coooyyy\n\r", {});        
    }

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderBottomColor: '#E0E6E6', borderBottomWidth: 1, borderStyle: "dotted"}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>List Menu</Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <View style={{flexDirection: "row"}}>
                    <View style={{marginRight: 20}}>
                        <Image
                        style={{width: 75, height: 75, borderRadius: 11}} 
                        source={{
                            uri: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b.jpg'
                        }} />
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#303030'}}>Hayam Krispi 2 Bungkus</Text>
                        <Text style={{ fontWeight: "normal", fontSize: 15, color: '#303030' }}>Hayam Krispi</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#000' }}>12.500</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={{backgroundColor: '#43AB4A', width: 100, borderRadius: 5, paddingVertical: 5}}>
                        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Add</Text>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity onPress={cetakPrint} style={{backgroundColor: '#43AB4A', marginTop: 90, width: 300, borderRadius: 5, paddingVertical: 5}}>
                        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Cetak Printer</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )

}