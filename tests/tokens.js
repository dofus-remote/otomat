const TokenManager = require('@dofus-remote/tokens')

;(async () => {
  const config = await require('./config')()
  const { key } = await TokenManager.createApiKey(config.account)
  const { token } = await TokenManager.createToken({ game: 18 }, key)
  return { key, token }
})()
.then(console.log)
.catch(console.error)