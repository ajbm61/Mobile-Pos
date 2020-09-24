import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { formatMoney } from '../lib/currency'
import { addQuantity, subtractQuantity, emptyCart } from '../redux/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { addToCart } from '../redux/cartActions'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CProduct({dataProduk, dataCart}) {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const [showJml, setShowJml] = useState(false)
    const cartState = globalState.cart
    const [dialogShow, setDialogShow] = useState(false)

    useEffect(() => {
        console.log(dataCart)
    }, [])

    const btnAdd = (item) => {
        console.log(item)
        dispatch(addToCart(item, item.id_produk))
        setDialogShow(true)
    }

    const showToast = () => {
        ToastAndroid.show("Produk berhasil ditambahkan !", ToastAndroid.SHORT);
    };

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1, borderWidth: StyleSheet.hairlineWidth, borderRadius: 5 }}>
                    <View style={{marginRight: 10, marginVertical: 5, marginLeft: 5}}>
                        <Image
                            style={{ width: 75, height: 75, borderRadius: 11 }}
                            source={{
                                uri: dataProduk.img
                            }} />
                    </View>
                    <View style={{ width: 130, marginTop: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#303030' }}>{dataProduk.nama}</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#000' }}>Rp. {formatMoney(dataProduk.harga)}</Text>               
                    </View>
                    <View style={{ width: 100, backgroundColor: '#43AB4A', flexDirection: 'row', justifyContent: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => btnAdd(dataProduk)}>
                            <Ionicons name="add-outline" size={30} color="#FFF" style={styles.btnAdd} />
                        </TouchableOpacity>                             
                    </View>
                </View>                
            </View>

            <Dialog
                visible={dialogShow}
                onTouchOutside={() => {
                    setDialogShow(false)
                }}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
            >
                <DialogContent>
                    <View style={{ width: 150, alignItems: 'center', paddingVertical: 10 }}>
                        <Image width="64" height="64" source={require('../assets/img/register-check-success.png')} />
                        <Text style={{ marginTop: 20, textAlign: 'center' }}>Produk berhasil ditambahkan ke Nota</Text>
                    </View>
                </DialogContent>
            </Dialog>             
        </View>
    )

}

const styles = StyleSheet.create({
    btnAdd: {
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