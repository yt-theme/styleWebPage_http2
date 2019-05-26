class Router {
    constructor (stream, headers, flags) {
        this.stream  = stream
        this.headers = headers
        this.flags   = flags
    }

    // 分发
    dispatch () {
        let method = this.headers[':method']
        let path   = this.headers[':path']
        let flags  = this.flags
        let stream = this.stream
        // console.log('header =>', headers)
        console.log('method =>', method)
        console.log('path =>', path)
        console.log('flags =>', flags)
        stream.respond({
            'content-type': 'text-html',
            ':status': 200
        })
        stream.end('<h2>hello world</h2>')
    }
}

module.exports = {
    Router
}