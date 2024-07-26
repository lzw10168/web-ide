

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();

// 静态文件服务
app.use(express.static(path.resolve(__dirname, './static')));

// 日志中间件
app.use(morgan('dev'));

// 解析JSON和urlencoded数据的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置跨域
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || origin.includes('/server')) {
      callback(null, '*'); // 允许来自所有域名请求
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  exposedHeaders: ['WWW-Authenticate', 'Server-Authorization', 'x-test-code'],
  maxAge: 5,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'x-requested-with',
    'Content-Encoding'
  ]
}));

let htmlStr = "";

app.post('/server/render', (req, res) => {
  htmlStr = req.body;
  res.send('success');
});

app.get('/html*', (req, res) => {
  res.type('html');
  res.send(htmlStr);
});

const PORT = process.env.SERVER_PORT || 3000;
console.log('process.env: ', process.env.SERVER_PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
