
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-shortcuts.cjs.production.min.js')
} else {
  module.exports = require('./react-shortcuts.cjs.development.js')
}
