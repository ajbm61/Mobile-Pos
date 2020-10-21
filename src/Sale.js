import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl, ToastAndroid, Alert } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import { formatMoney } from './lib/currency'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { emptyCart } from './redux/cartActions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';
import { insertProductSold } from './model/Product'
import { readConfig } from './model/Config'

export default function ListProduct() {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state);
    const [listProduct, setListProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [cartState, setCartState] = useState([])
    const [dataCart, setDataCart] = useState([])
    const [total, setTotal] = useState([])
    const [selectedPrinter, setSelectedPrinter] = useState([])
    const cart = globalState.cart.cartItem;
    const isFocused = useIsFocused()

    var db = openDatabase({ name: 'UserDatabase.db' });

    useEffect(() => {
        setDataCart(cart)
        setTotal(globalState.cart.total)      
    }, [isFocused]);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const checkOutPage = async () => {
        console.log(cart)
        await setDataCart(cart)
        await setTotal(globalState.cart.total)
    }

    const showToast = () => {
        ToastAndroid.show("Data berhasil di refresh !", ToastAndroid.SHORT);
    };    

    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
    }
    
    const cetakPrint = async () => {

        dataCart.map((item, index) => {
            insertProductSold(item.NAME, item.quantity, item.PRICE)
        })

        let bluNameResponse = await readConfig(2)
        let bluName = JSON.parse(bluNameResponse.result.CONTENT)

        let resToko = await readConfig(1)
        let tokoDetail = JSON.parse(resToko.result.CONTENT)

        try {
            await BluetoothManager.connect(bluName.address) // the device address scanned.
                .then(async (s) => {
                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                    await BluetoothEscposPrinter.printText(`${tokoDetail.namaToko}\n\r`, {});
                    await BluetoothEscposPrinter.printText(`${tokoDetail.alamatToko}\n\r`, {});
                    await BluetoothEscposPrinter.printText("Tgl：" + getCurrentDate() + "\n\r", {});
                    await BluetoothEscposPrinter.printText("\n\r", {});
                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                    dataCart.map(async (item, index) => {
                        await BluetoothEscposPrinter.printText(item.NAME + " x " + item.quantity + " : Rp. " + formatMoney(item.PRICE) + "\n\r", {});
                    })
                    await BluetoothEscposPrinter.printText("\n\r\n\r", {});
                    await BluetoothEscposPrinter.printText("Total : Rp. " + formatMoney(total) + "\n\r", {});
                    await BluetoothEscposPrinter.printText("\n\r\n\r", {});
                    await BluetoothEscposPrinter.printText(`${tokoDetail.deskripsiToko}\n\r`, {});
                    await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {});
                })            
        } catch (error) {
            Alert.alert(
                'Info', 
                'Konfigurasi Toko atau Bluetooth belum di setting dan pastikan Perangkat Printer Kasir anda menyala',
                [
                    { text: 'Setting Toko', onPress: () => navigation.navigate('Config') },
                    { text: 'Setting Bluetooth', onPress: () => navigation.navigate('SearchBluetooth') }
                ],                
            )
            return false
        }
            
        await dispatch(emptyCart())
        await checkOutPage()
        await setDataCart(cart)
        await setTotal(globalState.cart.total)        
    }    

    const onRefresh = useCallback(
        async () => {
            await setRefreshing(true);
            await dispatch(emptyCart())
            console.log('halaman di refresh')
            wait(500).then(() => setRefreshing(false));
            showToast()
        },
        [],
    )

    const emptyPage = () => {
        dispatch(emptyCart())
        setDataCart(cart)
        setTotal(globalState.cart.total)    
        wait(500).then(() => showToast());
    }

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row'}}>
                            <Ionicons name="pricetags-outline" size={20} color="#000" style={{marginTop: 10, marginRight: 10}} />
                            <Text style={{fontWeight: 'bold', fontSize: 28}}>Total</Text>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{formatMoney(total)}</Text>
                        </View>
                    </View>
                    <Grid>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Name</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Quantity</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Unit Price</Text>
                        </Col>                        
                    </Grid>
                    {
                        dataCart.length == 0 ? <View></View> : 
                            dataCart.map((item, index) => {
                                return (
                                    <Grid key={`product-${item.ID}`}>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{item.NAME}</Text>
                                        </Col>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{item.quantity}</Text>
                                        </Col>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{formatMoney(item.PRICE)}</Text>
                                        </Col>
                                    </Grid>                                    
                                )
                            })                         
                    }
                       
                </View>
            </ScrollView>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => emptyPage()}
                    style={{ backgroundColor: '#E74145', width: '45%', marginHorizontal: 10, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Ionicons name="search-circle-outline" size={20} color="#FFF" style={{}} />
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => cetakPrint()}
                    style={{ backgroundColor: '#43AB4A', width: '45%', marginHorizontal: 10, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Ionicons name="print-outline" size={20} color="#FFF" style={{ }} />
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>Print</Text>
                </TouchableOpacity>
            </View>                
        </>
    )

}

