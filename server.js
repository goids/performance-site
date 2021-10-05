const url = require('url')
const handler = require('serve-handler')
const ssrHome = require('./ssr')

module.exports = async (req, res) => {
  const { pathname } = url.parse(req.url)

  if (pathname !== '/') {
    return await handler(req, res)
  }

  return await ssrHome(req, res)
}
