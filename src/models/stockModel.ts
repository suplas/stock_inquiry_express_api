export class StockModel {
  private rank: number;
  private date: string;
  private name: string;
  private symbolCode: string;
  private code: string;
  private tradePrice: number;
  private change: string;
  private changePrice: number;
  private changeRate: number;
  private accTradeVolume: number;
  private accTradePrice: number;
  private high52wPrice: number;
  private chartSlideImage: string;
  private createDate: string;

  constructor(
    rank: number,
    date: string,
    name: string,
    symbolCode: string,
    code: string,
    tradePrice: number,
    change: string,
    changePrice: number,
    changeRate: number,
    accTradeVolume: number,
    accTradePrice: number,
    high52wPrice: number,
    chartSlideImage: string,
    createDate: string
  ) {
    this.rank = rank;
    this.date = date;
    this.name = name;
    this.symbolCode = symbolCode;
    this.code = code;
    this.tradePrice = tradePrice;
    this.change = change;
    this.changePrice = changePrice;
    this.changeRate = changeRate;
    this.accTradeVolume = accTradeVolume;
    this.accTradePrice = accTradePrice;
    this.high52wPrice = high52wPrice;
    this.chartSlideImage = chartSlideImage;
    this.createDate = createDate;
  }
}
