import { openDatabase } from 'react-native-sqlite-storage';

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