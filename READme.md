![DofusRemote Client](https://raw.githubusercontent.com/dofus-remote/otomat/dev/app.png)

**Otomat** est développé par une seule dans le seul but d'obtenir de nouvelles connaissances dans divers domaines. Les fonctionnalités ne seront pas poussées et toute aide est bienvenue afin de fournir une base de projet stable et propre.

Invitation Discord: https://discord.gg/Ctg86d4

## Packages
- `ignitor` -> CLI permettant l'orchestration de vos différents bots.
- `kernel` -> Noyaux gérant vos bots, plugins.
- `client` -> Instance gérant la connexion d'un bot individuellement.
- `plugin` -> Ajoute les fonctionnalités aux bots.
- `token` -> Génère les tokens de connexion des bots.
- `version` -> Récupère les dernières versions du jeu.

## Exemple
```js
const Kernel = require('@dofus-remote/kernel')
const Client = require('@dofus-remote/client')
const Version = require('@dofus-remote/version')
const AuthPlugin = require('@dofus-remote/plugin/Auth')
const GamePlugin = require('@dofus-remote/plugin/Game')

async function run(login, password, country, language, serverId, characterId) {
  const version = await Version.get(country, language)
  const kernel = new Kernel(version)
  kernel.plugins.add(AuthPlugin)
  kernel.plugins.add(GamePlugin)
  kernel.clients.add(new Client(login, password, country))
  kernel.plugins.flush()
  
  for (const client of kernel.clients) {
    await client.connect()
    await kernel.api.auth.begin(client)
    await kernel.api.auth.play(client, serverId)
    await kernel.api.game.play(client, characterId)
  }
}

run('login', 'password', 'country', 'language', 0, 0)
  .then(console.log)
  .catch(console.error)
```