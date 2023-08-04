"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCrawlerModel = void 0;
// 모델은 데이터를 담는 그릇으로 사용합니다.
class WebCrawlerModel {
    constructor() {
        this.data = null;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}
exports.WebCrawlerModel = WebCrawlerModel;
