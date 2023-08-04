// webCrawlerController.ts
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import { WebCrawlerData, WebCrawlerModel } from '../models/webCrawlerModel';

export class WebCrawlerController {
  private cheerioInstance: CheerioAPI; 
  private webCrawlerModel: WebCrawlerModel;

  constructor() {
    this.cheerioInstance = cheerio.load('');
    this.webCrawlerModel = new WebCrawlerModel();
  }

  private createCheerioInstance(data: string) {
    this.cheerioInstance = cheerio.load(data);
  }

  async crawlWebsite(req: Request, res: Response, next: NextFunction) {
    const url: string = "https://finance.daum.net/api/trend/trade_volume?page=1&perPage=30&fieldName=accTradeVolume&order=desc&market=KOSPI&pagination=true";
    const headers = {
        'referer': 'http://http://finance.daum.net/qutos/A058410#home',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }
    try {
      if (!url) {
        return res.status(400).json({ error: 'URL이 제공되지 않았습니다.' });
      }

      const response = await axios.get(url, {headers});
      const data = response.data;
      console.log(data);
      if (!this.cheerioInstance) {
        this.createCheerioInstance(data); // cheerio 객체를 사용하여 데이터 로드
      }

      const rank: number = Number(this.cheerioInstance('rank').text());
      const date: string = this.cheerioInstance('date').text();
      const name: string = this.cheerioInstance('name').text();
      const symbolCode: string = this.cheerioInstance('symbolCode').text();
      const code: string = this.cheerioInstance('code').text();
      const tradePrice: number = Number(this.cheerioInstance('tradePrice').text());
      const change: string = this.cheerioInstance('change').text();
      const changePrice: number = Number(this.cheerioInstance('changePrice').text());
      const changeRate: number = Number(this.cheerioInstance('changeRate').text());
      const accTradeVolume: number = Number(this.cheerioInstance('accTradeVolume').text());
      const accTradePrice: number = Number(this.cheerioInstance('accTradePrice').text());
      const high52wPrice: number = Number(this.cheerioInstance('high52wPrice').text());
      const chartSlideImage: string =this.cheerioInstance('chartSlideImage').text();

      const webCrawlerData: WebCrawlerData = { rank, date, name, symbolCode, code, tradePrice, change, changePrice, changeRate, accTradeVolume, accTradePrice, high52wPrice, chartSlideImage };
      this.webCrawlerModel.setData(webCrawlerData); // 모델에 데이터 저장

      res.json(webCrawlerData);
    } catch (error) {
      next(error);
    }
  }

  getWebCrawlerData(req: Request, res: Response) {
    const data = this.webCrawlerModel.getData(); // 모델에서 데이터 가져오기

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: '데이터가 아직 수집되지 않았습니다.' });
    }
  }
}

export const webCrawlerController = new WebCrawlerController();
export const crawlWebsite = webCrawlerController.crawlWebsite.bind(webCrawlerController);
export const getWebCrawlerData = webCrawlerController.getWebCrawlerData.bind(webCrawlerController);
