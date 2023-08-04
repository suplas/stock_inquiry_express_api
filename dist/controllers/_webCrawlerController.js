"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebCrawlerData = exports.crawlWebsite = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const webCrawlerModel_1 = require("../models/webCrawlerModel");
const webCrawlerModel = new webCrawlerModel_1.WebCrawlerModel();
async function crawlWebsite(req, res, next) {
    const url = "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=30&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
    try {
        if (!url) {
            return res.status(400).json({ error: 'URL이 제공되지 않았습니다.' });
        }
        const response = await axios_1.default.get(url);
        const data = response.data;
        const $ = cheerio_1.default.load(data);
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const webCrawlerData = { title, description };
        webCrawlerModel.setData(webCrawlerData); // 모델에 데이터 저장
        res.json(webCrawlerData);
    }
    catch (error) {
        next(error);
    }
}
exports.crawlWebsite = crawlWebsite;
function getWebCrawlerData(req, res) {
    const data = webCrawlerModel.getData(); // 모델에서 데이터 가져오기
    if (data) {
        res.json(data);
    }
    else {
        res.status(404).json({ error: '데이터가 아직 수집되지 않았습니다.' });
    }
}
exports.getWebCrawlerData = getWebCrawlerData;
