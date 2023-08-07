import mysql from "mysql";

class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "stock",
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
    this.connection.query(sql, values, callback);
  }

  public insert(data: {}) {
    const sql = "INSERT INTO st_item SET ?";

    this.query(sql, [data], (err, result) => {
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
