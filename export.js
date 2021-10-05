const fs = require('fs')
const render = require('./ssr/render')

const PLACEHOLDER = '<div id="ssr-placeholder"></div>'

async function exportHtml() {
  const homeFileBuffer = fs.readFileSync('./index.template.html')
  const htmlText = homeFileBuffer.toString()
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER)

  const content = await render()

  const html = `
    <!-- this file was statically generated :) -->
    ${precontent}
    ${content}
    ${postcontent}
    `

  fs.writeFileSync('index.html', html)
  console.log('index.html successfully generated')
}

exportHtml()
