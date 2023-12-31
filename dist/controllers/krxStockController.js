"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStocList = exports.getData = void 0;
const krxStockModel_1 = require("../models/krxStockModel");
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
require("dotenv").config();
class KrxStockContoller {
    constructor() {
        this.apiBaseUrl = "http://data-dbg.krx.co.kr";
        this.kospi = "/svc/apis/sto/stk_bydd_trd";
        this.kosdaq = "/svc/apis/sto/ksq_bydd_trd";
    }
    async getData(req, res, next) {
        const basDd = req.params.basDd;
        const kospiUrl = this.apiBaseUrl + this.kospi + "?basDd=" + basDd;
        const kosdaqUrl = this.apiBaseUrl + this.kosdaq + "?basDd=" + basDd;
        const headers = {
            AUTH_KEY: process.env.KRX_SECRET_KEY,
        };
        try {
            // kospi data pull
            const kospiResponse = await axios_1.default.get(kospiUrl, { headers });
            const kospiResponseData = kospiResponse.data;
            const responseData = [];
            // kosdaq data pull
            const kosdaqResponse = await axios_1.default.get(kosdaqUrl, { headers });
            const kosdaqResponseData = kosdaqResponse.data;
            // kospi and kosdaq data sum
            responseData.push(...kospiResponseData["OutBlock_1"]);
            responseData.push(...kosdaqResponseData["OutBlock_1"]);
            if (responseData.length <= 0) {
                res.status(500).json({ error: "no response data" });
            }
            else {
                // sum data db insert
                for (let i = 0; i <= responseData.length - 1; i++) {
                    const data = new krxStockModel_1.KrxStockModel(responseData[i]["BAS_DD"], // 기준일자
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
                    db_1.default.insert(data, "ST_ITEM");
                }
            }
            //res.json(responseData);
            res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
    async getStocList(req, res) {
        var _a;
        const basDd = Number(req.params.basDd);
        const limit = Number(req.params.limit);
        const page = Number(req.params.page);
        const curPage = (page - 1) * limit;
        const mktcap = (_a = req.params.mktcap) !== null && _a !== void 0 ? _a : 20000000000;
        let datas = 0;
        let where = "(select max(BAS_DD) from ST_ITEM )";
        let limitNum = limit > 30 ? 30 : limit;
        let pageNum = curPage < 0 ? 0 : curPage;
        if (typeof (basDd) === "number") {
            if (basDd > 0) {
                where = String(basDd);
            }
        }
        if (Number.isNaN(limit)) {
            limitNum = 30;
            pageNum = (page - 1) * limitNum;
        }
        try {
            db_1.default.query(`select count(*)as num from ST_ITEM where ${where} = BAS_DD and MKTCAP > ? order by ACC_TRDVOL desc`, [mktcap], (err, result) => {
                if (err) {
                    console.error("Error fetching data:", err);
                    datas = 0;
                }
                else {
                    datas = result[0]["num"];
                }
            });
            db_1.default.query(`select id, BAS_DD, MKT_NM, ISU_NM, ACC_TRDVOL, MKTCAP, TDD_OPNPRC from ST_ITEM where ${where} = BAS_DD and MKTCAP > ? order by ACC_TRDVOL desc limit ?, ?`, [mktcap, pageNum, limitNum], (err, result) => {
                if (err) {
                    console.error("Error fetching data:", err);
                    res.status(500).json({ error: "Failed to fetch data" });
                }
                else {
                    const data = result;
                    const totalPage = Math.round(datas / 30);
                    const responseData = {
                        data: data,
                        totalPage: totalPage <= 0 ? 1 : totalPage,
                        totalData: datas,
                    };
                    res.status(200).json(responseData);
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
}
const krxStockContoller = new KrxStockContoller();
exports.getData = krxStockContoller.getData.bind(krxStockContoller);
exports.getStocList = krxStockContoller.getStocList.bind(krxStockContoller);
