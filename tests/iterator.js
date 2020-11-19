class ClientLoader {
  constructor() {
    this.clients = [
      'one',
      'two',
      'three'
    ]
  }

  [Symbol.iterator]() {
    return this.clients.values()
  }
}

const loader = new ClientLoader()
for (const client of loader) {
  console.log(client)
}