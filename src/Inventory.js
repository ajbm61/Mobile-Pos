import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl, ToastAndroid, TextInput } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import foodList from './assets/produk/food'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from './redux/cartActions';
import CProduct from './component/CProduct'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { insertProduct } from './model/Product'
import { readQuery } from './model/DBQuery'

export default function ListProduct() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const [listProduct, setListProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [cartState, setCartState] = useState([])
    const [dialogShow, setDialogShow] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const [cart] = useState([])

    useEffect(() => {
        getProductFromDB()
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    function myCallback() {
        getProductFromDB()
    }

    const getProductFromDB = () => {
        readQuery("SELECT * FROM product")
            .then(res => setListProduct(res.result))        
    }

    const btnInsertProduct = () => {
        insertProduct(productName, productPrice)
        wait(700).then(() => {
            setDialogShow(false)
            getProductFromDB()
        });
    }

    const showToast = () => {
        ToastAndroid.show("Data berhasil di refresh !", ToastAndroid.SHORT);
    };    

    const onRefresh = useCallback(
        () => {
            setRefreshing(true);
            dispatch(emptyCart())
            console.log('halaman di refresh')
            wait(500).then(() => setRefreshing(false));
            getProductFromDB()
            showToast()
        },
        [],
    )

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ paddingBottom: 20 }}>
                        <TouchableOpacity onPress={() => setDialogShow(true)} style={{ backgroundColor: '#01B6AD', paddingHorizontal: 20, paddingVertical: 10}}>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>Add Product</Text>
                        </TouchableOpacity>
                        <View style={{paddingHorizontal: 20}}>
                        {/* Loop Produk */}
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <CProduct key={`key-${index}`} callbackFromParent={myCallback} dataProduk={item} dataCart={cartState} />
                                )
                            })
                        }
                        {/* Loop Produk */}
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
                            <View style={{ width: 250, paddingVertical: 10 }}>
                                <View>
                                    <Text style={{textAlign: 'center', fontSize: 21}}>Add Product</Text>
                                </View>
                                <View>
                                    <Text style={{ marginTop: 20, fontWeight: 'normal', textAlign: 'left', fontSize: 18 }}>Product Name</Text>
                                    <TextInput onChangeText={(text) => setProductName(text)} style={{ borderWidth: 0.5, width: '100%', borderRadius: 5, paddingVertical: 5 }} />
                                </View>
                                <View>
                                    <Text style={{ marginTop: 10, fontWeight: 'normal', textAlign: 'left', fontSize: 18 }}>Price</Text>
                                    <TextInput keyboardType="number-pad" onChangeText={(text) => setProductPrice(text)} style={{ borderWidth: 0.5, width: '100%', borderRadius: 5, paddingVertical: 5 }} />                                    
                                </View>
                                <TouchableOpacity onPress={() => btnInsertProduct()} style={{ backgroundColor: '#43AB4A', marginTop: 10, borderRadius: 5}}>
                                    <Text style={{ marginVertical: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </DialogContent>
                    </Dialog>                     
                </View>
            </ScrollView>             
        </>
    )

}

