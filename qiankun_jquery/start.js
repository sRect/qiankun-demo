const path = require("path");
const fs = require("fs");
const http = require("http");
const url = require("url");
const mime = require("mime");

function readStaticFile(res, pathName) {
  const mimeType = mime.getType(pathName);

  if (!mimeType) return;

  fs.readFile(path.resolve(__dirname, `./${pathName}`), (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 NOT FOUND");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.write(data);
      res.end();
    }
  });
}

const server = http.createServer(function (req, res) {
  // http://nodejs.cn/api/url.html
  let pathName = url.parse(req.url).pathname;
  if (pathName === "/" || pathName === "/jquery") pathName = "index.html";

  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.writeHead(200, { "Content-Type": mime.getType(pathName) });

  // 读取静态文件
  readStaticFile(res, pathName);
});

server.listen(5000, () => {
  console.log("Server running at http://127.0.0.1:5000/");
});


// const path = require("path");
// const fs = require("fs");
// const Koa = require("koa");
// const Router = require("koa-router");
// const static = require("koa-static");
// const bodyParser = require("koa-bodyparser");
// const cors = require("koa2-cors");

// // const formidable = require("formidable");
// // const FormData = require("form-data");

// const app = new Koa();
// const router = new Router();

// app.use(bodyParser());
// app.use(static(path.resolve(__dirname, "./")));
// app.use(
//   cors({
//     origin: (ctx) => {
//       return "*";
//     },
//     methods: ["GET", "POST"],
//     allowHeaders: ["Content-Type", "Authorization", "Accept"],
//   })
// ); // 允许跨域

// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200; 
//   } else {
//     await next();
//   }
// });

// const render = () => {
//   // 读取首页
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve(__dirname, "index.html"), "utf8", (err, data) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// router.get("/", async (ctx, next) => {
//   ctx.response.type = "html";
//   ctx.response.body = await render();

//   next();
// });

// app.use(router.routes()).use(router.allowedMethods());

// app.on("error", function (err) {
//   console.log("logging error ", err.message);
//   console.log(err);
// });

// app.listen(5000, () => {
//   console.log(`Server running at http://127.0.0.1:5000/`);
// });
