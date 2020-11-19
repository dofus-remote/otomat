const { promisify } = require('util')
const { readFile } = require('fs')
const { join } = require('path')
const { load } = require('js-yaml')

module.exports = async () => {
  const config = await promisify(readFile)(join(__dirname, 'config.yaml'))
  return load(config)
}