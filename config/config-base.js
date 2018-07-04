
let config  = {
    cookie : {
        maxAge: 30*60*1000, // cookie有效时长为30分钟
        path: '/', // 写cookie所在的路径
        domain: 'localhost', // 写cookie所在的域名
        httpOnly: true, // 是否只用于http请求中获取
    }
}

module.exports = config;