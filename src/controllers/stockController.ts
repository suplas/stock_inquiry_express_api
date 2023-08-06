import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { stockModel } from "../models/stockModel";
import db from "../db";

export class WebCrawlerController {
  private totalPage: Number;
  private page: Number;

  constructor() {
    this.totalPage = 1;
    this.page = 1;
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const data: stockModel[] = [];
    const url: string =
      "https://finance.daum.net/api/trend/trade_volume?page=" +
      this.page +
      "&perPage=30&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
    const headers = {
      referer: "http://http://finance.daum.net/qutos/A058410#home",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    };
    try {
      if (!url) {
        return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
      }

      const response = await axios.get(url, { headers });
      const responseData = response.data;
      const now: Date = new Date();
    

      for (let i = 0; i <= responseData["data"].length - 29; i++) {
        const rank: number = Number(responseData["data"][i]["rank"]);
        const date: string = responseData["data"][i]["date"];
        const name: string = responseData["data"][i]["name"];
        const symbolCode: string = responseData["data"][i]["symbolCode"];
        const code: string = responseData["data"][i]["code"];
        const tradePrice: number = Number(responseData["data"][i]["tradePrice"]);
        const change: string = responseData["data"][i]["change"];
        const changePrice: number = responseData["data"][i]["changePrice"];
        const changeRate: number = Number(responseData["data"][i]["changeRate"]);
        const accTradeVolume: number = Number(responseData["data"][i]["accTradeVolume"]);
        const accTradePrice: number = Number(responseData["data"][i]["accTradePrice"]);
        const high52wPrice: number = Number(responseData["data"][i]["high52wPrice"]);
        const chartSlideImage: string = responseData["data"][i]["chartSlideImage"];
        const createData: string = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

        data.push(
          new stockModel(
            rank,
            date,
            name,
            symbolCode,
            code,
            tradePrice,
            change,
            changePrice,
            changeRate,
            accTradeVolume,
            accTradePrice,
            high52wPrice,
            chartSlideImage,
            createData
          )
        );

        const sql = "INSERT INTO st_item SET ?" ;
        db.query(sql, data, (err, result) => {
          if (err) {
            console.log("Error Saving data:", err);
            res.status(500).json({ error: "Falled to save data" });
          } else {
            const newData = { id: result.insrtId };
            res.status(201).json(newData);
          }
        });
      }
      console.log(data);
      //res.json(responseData);
      res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }

  // getWebCrawlerData(req: Request, res: Response) {
  //   const data = this.stockModel.getData();

  //   if (data) {
  //     res.json(data);
  //   } else {
  //     res.status(404).json({ error: '데이터가 아직 수집되지 않았습니다.' });
  //   }
  // }
}

export const webCrawlerController = new WebCrawlerController();
export const getData = webCrawlerController.getData.bind(webCrawlerController);
