export class stockDetailModel {
  private symbolCode: string;
  private code: string;
  private openingPrice: number;
  private highPrice: number;
  private lowPrice: number;
  private tradePrice: number;
  private prevClosingPrice: number;
  private change: string;
  private changePrice: number;
  private changeRate: number;
  private name: string;
  private market: string;
  private marketCap: number;
  private marketCapRank: number;
  private date: string;
  private tradeDate: string;

  constructor(
    symbolCode: string,
    code: string,
    openingPrice: number,
    highPrice: number,
    lowPrice: number,
    tradePrice: number,
    prevClosingPrice: number,
    change: string,
    changePrice: number,
    changeRate: number,
    name: string,
    market: string,
    marketCap: number,
    marketCapRank: number,
    date: string,
    tradeDate: string
  ) {
    this.symbolCode = symbolCode;
    this.code = code;
    this.openingPrice = openingPrice;
    this.highPrice = highPrice;
    this.lowPrice = lowPrice;
    this.tradePrice = tradePrice;
    this.prevClosingPrice = prevClosingPrice;
    this.change = change;
    this.changePrice = changePrice;
    this.changeRate = changeRate;
    this.name = name;
    this.market = market;
    this.marketCap = marketCap;
    this.marketCapRank = marketCapRank;
    this.date = date;
    this.tradeDate = tradeDate;
  }
}
