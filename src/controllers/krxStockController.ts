import { Request, Response, NextFunction } from "express";
import axios from "axios";
require('dotenv').config();

class KrxStockContoller {
  private apiBaseUrl: string;
  constructor() {
    this.apiBaseUrl = 'http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=';
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const basDd = req.params.basDd;
    const url = this.apiBaseUrl + basDd;
    const headers = {
        "AUTH_KEY": process.env.KRX_SECRET_KEY
    };

    try {
      const response = await axios.get(url, { headers });
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


