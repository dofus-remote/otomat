const Kernel = require('@dofus-remote/kernel')
const Client = require('@dofus-remote/client')
const AuthPlugin = require('@dofus-remote/plugin/Auth')
const GamePlugin = require('@dofus-remote/plugin/Game')

;(async () => {
  const config = await require('./config')()
  const kernel = new Kernel(config.kernel)

  kernel.plugins.add(AuthPlugin)
  kernel.plugins.add(GamePlugin)
  kernel.clients.add(new Client(
    config.account.login,
    config.account.password,
    config.account.language
  ))
  kernel.plugins.flush()

  for (const client of kernel.clients) {
    await client.connect()
    await kernel.api.auth.begin(client)
    await kernel.api.auth.play(client, config.game.server)
    await kernel.api.game.play(client, config.game.character)
  }
})().catch(console.error)
