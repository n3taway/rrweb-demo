import mysql from "mysql";

const TABLE = 'rrweb_user_events';

// 连接
export function connectMysql() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234567",
            database: "test",
            charset: "utf8mb4",
        });
        connection.connect((error) => {
            if (error) {
                reject(error);
            } else {
                console.log("mysql connect success!");
                resolve(connection);
            }
        });
    });
}

// 插入数据
export function insertData(db, data = {}) {
    return new Promise((resolve, reject) => {
        const sqlCommand = `insert into ${TABLE}(user_name,timestamp,events) values ('${data.userName}','${data.timestamp}','${data.events}')`;
        db.query(sqlCommand, (error) => {
            if (error) {
                reject(error);
            } else {
                console.log("insert success!");
                resolve();
            }
        });
    });
}


// SELECT
// 	user_name,
// 	max( timestamp ) AS timestamp 
// FROM
// 	rrweb_user_events 
// GROUP BY
// 	user_name
// 查询所有用户最新的数据
export function queryAllUserLatestEvents(db) {
    return new Promise((resolve, reject) => {
        const sqlCommand = `SELECT user_name,timestamp,events FROM
        (SELECT user_name,timestamp,events, row_Number() OVER (PARTITION BY user_name ORDER BY timestamp DESC) rowNo FROM test.rrweb_user_events ) tmp_table
         WHERE  rowNo=1`;
        db.query(sqlCommand, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}


// select * from rrweb_user_events WHERE user_name = '123' ORDER BY timestamp DESC limit 1;
// 查询指定用户最新的数据
export function queryUserLatestEvents(db, userName) {
    return new Promise((resolve, reject) => {
        const sqlCommand = `select * from rrweb_user_events WHERE user_name = '${userName}' ORDER BY timestamp DESC limit 1`;
        db.query(sqlCommand, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
