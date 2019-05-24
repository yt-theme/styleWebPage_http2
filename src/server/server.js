const http2 = require('http2')
const fs    = require('fs')

// 配置文件
const { Server_port, Server_privateKey_src, Server_publicKey_src } = require('../../server_conf')

// 服务器 启动 方法
class Server {
    constructor (obj) {
        // 用户参数
        this.obj = obj
        
        // http2 服务器对象
        this.http2_server = null

        // 私钥
        this.private_key = fs.readFileSync(Server_privateKey_src)
        // 公钥
        this.public_key  = fs.readFileSync(Server_publicKey_src)
    }

    // 启动
    start () {
        console.log('server start on =>', Server_port)
        this.http2_server = http2.createSecureServer({ key: this.private_key, cert: this.public_key })
        this.http2_server.on('error',  (err) => { console.log('server start err =>', err) })
        // this.http2_server.setTimeout(4400)
        // this.http2_server.on('timeout', (err) => { console.log('server on timeout =>', err) })
        this.http2_server.on('stream', (stream, headers, flags) => {
            const method = headers[':method']
            const path   = headers[':path']
            // console.log('header =>', headers)
            console.log('method =>', method)
            console.log('path =>', path)
            console.log('flags =>', flags)
            stream.respond({
                'content-type': 'text-html',
                ':status': 200
            })
            stream.end('<h2>hello world</h2>')
        })
        this.http2_server.listen(Server_port)
    }
}

module.exports = {
    Server: Server
}