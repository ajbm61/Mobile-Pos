import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        dispatch(addToCart(item, item.id))
        setShowJml(true)
    }

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ marginRight: 20 }}>
                    <Image
                        style={{ width: 75, height: 75, borderRadius: 11 }}
                        source={{
                            uri: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b.jpg'
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
                {
                    (showJml == true) &&
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => dispatch(subtractQuantity(dataProduk, dataProduk.id_produk))}
                                style={{ paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#43AB4A' }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>-</Text>
                            </TouchableOpacity>
                            <View style={{ padding: 1, marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 16, color: '#515151' }}>9</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => dispatch(addQuantity(dataProduk, dataProduk.id_produk))}
                                style={{ paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#43AB4A' }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>+</Text>
                            </TouchableOpacity>
                        </View>
                }
                <TouchableOpacity onPress={() => btnAdd(dataProduk)} style={[showJml == true ? styles.btnRemove : styles.btnAdd]}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{showJml == true ? 'Remove' : 'Add'}</Text>
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
        paddingVertical: 5
    },
    btnRemove: {
        backgroundColor: '#F48024',
        width: 100,
        borderRadius: 5,
        paddingVertical: 5
    },
});