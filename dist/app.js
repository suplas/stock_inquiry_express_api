"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const baseRoutes_1 = __importDefault(require("./routes/baseRoutes"));
const krxRoutes_1 = __importDefault(require("./routes/krxRoutes"));
const kisRoutes_1 = __importDefault(require("./routes/kisRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
//db.connect()
app.use("/api", baseRoutes_1.default);
app.use("/krx/api", krxRoutes_1.default);
app.use("/kis/api", kisRoutes_1.default);
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`);
});
