import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import foodList from './assets/produk/food'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from './redux/cartActions';
import CProduct from './component/CProduct'

export default function ListProduct() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const [listProduct, setListProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [cartState, setCartState] = useState([])

    const [cart] = useState([])

    useEffect(() => {
        setListProduct(foodList)
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const checkOutPage = () => {
        console.log(cart)
    }

    const onRefresh = useCallback(
        () => {
            setRefreshing(true);
            dispatch(emptyCart())
            console.log('halaman di refresh')
            setCartState(globalState.cart)
            wait(2000).then(() => setRefreshing(false));
        },
        [],
    )

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>

                        {/* Loop Produk */}
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <CProduct key={`key-${index}`} dataProduk={item} dataCart={cartState} />
                                )
                            })
                        }
                        {/* Loop Produk */}

                    </View>
                </View>
            </ScrollView>
        </>
    )

}

