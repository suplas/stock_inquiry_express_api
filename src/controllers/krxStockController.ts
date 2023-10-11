import { Request, Response, NextFunction } from "express";
import { KrxStockModel } from "../models/krxStockModel";
import axios from "axios";
import db from "../db";

require("dotenv").config();

class KrxStockContoller {
  private apiBaseUrl: string;
  private kospi: string;
  private kosdaq: string;
  constructor() {
    this.apiBaseUrl = "http://data-dbg.krx.co.kr";
    this.kospi = "/svc/apis/sto/stk_bydd_trd";
    this.kosdaq = "/svc/apis/sto/ksq_bydd_trd";
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    const basDd: string = req.params.basDd;
    const kospiUrl: string = this.apiBaseUrl + this.kospi + "?basDd=" + basDd;
    const kosdaqUrl: string = this.apiBaseUrl + this.kosdaq + "?basDd=" + basDd;
    const headers = {
      AUTH_KEY: process.env.KRX_SECRET_KEY,
    };

    try {
      // kospi data pull
      const kospiResponse = await axios.get(kospiUrl, { headers });
      const kospiResponseData = kospiResponse.data;
      const responseData: KrxStockModel[] = [];

      // kosdaq data pull
      const kosdaqResponse = await axios.get(kosdaqUrl, { headers });
      const kosdaqResponseData = kosdaqResponse.data;

      // kospi and kosdaq data sum
      responseData.push(...kospiResponseData["OutBlock_1"]);
      responseData.push(...kosdaqResponseData["OutBlock_1"]);

      if (responseData.length <= 0) {
        res.status(500).json({ error: "no response data" });
      } else {
        // sum data db insert
        for (let i = 0; i <= responseData.length - 1; i++) {
          const data: KrxStockModel = new KrxStockModel(
            responseData[i]["BAS_DD"], // 기준일자
            responseData[i]["ISU_CD"], // 종목코드
            responseData[i]["ISU_NM"], // 종목명
            responseData[i]["MKT_NM"], // 시장구분
            responseData[i]["SECT_TP_NM"], // 소속부
            responseData[i]["TDD_CLSPRC"], // 종가
            responseData[i]["CMPPREVDD_PRC"], // 대비
            responseData[i]["FLUC_RT"], // 등락률
            responseData[i]["TDD_OPNPRC"], // 시가
            responseData[i]["TDD_HGPRC"], // 고가
            responseData[i]["TDD_LWPRC"], //저가
            responseData[i]["ACC_TRDVOL"], // 거래량
            responseData[i]["ACC_TRDVAL"], // 거래대금
            responseData[i]["MKTCAP"], // 시가총액
            responseData[i]["LIST_SHRS"] // 상장주식수
          );
          db.insert(data, "ST_ITEM");
        }
      }

      //res.json(responseData);
      res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }

  async getStocList(req: Request, res: Response) {
    const basDd: number = Number(req.params.basDd);
    const limit:number = Number(req.params.limit);
    const page: number = Number(req.params.page);
    const curPage: number = (page - 1) * limit;
    const mktcap: string = req.params.mktcap ?? 20000000000;
    let datas: number = 0;
    let where: string = "(select max(BAS_DD) from ST_ITEM )";
    let limitNum: number = limit > 30 ? 30 : limit;
    let pageNum: number = curPage < 0 ? 0 : curPage;

    if(typeof(basDd) === "number") {
      if(basDd > 0){
        where = String(basDd);
      }
    }

    if(Number.isNaN(limit)) {
      limitNum = 30;
      pageNum = (page - 1) * limitNum;
    }

    try {
      db.query(
        `select count(*)as num from ST_ITEM where ${where} = BAS_DD and MKTCAP > ? order by ACC_TRDVOL desc`,
        [mktcap],
        (err, result) => {
          if (err) {
            console.error("Error fetching data:", err);
            datas = 0;
          } else {
            datas = result[0]["num"];
          }
        }
      );

      db.query(
        `select id, BAS_DD, MKT_NM, ISU_NM, ACC_TRDVOL, MKTCAP, TDD_OPNPRC from ST_ITEM where ${where} = BAS_DD and MKTCAP > ? order by ACC_TRDVOL desc limit ?, ?`,
        [mktcap, pageNum, limitNum],
        (err, result) => {
          if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Failed to fetch data" });
          } else {
            const data: KrxStockModel[] = result;
            const totalPage: number = Math.round(datas / 30);
            const responseData = {
              data: data,
              totalPage: totalPage <= 0 ? 1 : totalPage,
              totalData: datas,
            };
            res.status(200).json(responseData);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }
}

const krxStockContoller = new KrxStockContoller();
export const getData = krxStockContoller.getData.bind(krxStockContoller);
export const getStocList =
  krxStockContoller.getStocList.bind(krxStockContoller);
