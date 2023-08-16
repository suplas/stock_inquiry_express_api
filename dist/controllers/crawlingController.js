"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catGetData = exports.crawlingConstller = exports.CrawlingConstller = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
class CrawlingConstller {
    constructor() { }
    async getData(req, res, next) {
        var _a;
        let page = (_a = req.params.page) !== null && _a !== void 0 ? _a : 1;
        let url = "https://shopping.naver.com/window/api/graphql?operationName=getPagedProducts&variables=%7B%22isIncludeProductDetail%22%3Afalse%2C%22params%22%3A%7B%22page%22%3A" +
            encodeURI(String(page)) +
            "%2C%22pageSize%22%3A10%2C%22sort%22%3A%22POPULARITY%22%2C%22subVerticals%22%3A%5B%22BRAND_PET%22%5D%2C%22unionCategories%22%3A%5B%22CAT%22%5D%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22ed013ce01123b8324d197938cf1b6f13a577071f4bcabbe2b8cc32b79747fe51%22%7D%7D";
        const headers = {
            referer: "https://shopping.naver.com/window/brand-pet/category?unionCategory=CAT",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        };
        try {
            if (!url) {
                return res.status(400).json({ error: "URL이 제공되지 않았습니다." });
            }
            const response = await axios_1.default.get(url, { headers });
            const responseData = response.data;
            const resData = responseData["data"]["pagedProducts"]["products"];
            const chid = [];
            if (responseData) {
                for (let i = 0; i <= resData.length - 1; i++) {
                    chid.push(responseData["data"]["pagedProducts"]["products"][i]["product"]["channel"]["id"]);
                }
            }
            const channelId = [...new Set(chid)];
            const channelInfo = [];
            //   if (channelId.length > 0) {
            //     for (let t = 0; t <= channelId.length - 1; t++) {
            //       const channelUrl: string =
            //         "https://shopping.naver.com/petshop/brandpet/stores/" +
            //         channelId[t] +
            //         "/about";
            //         const channelResponse = await axios.get(channelUrl, { headers });
            //         const html = channelResponse.data;
            //         const $ = cheerio.load(html);
            //         text = $('._2G7sW_K7oX').text();
            //         //res.send(pageTitle);
            //     }
            //   }
            const channelUrl = "https://shopping.naver.com/window-products/brandpet/5470708974?NaPm=ct%3Dllcbasgu%7Cci%3Dshoppingwindow%7Ctr%3Dpetcat%7Chk%3D5c9856ec283047deac75c40e6a11eabfab5f0f08%7Ctrx%3D&topDetailVideo=false";
            const channelResponse = await axios_1.default.get(channelUrl, { headers });
            const $ = cheerio.load(channelResponse.data);
            const text = $('div._211Avwm-sU').html();
            res.send(text);
            //res.status(200).json(data);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
}
exports.CrawlingConstller = CrawlingConstller;
exports.crawlingConstller = new CrawlingConstller();
exports.catGetData = exports.crawlingConstller.getData.bind(CrawlingConstller);
