"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockData = exports.getData = exports.stockController = exports.StockController = void 0;
const axios_1 = __importDefault(require("axios"));
const stockModel_1 = require("../models/stockModel");
const db_1 = __importDefault(require("../db"));
class StockController {
    constructor() {
        this.page = 1;
    }
    async getData(req, res, next) {
        let page = 1;
        let totalPage = 1;
        let url = "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
        const headers = {
            "referer": "http://http://finance.daum.net/qutos/A058410#home",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        };
        try {
            if (!url) {
                return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
            }
            for (let t = 0; t <= (totalPage - 1); t++) {
                const response = await axios_1.default.get(url, { headers });
                const responseData = response.data;
                totalPage = responseData["totalPages"];
                if (page < totalPage) {
                    page = page + 1;
                }
                else {
                    page = page;
                }
                url = "https://finance.daum.net/api/trend/trade_volume?page=" + page + "&perPage=100&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
                console.log(url);
                const now = new Date();
                const createData = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                for (let i = 0; i <= (responseData["data"].length - 1); i++) {
                    const data = new stockModel_1.stockModel(Number(responseData["data"][i]["rank"]), responseData["data"][i]["date"], responseData["data"][i]["name"], responseData["data"][i]["symbolCode"], responseData["data"][i]["code"], Number(responseData["data"][i]["tradePrice"]), responseData["data"][i]["change"], responseData["data"][i]["changePrice"], Number(responseData["data"][i]["changeRate"]), Number(responseData["data"][i]["accTradeVolume"]), Number(responseData["data"][i]["accTradePrice"]), Number(responseData["data"][i]["high52wPrice"]), responseData["data"][i]["chartSlideImage"], createData);
                    db_1.default.insert(data);
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
    async getStockData(req, res, next) {
        const sql = "select * from st_item where (select max(createDate) as lastDate from st_item) = createDate limit 30";
        const data = db_1.default.select(sql);
        console.log(data);
        res.json(data);
    }
}
exports.StockController = StockController;
exports.stockController = new StockController();
exports.getData = exports.stockController.getData.bind(StockController);
exports.getStockData = exports.stockController.getStockData.bind(StockController);
