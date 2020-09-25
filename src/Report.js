import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from '@react-native-community/datetimepicker';
import { readQuery } from './model/DBQuery'

export default function Report() {

    var db = openDatabase({ name: 'UserDatabase.db' });
    
    const [dataReport, setDataReport] = useState([])
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));

    useEffect(() => {

    }, []);    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const fetchReport = () => {
        readQuery("SELECT * FROM product_sold")
            .then(res => setDataReport(res.result))
    }


    return (
        <>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{height: 40}}>
                    <Grid>
                        <Col style={{ backgroundColor: '#337474', paddingTop: 3, paddingLeft: 3 }}>
                            <Button onPress={showDatepicker} title="Date" />
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>To</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingTop: 3, paddingLeft: 3 }}>
                            <Button title="Date" />
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingTop: 3, paddingLeft: 3 }}>
                            <Button onPress={() => fetchReport()} style={{fontWeight: 'bold'}} color="#0ACD87" title="SUBMIT" />
                        </Col>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}                        
                    </Grid>
                </View>
                <View>
                    <View style={{height: 40}}>
                        <Grid>
                            <Col style={{ backgroundColor: '#E4ECF2', paddingVertical: 10, paddingLeft: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Name</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#B5D2E7', paddingVertical: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Qty</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#6398AC', paddingVertical: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Unit Price</Text>
                            </Col>
                        </Grid> 
                    </View>
                    <View style={{height: 340}}>
                        <ScrollView>
                            {
                                (dataReport.length > 0) &&
                                    dataReport.map((item, index) => {
                                        console.log(item.NAME)
                                        return (
                                            <Grid key={`list-${index}`}>
                                                <Col style={{ backgroundColor: '#E7E7E7', paddingVertical: 10, paddingLeft: 10 }}>
                                                    <Text style={{ textAlign: 'left', color: '#000' }}>{item.NAME}</Text>
                                                </Col>
                                                <Col style={{ backgroundColor: '#D6D6D6', paddingVertical: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#000' }}>{item.QTY}</Text>
                                                </Col>
                                                <Col style={{ backgroundColor: '#B5B5B5', paddingVertical: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#000' }}>{item.PRICE}</Text>
                                                </Col>
                                            </Grid>
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>
                    
                </View>
                <View style={{ backgroundColor: '#00B2E3', height: 50 }}>
                    <Grid>
                        <Col size={55} style={{ paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                        </Col>
                        <Col size={45} style={{ backgroundColor: '#2A3F79', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>Rp. 190.000</Text>
                        </Col>
                    </Grid>
                </View>                                                             
            </View> 
        </>
    )

}

