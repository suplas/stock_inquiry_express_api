import { Request, Response, NextFunction } from "express";
import axios from "axios";

type parameter = {
  FID_COND_MRKT_DIV_CODE: string;
  FID_COND_SCR_DIV_CODE: string;
  FID_INPUT_ISCD: string;
  FID_DIV_CLS_CODE: string;
  FID_BLNG_CLS_CODE: string;
  FID_TRGT_CLS_CODE: string;
  FID_TRGT_EXLS_CLS_CODE: string;
  FID_INPUT_PRICE_1: string;
  FID_INPUT_PRICE_2: string;
  FID_VOL_CNT: string;
  FID_INPUT_DATE_1: string;
};

class KisStockContoller {
  private host: string;
  private appKey: string;
  private appSecretKey: string;
  private header: {};
  private parameter: parameter;
  private requestUrl: string;
  constructor() {
    this.host =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/volume-rank";
    this.appKey = "PSyHlOYo6SG0SZ7AgqwM3GhGwjlSoKcCwn63";
    this.appSecretKey =
      "43RPAZhp1A0VnI3NDoDIhDujyRt9L4AWd1aiWt3NVcBxe1PKtGmwduC9k2mitkif9pSq0E4KbMSAVGF4zwOfsbi6hJgn3aYWn07+t97ep8PnTJq3u/JwSb0B5E09gUo/+hCV4FrGC2iAzBLvW0bsDne9UaY8XWPXy+2NSgtb5xa83GFaqwE=";
    this.header = {
      "content-type": "application/json; charset=utf-8",
      appkey: this.appKey,
      appsecret: this.appSecretKey,
      tr_id: "FHPST01710000",
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

    this.requestUrl = this.host + `?FID_COND_MRKT_DIV_CODE=${this.parameter.FID_COND_MRKT_DIV_CODE}&FID_COND_SCR_DIV_CODE=${this.parameter.FID_COND_SCR_DIV_CODE}$FID_INPUT_ISCD=${this.parameter.FID_INPUT_ISCD}$FID_DIV_CLS_CODE=${this.parameter.FID_DIV_CLS_CODE}$FID_BLNG_CLS_CODE=${this.parameter.FID_BLNG_CLS_CODE}$FID_TRGT_CLS_CODE=${this.parameter.FID_TRGT_CLS_CODE}$FID_TRGT_EXLS_CLS_CODE=${this.parameter.FID_TRGT_EXLS_CLS_CODE}$FID_INPUT_PRICE_1=${this.parameter.FID_INPUT_PRICE_1}$FID_INPUT_PRICE_2=${this.parameter.FID_INPUT_PRICE_2}$FID_VOL_CNT=${this.parameter.FID_VOL_CNT}$FID_INPUT_DATE_1=${this.parameter.FID_INPUT_DATE_1}`;
  }

  async getVolumeRank(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(this.requestUrl);
      //const response = await axios.get(this.requestUrl, this.header);
      //const responseData = response.data;
      //console.log(responseData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internet Server Error" });
    }
  }
}

const kisStockContoller = new KisStockContoller();
export const getVolumeRank =
  kisStockContoller.getVolumeRank.bind(kisStockContoller);
