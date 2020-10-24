import React, { useState, useEffect } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid, TextInput } from 'react-native';
import { formatMoney } from '../lib/currency'
import { addQuantity, subtractQuantity, emptyCart } from '../redux/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { addToCart } from '../redux/cartActions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateProduct, removeProduct } from '../model/Product'

export default function CProduct({dataProduk, callbackFromParent}) {

    const dispatch = useDispatch()
    const [dialogShow, setDialogShow] = useState(false)
    const [editDialogShow, setEditDialogShow] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [idProduct, setIdProduct] = useState('')
    const [itemProduct, setItemProduct] = useState([])

    useEffect(() => {
        setItemProduct(dataProduk)
    }, [])

    const btnAdd = (item) => {
        dispatch(addToCart(item, item.ID))
        setDialogShow(true)
    }

    const popUpEditShow = (item) => {
        setEditDialogShow(true)
        setProductName(item.NAME)
        setProductPrice(item.PRICE)
        setIdProduct(item.ID)
    }

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const btnRemoveProduct = () => {
        removeProduct(idProduct)
        .then((res) => {
            if(res.result == true) {
                setEditDialogShow(false)
            }
            callbackFromParent()
            })
    }

    const prosesEdit = () => {
        let dataUpdate = {
            NAME: productName,
            PRICE: productPrice,
            ID: idProduct
        }
        updateProduct(dataUpdate)
        wait(700).then(() => {
            setItemProduct(dataUpdate)
            setEditDialogShow(false)
        });
    }

    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1, borderWidth: 2 }}>
                    <TouchableOpacity onPress={() => popUpEditShow(itemProduct)} style={{ width: '68%', paddingVertical: 10, paddingLeft: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#303030' }}>{itemProduct.NAME}</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>Rp. {formatMoney(itemProduct.PRICE)}</Text>               
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => btnAdd(itemProduct)} style={{ width: 100, backgroundColor: '#3B99FB', flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{justifyContent: 'center'}}>
                            <Ionicons name="add-outline" size={30} color="#FFF" style={styles.btnAdd} />
                        </View>                             
                    </TouchableOpacity>
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

            <Dialog
                visible={editDialogShow}
                onTouchOutside={() => {
                    setEditDialogShow(false)
                }}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
            >
                <DialogContent>
                    <View style={{ width: 250, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 21 }}>Edit Product</Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 20, fontWeight: 'normal', textAlign: 'left', fontSize: 18 }}>Product Name</Text>
                            <TextInput value={productName} onChangeText={(text) => setProductName(text)} style={{ borderWidth: 0.5, width: '100%', borderRadius: 5, paddingVertical: 5 }} />
                        </View>
                        <View>
                            <Text style={{ marginTop: 10, fontWeight: 'normal', textAlign: 'left', fontSize: 18 }}>Price</Text>
                            <TextInput value={productPrice} keyboardType="number-pad" onChangeText={(text) => setProductPrice(text)} style={{ borderWidth: 0.5, width: '100%', borderRadius: 5, paddingVertical: 5 }} />
                        </View>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={() => btnRemoveProduct()} style={{ width: '45%', backgroundColor: '#F7604B', marginTop: 10, borderRadius: 5 }}>
                                <Text style={{ marginVertical: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Remove</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => prosesEdit()} style={{ width: '45%', backgroundColor: '#43AB4A', marginTop: 10, borderRadius: 5 }}>
                                <Text style={{ marginVertical: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Submit</Text>
                            </TouchableOpacity>                                                        
                        </View>
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