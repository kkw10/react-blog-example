require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';
import serve from 'koa-static';
import path from 'path'
import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('[### Connected to MongoDB...]');
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 미들웨어 설정
app.use(bodyParser());
app.use(jwtMiddleware);

// 라우터 설정
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../frontEnd/dist');

app.use(serve(buildDirectory));
app.use(async ctx => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory })
  }
})

// 포트 설정
const port = PORT || 4000;
app.listen(port, () => {
  console.log(`[### Server is running on ${port}port...]`);
});
