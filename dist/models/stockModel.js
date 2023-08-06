"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockModel = void 0;
class stockModel {
    constructor(rank, date, name, symbolCode, code, tradePrice, change, changePrice, changeRate, accTradeVolume, accTradePrice, high52wPrice, chartSlideImage, createDate) {
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
exports.stockModel = stockModel;
