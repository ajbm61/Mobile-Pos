import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, Image, View, Text, TextInput, ToastAndroid, ScrollView, StyleSheet } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import foodList from './assets/produk/food'
import { addQuantity, subtractQuantity, emptyCart } from './redux/cartActions';
import { addActiveProduct } from './redux/userActions';
import { formatMoney } from './lib/currency'
import { addToCart } from './redux/cartActions'
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveId } from './lib/helper'

export default function ListProduct() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);  
    const [listProduct, setListProduct] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [showJml, setShowJml] = useState(false)
    const [activeId, setactiveId] = useState([])
    const [arrayId, setArrayId] = useState([])
    const [cart, setCart] = useState([])
    const cartState = globalState.cart.cartItem; 

    useEffect(() => {
        setListProduct(foodList)
        // BluetoothManager.enableBluetooth().then((r) => {
        //     var paired = [];
        //     if (r && r.length > 0) {
        //         for (var i = 0; i < r.length; i++) {
        //             try {
        //                 paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
        //             } catch (e) {
        //                 //ignore
        //             }
        //         }
        //     }
        //     console.log(JSON.stringify(paired))
        // }, (err) => {
        //     console.log(err)
        // });

        // BluetoothManager.connect('66:22:B2:87:49:91') // the device address scanned.
        //     .then((s) => {
        //         console.log(s)
        //     }, (e) => {
        //         console.log(e)
        //     })        
    }, []);  

    const cetakPrint = async () => {
        await BluetoothEscposPrinter.printText("Testing Printer coooyyy\n\r", {});        
    }

    const showMenu = () => {
        console.log(listProduct)
    }

    const btnAdd = (keyId, btnStatus, item) => {
        dispatch(addActiveProduct(item.id_produk))
        if (btnStatus) {
            removeActiveId(activeId, keyId)
            setactiveId(activeId.concat(""))
            cart.splice(keyId, 1);
        } else {
            addCart(item, item.id_produk)
            setactiveId(activeId.concat(keyId))
            setCart(cart.concat(foodList[keyId]))
        }
    }

    const addCart = (item, id) => {
        dispatch(addToCart(item, id))
    }    

    const checkOutPage = () => {
        console.log(cart)
    }
        
    const btnRemove = (keyId) => {
        removeActiveId(activeId, keyId)
    }

    const btnTes = (e) => {
        console.log(e)
    }

    return (
        <>
        <ScrollView>
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderBottomColor: '#E0E6E6', borderBottomWidth: 1, borderStyle: "dotted"}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>List Menu</Text>
                </View>
                <View style={{paddingHorizontal: 20, paddingVertical: 20}}>

                {/* Loop Produk */}
                {
                    listProduct.map((item, index) => {
                        let btnStatus = activeId.includes(index)
                        return (
                            <View key={`key-${index}`}>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <View style={{ marginRight: 20 }}>
                                        <Image
                                            style={{ width: 75, height: 75, borderRadius: 11 }}
                                            source={{
                                                uri: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b.jpg'
                                            }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#303030' }}>{index} - {item.nama}</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: '#000' }}>Rp. {formatMoney(item.harga)}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', color: '#515151' }}>{item.nama_produk}</Text>
                                        </View>
                                    </View>                                     
                                    {
                                        (activeId.includes(index)) &&
                                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => dispatch(subtractQuantity(item, item.id_produk))}
                                                style={{ paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#43AB4A' }}>
                                                <Text style={{ fontSize: 16, color: 'white' }}>-</Text>
                                            </TouchableOpacity>
                                            <View style={{ padding: 1, marginHorizontal: 10 }}>
                                                <Text style={{ fontSize: 16, color: '#515151' }}>9</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => dispatch(addQuantity(item, item.id_produk))}
                                                style={{ paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#43AB4A' }}>
                                                <Text style={{ fontSize: 16, color: 'white' }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity onPress={() => btnAdd(index, btnStatus, item)} style={[activeId.includes(index) ? styles.btnRemove : styles.btnAdd]}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{activeId.includes(index) ? 'Remove' : 'Add'}</Text>
                                    </TouchableOpacity>                               
                                </View>
                            </View>
                        )
                    })
                }
                {/* Loop Produk */}

                </View>
            </View>
        </ScrollView>
        <View style={{ backgroundColor: 'white', paddingVertical: 10 }}>
            <TouchableOpacity
                onPress={() => checkOutPage()} 
                style={{ backgroundColor: '#43AB4A', marginHorizontal: 20, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>Checkout</Text>
            </TouchableOpacity>
        </View>                
        </>
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