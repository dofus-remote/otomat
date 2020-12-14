const Kernel = require('@dofus-remote/kernel')
const Client = require('@dofus-remote/client')
const Browser = require('@dofus-remote/browser')
const Token = require('@dofus-remote/token')
const AuthPlugin = require('@dofus-remote/plugin/Auth')
const GamePlugin = require('@dofus-remote/plugin/Game')

;(async () => {
  const config = await require('./config')()
  const browser = new Browser()
  const kernel = new Kernel(config.kernel)

  kernel.plugins.add(AuthPlugin)
  kernel.plugins.add(GamePlugin)
  
  await browser.open()
  const clientApiKey = await Token.createApiKey(browser, config.account)
  const clientToken = await Token.createToken({ game: 18 }, clientApiKey)
  await browser.close()

  const client = new Client(clientToken, config.account.language)
  kernel.clients.add(client)
  kernel.plugins.flush()

  for (const client of kernel.clients) {
    await kernel.api.auth.begin(client)
    await kernel.api.auth.play(client, config.game.server)
    await kernel.api.game.play(client, config.game.character)
  }
})().catch(console.error)
