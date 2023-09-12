import { Request, Response, NextFunction } from "express";
import axios from "axios";
require('dotenv').config();

class KrxStockContoller {
  private api_url: string;
  constructor() {
    this.api_url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230901";
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const headers = {
        "AUTH_KEY": process.env.KRX_SECRET_KEY
    };

    try {
      const date = new Date();
      //const basDd = date.
      const response = await axios.get(this.api_url, { headers });
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


