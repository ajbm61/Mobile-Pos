import { openDatabase } from 'react-native-sqlite-storage';
import {
    Alert
} from 'react-native';

var db = openDatabase({ name: 'UserDatabase.db' });

export function insertProductSold(namaProduk, qty, price) {
    db.transaction((txn) => {
        txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='product_sold'",
            [],
            (tx, res) => {
                if (res.rows.length == 0) {
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

export function insertProduct(namaProduk, price) {
    db.transaction((txn) => {
        txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='product'",
            [],
            (tx, res) => {
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS product', [])
                    txn.executeSql('CREATE TABLE IF NOT EXISTS product (ID INTEGER PRIMARY KEY NOT NULL, NAME VARCHAR(32), PRICE VARCHAR(12), TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP)', [])
                }
                txn.executeSql('INSERT INTO product (NAME, PRICE) VALUES (?, ?)',
                    [namaProduk, price],
                    (tx, results) => {
                        console.log("Results", results.rowsAffected)
                    })
            })
    })    
}

export function removeProduct(id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM product WHERE ID=?',
            [id],
            (tx, results) => {
                (results.rowsAffected > 0) 
                    ? resolve({ result: true }) 
                    : reject('Oops, something went wrong!')
            })
        })
    })
}

export function updateProduct(item) {
    db.transaction((tx) => {
        tx.executeSql('UPDATE product SET NAME=?, PRICE=? WHERE ID=?',
            [item.NAME, item.PRICE, item.ID],
            (tx, results) => {
                console.log('Results', results.rowsAffected)
                if(results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Product updated successfully'
                    )
                } else {
                    Alert.alert('Info', 'Updation failed :(')
                }
            })
    })
}