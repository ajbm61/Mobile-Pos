import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

export const readQuery = (query) => {
    return new Promise((resolve, reject) => {
        var temp = []
        db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i))
                }
                resolve({ result: temp });
            })
        })
    })
}