"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const webCrawlerRoutes_1 = __importDefault(require("./routes/webCrawlerRoutes"));
const app = (0, express_1.default)();
const PORT = 3010;
app.use('/api', webCrawlerRoutes_1.default);
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`);
});
