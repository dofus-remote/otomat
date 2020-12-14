const Version = require('@dofus-remote/version')
Version.get().then(console.log).catch(console.error)