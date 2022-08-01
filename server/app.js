const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware - requests contining a body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// // auth and api routes
// app.use('/auth', require('./auth'))
app.use('/api', require('./api')) // // matches all requests to /api

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html - SPA: server sends index.html for any requests that dont match one of our API routes
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})


// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message)
})