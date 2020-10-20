import { openDatabase } from 'react-native-sqlite-storage';
import {
    Alert
} from 'react-native';

var db = openDatabase({ name: 'UserDatabase.db' });

export function createTableConfig() {
    return new Promise((reslove, reject) => {
        db.transaction((txn) => {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='config_toko'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS config_toko', [])
                        txn.executeSql('CREATE TABLE IF NOT EXISTS config_toko (ID INTEGER PRIMARY KEY NOT NULL, CONTENT TEXT, TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP)', [])
                    }
                    txn.executeSql('INSERT INTO config_toko (ID, CONTENT) VALUES (?, ?)',
                        [1, ''],
                        (tx, results) => {
                            (results.rowsAffected> 0)
                                ? resolve({ result: true })
                                : reject({ result: false })
                        })
                })
        })        
    })
}

export function updateConfig(item) {
    db.transaction((tx) => {
        tx.executeSql('UPDATE config_toko SET CONTENT=? WHERE ID=?',
            [item, 1],
            (tx, results) => {
                console.log('Results', results.rowsAffected)
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Updated successfully'
                    )
                } else {
                    Alert.alert('Info', 'Updation failed :(')
                }
            })
    })
}

export const readConfig = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM config_toko WHERE ID=?", [1], (tx, results) => {
                resolve({ result: results.rows.item(0) });
            })
        })
    })
}

export function createTableConfigBluetooth() {
    return new Promise((reslove, reject) => {
        db.transaction((txn) => {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='config_toko'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS config_toko', [])
                        txn.executeSql('CREATE TABLE IF NOT EXISTS config_toko (ID INTEGER PRIMARY KEY NOT NULL, CONTENT TEXT, TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP)', [])
                    }
                    txn.executeSql('INSERT INTO config_toko (ID, CONTENT) VALUES (?, ?)',
                        [2, ''],
                        (tx, results) => {
                            (results.rowsAffected > 0)
                                ? resolve({ result: true })
                                : reject({ result: false })
                        })
                })
        })
    })
}

export function updateBluetooth(item) {
    db.transaction((tx) => {
        tx.executeSql('UPDATE config_toko SET CONTENT=? WHERE ID=?',
            [item, 2],
            (tx, results) => {
                console.log('Results', results.rowsAffected)
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Bluetooth Updated successfully'
                    )
                } else {
                    Alert.alert('Info', 'Updation failed :(')
                }
            })
    })
}
