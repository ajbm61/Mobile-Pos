import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { createTableConfig, updateConfig } from './model/Config'

export default function Config() {

    const [namaToko, setNamaToko] = useState('')
    const [alamat, setAlamat] = useState('')
    const [deskripsi, setDeskripsi] = useState('')

    const saveConfig = () => {

        createTableConfig()

        var myObj = {
            namaToko: namaToko,
            alamatToko: alamat,
            deskripsiToko: deskripsi
        };

        let myObjStr = JSON.stringify(myObj);
        
        updateConfig(myObjStr)

    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <KeyboardAwareScrollView>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <View>
                        <Text style={{fontSize: 18, marginBottom: 5}}>Nama Toko/Usaha</Text>
                        <TextInput onChangeText={(text) => setNamaToko(text)} style={{backgroundColor: '#FFF', borderWidth: StyleSheet.hairlineWidth}} />
                    </View>
                    <View>
                        <Text style={{fontSize: 18, marginBottom: 5}}>Alamat Toko/Usaha</Text>
                        <TextInput onChangeText={(text) => setAlamat(text)} style={{backgroundColor: '#FFF', borderWidth: StyleSheet.hairlineWidth}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 18, marginBottom: 5}}>Deskripsi di Akhir Struk Pembelian</Text>
                        <TextInput onChangeText={(text) => setDeskripsi(text)} multiline style={{ backgroundColor: '#FFF', height: 100, textAlignVertical: 'top', borderWidth: StyleSheet.hairlineWidth}} />
                    </View>
                    <View style={{backgroundColor: '#F0ECD2', padding: 10}}>
                        <Text style={{fontSize: 14}}>Data diatas akan ditampilan di setiap kali mencetak struk.</Text>
                    </View>
                    <View></View>
                </View>
                <View>
                    <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                        <TouchableOpacity
                            onPress={() => saveConfig()}
                            style={{ backgroundColor: '#43AB4A', marginHorizontal: 10, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Ionicons name="save-outline" size={20} color="#FFF" style={{}} />
                            <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>Save Setting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}