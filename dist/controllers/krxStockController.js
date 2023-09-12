"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const axios_1 = __importDefault(require("axios"));
class KrxStockContoller {
    constructor() {
        // this.url =
        //   "http://data-dbg.krx.co.kr/svc/sample/apis/sto/stk_bydd_trd?basDd=20230901";
        this.url =
            "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd?basDd=20230901";
        this.key = "D56A1EF0E8BC439384C7DC8519A3FCA59C675A84";
    }
    async getData(req, res, next) {
        const headers = {
            "AUTH_KEY": this.key
        };
        try {
            const date = new Date();
            //const basDd = date.
            const response = await axios_1.default.get(this.url, { headers });
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
