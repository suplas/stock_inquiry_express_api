import { Request, Response, NextFunction } from "express";
import axios from "axios";
import db from "../db";

class KrxStockContoller {
  private url: string;
  private key: string;
  constructor() {
    this.url =
      "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230901";
    this.key = "D56A1EF0E8BC439384C7DC8519A3FCA59C675A84";
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const headers = {
        "AUTH_KEY": this.key
    };

    try {
      const date = new Date();
      //const basDd = date.
      const response = await axios.get(this.url, { headers });
      const responseData = response.data;
      res.json(responseData)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }
}

const krxStockContoller = new KrxStockContoller();
export const getData = krxStockContoller.getData.bind(krxStockContoller);


