"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebCrawlerData = exports.crawlWebsite = exports.webCrawlerController = exports.WebCrawlerController = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const webCrawlerModel_1 = require("../models/webCrawlerModel");
class WebCrawlerController {
    constructor() {
        this.cheerioInstance = cheerio_1.default.load('');
        this.webCrawlerModel = new webCrawlerModel_1.WebCrawlerModel();
    }
    createCheerioInstance(data) {
        this.cheerioInstance = cheerio_1.default.load(data);
    }
    async crawlWebsite(req, res, next) {
        const url = "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=30&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
        const headers = {
            'referer': 'http://http://finance.daum.net/qutos/A058410#home',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
        };
        try {
            if (!url) {
                return res.status(400).json({ error: 'URL이 제공되지 않았습니다.' });
            }
            const response = await axios_1.default.get(url, { headers });
            const data = response.data;
            if (!this.cheerioInstance) {
                this.createCheerioInstance(data); // cheerio 객체를 사용하여 데이터 로드
            }
            const rank = Number(this.cheerioInstance('rank').text());
            const date = this.cheerioInstance('date').text();
            const name = this.cheerioInstance('name').text();
            const symbolCode = this.cheerioInstance('symbolCode').text();
            const code = this.cheerioInstance('code').text();
            const tradePrice = Number(this.cheerioInstance('tradePrice').text());
            const change = this.cheerioInstance('change').text();
            const changePrice = Number(this.cheerioInstance('changePrice').text());
            const changeRate = Number(this.cheerioInstance('changeRate').text());
            const accTradeVolume = Number(this.cheerioInstance('accTradeVolume').text());
            const accTradePrice = Number(this.cheerioInstance('accTradePrice').text());
            const high52wPrice = Number(this.cheerioInstance('high52wPrice').text());
            const chartSlideImage = this.cheerioInstance('chartSlideImage').text();
            const webCrawlerData = { rank, date, name, symbolCode, code, tradePrice, change, changePrice, changeRate, accTradeVolume, accTradePrice, high52wPrice, chartSlideImage };
            this.webCrawlerModel.setData(webCrawlerData); // 모델에 데이터 저장
            res.json(webCrawlerData);
        }
        catch (error) {
            next(error);
        }
    }
    getWebCrawlerData(req, res) {
        const data = this.webCrawlerModel.getData(); // 모델에서 데이터 가져오기
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ error: '데이터가 아직 수집되지 않았습니다.' });
        }
    }
}
exports.WebCrawlerController = WebCrawlerController;
exports.webCrawlerController = new WebCrawlerController();
exports.crawlWebsite = exports.webCrawlerController.crawlWebsite.bind(exports.webCrawlerController);
exports.getWebCrawlerData = exports.webCrawlerController.getWebCrawlerData.bind(exports.webCrawlerController);
