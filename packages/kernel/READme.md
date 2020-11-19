# @dofus-remote/kernel
```js
const Kernel = require('@dofus-remote/kernel')

async function run() {
  const kernel = new Kernel({
    appVersion: null,
    buildVersion: null,
    staticDataVersion: null,
    assetsVersion: null
  })

  kernel.clients.add('username', 'password', 'language')
  await kernel.clients.run(Array.from(kernel.clients))

  for (const client of kernel.clients) {
    // await kernel.api.plugin1.method1(client, args)
    // await kernel.api.plugin2.method2(client, args)
  }

  return 'Done'
}

run()
  .then(console.log)
  .catch(console.error)
```