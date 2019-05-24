const http2           = require('http2')
const fs              = require('fs')

// 配置文件
const { Server_port } = require('../../server_conf')

// 服务器 启动 方法
class Server {
    constructor (obj) {
        // 用户参数
        this.obj = obj
        
        // http2 服务器对象
        this.http2_server = null

        // 私钥
        this.private_key = fs.readFileSync('./key/server.key')
        // 公钥
        this.public_key  = fs.readFileSync('./key/server.crt')
    }

    // 启动
    start () {
        console.log('server start on =>', Server_port)
        this.http2_server = http2.createSecureServer({
            key: this.private_key,
            cert: this.public_key
        })
    }
}

module.exports = {
    Server: Server
}