"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVolumeRank = void 0;
require("dotenv").config();
class KisStockContoller {
    constructor() {
        this.host = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/volume-rank";
        this.header = {
            "content-type": "application/json; charset=utf-8",
            appkey: process.env.KIS_APP_KEY,
            appsecret: process.env.KIS_APP_SECRET_KEY,
            tr_id: process.env.KIS_TR_ID,
            custtype: "P",
        };
        this.parameter = {
            FID_COND_MRKT_DIV_CODE: "J",
            FID_COND_SCR_DIV_CODE: "20171",
            FID_INPUT_ISCD: "0000",
            FID_DIV_CLS_CODE: "0",
            FID_BLNG_CLS_CODE: "1",
            FID_TRGT_CLS_CODE: "111111111",
            FID_TRGT_EXLS_CLS_CODE: "000000",
            FID_INPUT_PRICE_1: '""',
            FID_INPUT_PRICE_2: '""',
            FID_VOL_CNT: '""',
            FID_INPUT_DATE_1: '""',
        };
        this.requestUrl =
            this.host +
                `?FID_COND_MRKT_DIV_CODE=${this.parameter.FID_COND_MRKT_DIV_CODE}&FID_COND_SCR_DIV_CODE=${this.parameter.FID_COND_SCR_DIV_CODE}$FID_INPUT_ISCD=${this.parameter.FID_INPUT_ISCD}$FID_DIV_CLS_CODE=${this.parameter.FID_DIV_CLS_CODE}$FID_BLNG_CLS_CODE=${this.parameter.FID_BLNG_CLS_CODE}$FID_TRGT_CLS_CODE=${this.parameter.FID_TRGT_CLS_CODE}$FID_TRGT_EXLS_CLS_CODE=${this.parameter.FID_TRGT_EXLS_CLS_CODE}$FID_INPUT_PRICE_1=${this.parameter.FID_INPUT_PRICE_1}$FID_INPUT_PRICE_2=${this.parameter.FID_INPUT_PRICE_2}$FID_VOL_CNT=${this.parameter.FID_VOL_CNT}$FID_INPUT_DATE_1=${this.parameter.FID_INPUT_DATE_1}`;
    }
    async getVolumeRank(req, res, next) {
        try {
            console.log(this.requestUrl);
            //const response = await axios.get(this.requestUrl, this.header);
            //const responseData = response.data;
            //console.log(responseData);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internet Server Error" });
        }
    }
}
const kisStockContoller = new KisStockContoller();
exports.getVolumeRank = kisStockContoller.getVolumeRank.bind(kisStockContoller);
