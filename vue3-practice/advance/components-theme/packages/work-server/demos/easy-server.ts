import http from 'node:http'

const server = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const url = req.url
    const html = `
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        <h1>当前页面链接: ${url}</h1>
      </body>
    </html>
    `
    res.end(html)
  }
)

server.listen(6001, () => {
  // eslint-disable-next-line no-console
  console.log('service is on, please visit http://127.0.0.1:6001')

})
