const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'pro'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  server.get('/viewer/:id', (req, res) => {
    return app.render(req, res, '/viewer/:id', req.query)
  })

  server.get('/mypage/:tab', (req, res) => {
    return app.render(req, res, '/mypage/:tab', req.query)
  })

  server.get('/myboard/:id', (req, res) => {
    return app.render(req, res, '/myboard/:id', req.query)
  })

  server.get('/editor/:id', (req, res) => {
    return app.render(req, res, '/editor/:id', {id:req.query})
  })

  server.get('/policy/:tab', (req, res) => {
    return app.render(req, res, '/editor/:tab', req.query)
  })

  server.get('/search/:type', (req, res) => {
    return app.render(req, res, '/search/:type', req.query)
  })

  server.get('/follows', (req, res) => {
    return app.render(req, res, '/follows', req.query)
  })

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })
  
  server.get('/report', (req, res) => {
    return app.render(req, res, '/report', req.query)
  })

  server.get('/upload', (req, res) => {
    return app.render(req, res, '/upload', req.query)
  })

  server.get('/welcome', (req, res) => {
    return app.render(req, res, '/welcome', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
