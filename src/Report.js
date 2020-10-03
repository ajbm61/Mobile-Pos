import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Col, Row, Grid } from "react-native-easy-grid";
import { formatMoney } from './lib/currency'
import DatePicker from 'react-native-datepicker'
import { readQuery } from './model/DBQuery'

export default function Report() {

    var db = openDatabase({ name: 'UserDatabase.db' });
    
    const [dataReport, setDataReport] = useState([])
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [total, setTotal] = useState(0)
    const [showTotal, setShowTotal] = useState(false)

    useEffect(() => {

    }, []);    

    const fetchReport = () => {
        var query = `SELECT * FROM product_sold WHERE TIMESTAMP BETWEEN '${dateFrom}' AND '${dateTo}'`
        if(dateFrom == dateTo) {
            query = `SELECT * FROM product_sold WHERE TIMESTAMP BETWEEN '${dateFrom}' AND datetime('${dateFrom}','+1 day')`
        }
        readQuery(query)
            .then((res) => {
                var numTotal = 0
                res.result.map((item, index) => {
                    numTotal += parseInt(item.PRICE)
                })
                setTotal(numTotal)
                setDataReport(res.result)                
            })
    }

    return (
        <>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{height: 40}}>
                    <Grid>
                        <Col style={{ backgroundColor: '#337474' }}>
                            <DatePicker
                                style={{ width: 100, backgroundColor: '#00B2E3' }}
                                mode="date"
                                placeholder="Select"
                                format="YYYY-MM-DD"
                                minDate="2020-01-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 0
                                    }
                                }}
                                onDateChange={(date) => { 
                                    setDateFrom(date)
                                 }}
                            />
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>To</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474' }}>
                            <DatePicker
                                style={{ width: 100, backgroundColor: '#00B2E3', color: 'black' }}
                                mode="date"
                                placeholder="Select"
                                format="YYYY-MM-DD"
                                minDate="2020-01-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 0,
                                    }
                                }}
                                onDateChange={(date) => { 
                                    setDateTo(date)
                                 }}
                            />
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingTop: 3, paddingLeft: 3 }}>
                            <Button onPress={() => fetchReport()} style={{fontWeight: 'bold'}} color="#0ACD87" title="SUBMIT" />
                        </Col>                      
                    </Grid>
                </View>                
                <View>
                    <View style={{paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'orange'}}>
                        <Text>Filter Between: { dateFrom } / {dateTo}</Text>
                    </View>         
                    <View style={{ backgroundColor: '#00B2E3', height: 30 }}>
                        <Grid>
                            <Col size={55} style={{ paddingVertical: 2 }}>
                                <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Total</Text>
                            </Col>
                            <Col size={45} style={{ backgroundColor: '#2A3F79', paddingVertical: 2 }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#FFF' }}>Rp. {formatMoney(total)}</Text>
                            </Col>
                        </Grid>
                    </View>                                               
                    <View style={{height: 30}}>
                        <Grid>
                            <Col style={{ backgroundColor: '#E4ECF2', paddingVertical: 5, paddingLeft: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Name</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#B5D2E7', paddingVertical: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Qty</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#6398AC', paddingVertical: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Unit Price</Text>
                            </Col>
                        </Grid> 
                    </View>                    
                    <View style={{height: 340}}>
                        <ScrollView>
                            {
                                (dataReport.length > 0) &&
                                    dataReport.map((item, index) => {
                                        return (
                                            <Grid key={`list-${index}`}>
                                                <Col style={{ backgroundColor: '#E7E7E7', paddingVertical: 10, paddingLeft: 10 }}>
                                                    <Text style={{ textAlign: 'left', color: '#000' }}>{item.NAME}</Text>
                                                </Col>
                                                <Col style={{ backgroundColor: '#D6D6D6', paddingVertical: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#000' }}>{item.QTY}</Text>
                                                </Col>
                                                <Col style={{ backgroundColor: '#B5B5B5', paddingVertical: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#000' }}>{formatMoney(item.PRICE)}</Text>
                                                </Col>
                                            </Grid>
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>
                    
                </View>                                                             
            </View> 
        </>
    )

}

