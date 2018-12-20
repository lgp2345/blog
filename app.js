const express = require('express');
const proxyMiddleWare = require("http-proxy-middleware");

const app = express();


app.use(express.static('dist'));  

app.use('/bing', proxyMiddleWare({
    target: 'https://cn.bing.com/',
    pathRewrite: {'^/bing' : '/'},
    changeOrigin: true
  }
  ));
// app.use("/Web2Api", proxyMiddleWare({
//     target: "https://www.debi.com/",
//     changeOrigoin: true,
//     secure:false,
// }));
app.get('/',(req,res)=>{
	res.render('index.html');   
})

app.listen(80,()=>{
	console.log('app listening on port 80.')
})
