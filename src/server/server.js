const { Server_port } = require('../../server_conf')
const http2 = require('http2')

// 服务器 启动 方法
class Server {
    constructor (obj) {
        // 用户参数
        this.obj = obj
    }

    // 启动
    start () {
        console.log('pt', Server_port)
    }
}

module.exports = {
    Server: Server
}