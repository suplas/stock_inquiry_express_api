import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { StockModel } from "../models/stockModel";
import db from "../db";
import { stockDetailModel } from "../models/stockDetailModel";

export class StockController {
  constructor() {}

  async getData(req: Request, res: Response, next: NextFunction) {
    let page: number = 1;
    let totalPage: number = 1;
    let url: string =
      "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";

    const headers = {
      referer: "http://http://finance.daum.net/qutos/A058410#home",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    };
    try {
      if (!url) {
        return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
      }
      for (let t = 0; t <= totalPage - 1; t++) {
        const response = await axios.get(url, { headers });
        const responseData = response.data;
        totalPage = responseData["totalPages"];
        if (page < totalPage) {
          page = page + 1;
        } else {
          page = page;
        }
        url =
          "https://finance.daum.net/api/trend/trade_volume?page=" +
          page +
          "&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
        const now: Date = new Date();
        const createData: string =
          now.getFullYear() +
          "-" +
          (now.getMonth() + 1) +
          "-" +
          now.getDate() +
          " " +
          now.getHours() +
          ":" +
          now.getMinutes();

        for (let i = 0; i <= responseData["data"].length - 1; i++) {
          const data: StockModel = new StockModel(
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
          db.insert(data, "st_item");
          // 가져온 종목의 상세정보 크롤링
          let url: string =
            "https://finance.daum.net/api/quotes/"+responseData["data"][i]["symbolCode"]+"?summary=false&changeStatistics=true";
          const response2 = await axios.get(url, { headers });
          const responseData2 = response2.data;
          const detailData: stockDetailModel = new stockDetailModel(
            responseData2["symbolCode"],
            responseData2["code"],
            Number(responseData2["openingPrice"]),
            Number(responseData2["highPrice"]),
            Number(responseData2["lowPrice"]),
            Number(responseData2["tradePrice"]),
            Number(responseData2["prevClosingPrice"]),
            responseData2["change"],
            Number(responseData2["changePrice"]),
            Number(responseData2["changeRate"]),
            responseData2["name"],
            responseData2["market"],
            Number(responseData2["marketCap"]),
            Number(responseData2["marketCapRank"]),
            responseData2["date"],
            responseData2["tradeDate"]
          );

          db.insertOrUpdate(detailData, "st_item_detail");
        }
      }
      //res.json(responseData);
      res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }

  async getStockData(req: Request, res: Response) {
    const page: number = Number(req.params.page);
    const curPage: number = (page - 1) * 30;
    let datas: number = 0;

    try {
      const sql2: string =
        "select count(*) from st_item where (select DATE_ADD(a.lastDate, INTERVAL -6 MINUTE) from (select max(createDate) as lastDate from st_item)a) <= createDate order by rank asc";
      db.query(sql2, [], (err, result) => {
        if (err) {
          console.error("Error fetching data:", err);
          datas = 0;
        } else {
          datas = result[0]["datas"];
        }
      });

      const sql: string =
        "select * from st_item where (select DATE_ADD(a.lastDate, INTERVAL -6 MINUTE) from (select max(createDate) as lastDate from st_item)a) <= createDate order by rank asc limit ?, 30";
      db.query(sql, [curPage], (err, result) => {
        if (err) {
          console.error("Error fetching data:", err);
          res.status(500).json({ error: "Failed to fetch data" });
        } else {
          const data: StockModel[] = result;
          const totalPage: number = Math.round(datas / 30);
          const responseData = {
            data: data,
            totalPage: totalPage,
            totalData: datas,
          };
          res.status(200).json(responseData);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }
}

export const stockController = new StockController();
export const getData = stockController.getData.bind(StockController);
export const getStockData = stockController.getStockData.bind(StockController);
