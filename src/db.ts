import mysql from "mysql";

require("dotenv").config();

class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  public connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database:", err);
      } else {
        console.log("Connected to the database");
      }
    });
  }

  public query(
    sql: string,
    values: any[],
    callback: (err: Error | null, result: any) => void
  ) {
    
    //console.log(this.connection.query(sql, values, callback));
    this.connection.query(sql, values, callback)
  }

  public insert(data: {}, table:string) {
    const sql = "INSERT INTO "+table+" SET ?";

    this.query(sql, [data], (err, result) => {
      if (err) {
        console.log("Error Saving data:", err);
      } else {
        const newData = { id: result.insrtId };
      }
    });
  }

  public insertOrUpdate(data: {}, table:string) {
    const sql = "INSERT INTO "+table+" SET ? ON DUPLICATE KEY UPDATE ?";

    this.query(sql, [data, data], (err, result) => {
      if (err) {
        console.log("Error Saving data:", err);
      } else {
        const newData = { id: result.insrtId };
      }
    });
  }
}


const db = new Database();
export default db;
