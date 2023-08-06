"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.webCrawlerController = exports.WebCrawlerController = void 0;
const axios_1 = __importDefault(require("axios"));
const stockModel_1 = require("../models/stockModel");
const db_1 = __importDefault(require("../db"));
class WebCrawlerController {
    constructor() {
        this.totalPage = 1;
        this.page = 1;
    }
    async getData(req, res, next) {
        const data = [];
        const url = "https://finance.daum.net/api/trend/trade_volume?page=" +
            this.page +
            "&perPage=30&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
        const headers = {
            referer: "http://http://finance.daum.net/qutos/A058410#home",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        };
        try {
            if (!url) {
                return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
            }
            const response = await axios_1.default.get(url, { headers });
            const responseData = response.data;
            const now = new Date();
            for (let i = 0; i <= responseData["data"].length - 29; i++) {
                const rank = Number(responseData["data"][i]["rank"]);
                const date = responseData["data"][i]["date"];
                const name = responseData["data"][i]["name"];
                const symbolCode = responseData["data"][i]["symbolCode"];
                const code = responseData["data"][i]["code"];
                const tradePrice = Number(responseData["data"][i]["tradePrice"]);
                const change = responseData["data"][i]["change"];
                const changePrice = responseData["data"][i]["changePrice"];
                const changeRate = Number(responseData["data"][i]["changeRate"]);
                const accTradeVolume = Number(responseData["data"][i]["accTradeVolume"]);
                const accTradePrice = Number(responseData["data"][i]["accTradePrice"]);
                const high52wPrice = Number(responseData["data"][i]["high52wPrice"]);
                const chartSlideImage = responseData["data"][i]["chartSlideImage"];
                const createData = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                data.push(new stockModel_1.stockModel(rank, date, name, symbolCode, code, tradePrice, change, changePrice, changeRate, accTradeVolume, accTradePrice, high52wPrice, chartSlideImage, createData));
                const sql = "INSERT INTO st_item SET ?";
                db_1.default.query(sql, data, (err, result) => {
                    if (err) {
                        console.log("Error Saving data:", err);
                        res.status(500).json({ error: "Falled to save data" });
                    }
                    else {
                        const newData = { id: result.insrtId };
                        res.status(201).json(newData);
                    }
                });
            }
            console.log(data);
            //res.json(responseData);
            res.status(200).json({ message: "정상적으로 데이터가 저장 되었습니다." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
}
exports.WebCrawlerController = WebCrawlerController;
exports.webCrawlerController = new WebCrawlerController();
exports.getData = exports.webCrawlerController.getData.bind(exports.webCrawlerController);
