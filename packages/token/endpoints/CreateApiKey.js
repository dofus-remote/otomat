/**
 * @param {import('@dofus-remote/browser')} browser
 * @param {Object} ctx
 * @param {String} ctx.login 
 * @param {String} ctx.password 
 * @param {Boolean} ctx.isLongLifeToken 
 */
module.exports = (browser, { login, password, isLongLifeToken = false }) => browser.request({
  url: 'https://haapi.ankama.com/json/Ankama/v5/Api/CreateApiKey',
  method: 'POST',
  postData: `login=${login}&password=${password}&long_life_token=${isLongLifeToken.toString()}`
})
