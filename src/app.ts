import express from 'express';
import webCrawlerRoutes from './routes/routes';
import db from './db';

const app = express();
const PORT = 3010;

db.connect();

app.use('/api', webCrawlerRoutes);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`);
});