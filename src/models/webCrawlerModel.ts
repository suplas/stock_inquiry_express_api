// webCrawlerModel.ts
export interface WebCrawlerData {
  rank: number;
  date: string;
  name: string;
  symbolCode: string;
  code: string;
  tradePrice: number;
  change: string;
  changePrice: number;
  changeRate: number;
  accTradeVolume: number;
  accTradePrice: number;
  high52wPrice: number;
  chartSlideImage: string;
}

// 모델은 데이터를 담는 그릇으로 사용합니다.
export class WebCrawlerModel {
  private data: WebCrawlerData | null;
  
  constructor() {
    this.data = null;
  }

  setData(data: WebCrawlerData) {
    this.data = data;
  }

  getData(): WebCrawlerData | null {
    return this.data;
  }
}
