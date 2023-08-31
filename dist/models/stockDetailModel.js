"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockDetailModel = void 0;
class stockDetailModel {
    constructor(symbolCode, code, openingPrice, highPrice, lowPrice, tradePrice, prevClosingPrice, change, changePrice, changeRate, name, market, marketCap, marketCapRank, date, tradeDate) {
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
exports.stockDetailModel = stockDetailModel;
