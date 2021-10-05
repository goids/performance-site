const { IncomingMessage, ServerResponse } = require('http')
const fs = require('fs')
const render = require('./render')

const PLACEHOLDER = '<div id="ssr-placeholder"></div>'

/** Server Side Render the Home Page */

async function process(req, res) {
  // const homeFileBuffer = fs.readFileSync('./index.html')
  const homeFileBuffer = fs.readFileSync('./index.template.html')
  const htmlText = homeFileBuffer.toString()
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER)

  res.writeHead(206, { 'Content-Type': 'text/html; charset=utf-8' })
  res.write(precontent)

  const content = await render()
  res.write(content)

  res.write(postcontent)
  res.end()
}

module.exports = process
