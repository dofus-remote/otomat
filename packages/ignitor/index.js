const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const readline = require('readline')

clear()
const welcome = figlet.textSync('Otomat')
console.log(chalk.hex('#5a67d8')(welcome))

const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout
})

rl.on('line', line => {
})