// app.ts
import express from 'express';
import webCrawlerRoutes from './routes/webCrawlerRoutes';

const app = express();
const PORT = 3010;

app.use('/api', webCrawlerRoutes);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`);
});