"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Database {
    constructor() {
        this.connection = mysql_1.default.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "root",
            database: "stock",
        });
    }
    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Error connecting to database:", err);
            }
            else {
                console.log("Connected to the database");
            }
        });
    }
    query(sql, values, callback) {
        this.connection.query(sql, values, callback);
    }
    insert(data, table) {
        const sql = "INSERT INTO " + table + " SET ?";
        this.query(sql, [data], (err, result) => {
            if (err) {
                console.log("Error Saving data:", err);
            }
            else {
                const newData = { id: result.insrtId };
            }
        });
    }
    insertOrUpdate(data, table) {
        const sql = "INSERT INTO " + table + " SET ? ON DUPLICATE KEY UPDATE ?";
        this.query(sql, [data, data], (err, result) => {
            if (err) {
                console.log("Error Saving data:", err);
            }
            else {
                const newData = { id: result.insrtId };
            }
        });
    }
}
const db = new Database();
exports.default = db;
