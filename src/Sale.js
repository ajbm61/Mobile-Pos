import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import { formatMoney } from './lib/currency'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { emptyCart } from './redux/cartActions';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';

export default function ListProduct() {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const globalState = useSelector(state => state);
    const [listProduct, setListProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [cartState, setCartState] = useState([])
    const [dataCart, setDataCart] = useState([])
    const [total, setTotal] = useState([])
    const cart = globalState.cart.cartItem;

    var db = openDatabase({ name: 'UserDatabase.db' });

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

    const fetchCart = () => {

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

    const insertDB = (namaProduk, qty, price) => {
        db.transaction((txn) => {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='product_sold'", 
            [],
            (tx, res) => {
                if(res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS product_sold', [])
                    txn.executeSql('CREATE TABLE IF NOT EXISTS product_sold (ID INTEGER PRIMARY KEY NOT NULL, NAME VARCHAR(32), QTY VARCHAR(4), PRICE VARCHAR(12), TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP)', [])             
                }
                txn.executeSql('INSERT INTO product_sold (NAME, QTY, PRICE) VALUES (?, ?, ?)',
                    [namaProduk, qty, price],
                    (tx, results) => {
                        console.log("Results", results.rowsAffected)
                    })
            })
        })
    }  
    
    const cetakPrint = async () => {

        dataCart.map((item, index) => {
            insertDB(item.nama, item.quantity, item.harga)
        })

        await BluetoothManager.connect('66:22:B2:87:49:91') // the device address scanned.
            .then( async (s) => {
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.printText("RAMEN BEWOK\n\r", {});
                await BluetoothEscposPrinter.printText("Tanggal：" + getCurrentDate() + "\n\r", {});
                await BluetoothEscposPrinter.printText("\n\r", {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                dataCart.map(async (item, index) => {
                    await BluetoothEscposPrinter.printText(item.nama + " x "+item.quantity+" : Rp. "+formatMoney(item.harga)+"\n\r", {});
                })
                await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {});                
                await BluetoothEscposPrinter.printText("Total : Rp. " + formatMoney(total) + "\n\r", {});
                await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {});                
                await BluetoothEscposPrinter.printText("Terimakasih Telah Berbelanja.\n\r", {});
                await BluetoothEscposPrinter.printText("\n\r\n\r\n\r", {});                
            }, (e) => {
                console.log(e)
            })
            
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
                                    <Grid key={`product-${item.id_produk}`}>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{item.nama}</Text>
                                        </Col>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{item.quantity}</Text>
                                        </Col>
                                        <Col style={{ backgroundColor: 'white', paddingVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>{formatMoney(item.harga)}</Text>
                                        </Col>
                                    </Grid>                                    
                                )
                            })                         
                    }
                       
                </View>
            </ScrollView>
            <View style={{ backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => checkOutPage()}
                    style={{ backgroundColor: '#E74145', width: '45%', marginHorizontal: 10, paddingVertical: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Ionicons name="search-circle-outline" size={20} color="#FFF" style={{}} />
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 }}>Check</Text>
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

