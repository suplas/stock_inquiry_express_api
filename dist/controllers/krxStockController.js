"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
class KrxStockContoller {
    constructor() {
        this.api_url = "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230901";
    }
    async getData(req, res, next) {
        const headers = {
            "AUTH_KEY": process.env.KRX_SECRET_KEY
        };
        try {
            const date = new Date();
            //const basDd = date.
            const response = await axios_1.default.get(this.api_url, { headers });
            const responseData = response.data;
            res.json(responseData);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
}
const krxStockContoller = new KrxStockContoller();
exports.getData = krxStockContoller.getData.bind(krxStockContoller);
