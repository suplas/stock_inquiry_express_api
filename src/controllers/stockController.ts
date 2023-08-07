import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { stockModel } from "../models/stockModel";
import db from "../db";

export class StockController {
  private page: Number;
  constructor() {
    this.page = 1;
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    let page = 1;
    let totalPage = 1;
    let url: string = "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";

    const headers = {
      "referer": "http://http://finance.daum.net/qutos/A058410#home",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    };
    try {
      if (!url) {
        return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
      }
      for(let t = 0; t <= (totalPage-1); t++){
        const response = await axios.get(url, { headers });
        const responseData = response.data;        
        totalPage = responseData["totalPages"];
        if(page < totalPage) {
          page = page + 1;
        }else{
          page = page;
        }
        url = "https://finance.daum.net/api/trend/trade_volume?page="+page+"&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
        console.log(url);
        const now: Date = new Date();
        const createData: string = now.getFullYear()+"-"+(now.getMonth() + 1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();

        for (let i = 0; i <= (responseData["data"].length - 1); i++) {
          const data: stockModel = new stockModel(
            Number(responseData["data"][i]["rank"]),
            responseData["data"][i]["date"],
            responseData["data"][i]["name"],
            responseData["data"][i]["symbolCode"],
            responseData["data"][i]["code"],
            Number(responseData["data"][i]["tradePrice"]),
            responseData["data"][i]["change"],
            responseData["data"][i]["changePrice"],
            Number(responseData["data"][i]["changeRate"]),
            Number(responseData["data"][i]["accTradeVolume"]),
            Number(responseData["data"][i]["accTradePrice"]),
            Number(responseData["data"][i]["high52wPrice"]),
            responseData["data"][i]["chartSlideImage"],
            createData
          );
          db.insert(data);
        }
      }
      //res.json(responseData);
      res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }

  async getStockData (req: Request, res: Response, next: NextFunction) {
    const sql: string = "select * from st_item where (select max(createDate) as lastDate from st_item) = createDate limit 30";
    const data = db.select(sql);

    console.log(data);
    res.json(data);
  }
}

export const stockController = new StockController();
export const getData = stockController.getData.bind(StockController);
export const getStockData = stockController.getStockData.bind(StockController);
