
// Implementation using https://github.com/expressjs/errorhandler/blob/master/index.js as reference
const accepts = require('accepts')
const {html, terminal, text} = require('print-error')

const log = true

// do not remove the `next` argument, error middlewares require it or it fallbacks to standard error handling
// eslint-disable-next-line no-unused-vars
module.exports = function(){

  // @TODO

  return function prettyErrorMiddleware(err, req, res, next) {

    // respect err.statusCode
    if (err.statusCode) {
      res.statusCode = err.statusCode
    }

    // respect err.status
    if (err.status) {
      res.statusCode = err.status
    }

    // default status code to 500
    if (res.statusCode < 400) {
      res.statusCode = 500
    }

    // log the error
    if (log) {
      console.log(terminal(err))
    }

    // cannot actually respond
    if (res._header) {
      return req.socket.destroy()
    }

    // negotiate
    const accept = accepts(req)
    const type = accept.type('html', 'json', 'text', 'css')

    // Security header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // html
    if (type === 'html') {
      const body = `<html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        ${html(err, {fontSize: '16px'})}
      </body>
    </html>`
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(body)
    // json
    } else if (type === 'json') {
      const error = { message: err.message, stack: err.stack }
      for (const prop in err) error[prop] = err[prop]
      const json = JSON.stringify({ error: error }, null, 2)
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(json)
    // plain text
    } else if (type === 'css') {
      let formattedError = text(err)
      if(!formattedError) {
        formattedError = err.toString() + ' in ' + err.filename + ' ' + err.line + ':' + err.column
      }

      const cssesc = require('cssesc')
      const body = `
        body * {
          display: none!important;
        }
        body::before {
          content: '${ cssesc(formattedError) }';
          display: block;
          white-space: pre;
        }
      `
      res.status(200)
      res.setHeader('Content-Type', 'text/css; charset=utf-8')
      res.end(body)
      // plain text
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(text(err))
    }
  }
}
