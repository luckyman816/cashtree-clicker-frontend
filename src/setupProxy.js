import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
  target: 'https://3e8e-88-99-90-19.ngrok-free.app/',
  changeOrigin: true,
});

export default function(app) {
  app.use('/', proxy);
}