"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const routes2_1 = __importDefault(require("./routes/routes2"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = 3000;
db_1.default.connect();
app.use("/api", routes_1.default);
app.use("/cat", routes2_1.default);
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`);
});
