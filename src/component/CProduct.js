import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { formatMoney } from '../lib/currency'
import { addQuantity, subtractQuantity, emptyCart } from '../redux/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartActions'

export default function CProduct({dataProduk, dataCart}) {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const [showJml, setShowJml] = useState(false)
    const cartState = globalState.cart

    useEffect(() => {
        console.log(dataCart)
    }, [])

    const btnAdd = (item) => {
        console.log(item)
        dispatch(addToCart(item, item.id_produk))
        showToast()
    }

    const showToast = () => {
        ToastAndroid.show("Produk berhasil ditambahkan !", ToastAndroid.SHORT);
    };    

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ marginRight: 20 }}>
                    <Image
                        style={{ width: 75, height: 75, borderRadius: 11 }}
                        source={{
                            uri: dataProduk.img
                        }} />
                </View>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 15, color: '#303030' }}>{dataProduk.nama}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 15, color: '#000' }}>Rp. {formatMoney(dataProduk.harga)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#515151' }}>{dataProduk.nama_produk}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => btnAdd(dataProduk)}>
                    <Text style={styles.btnAdd}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    btnAdd: {
        backgroundColor: '#43AB4A',
        width: 100,
        borderRadius: 5,
        paddingVertical: 5,
        textAlign: 'center', 
        color: 'white', 
        fontWeight: 'bold'
    },
    btnRemove: {
        backgroundColor: '#F48024',
        width: 100,
        borderRadius: 5,
        paddingVertical: 5
    },
});