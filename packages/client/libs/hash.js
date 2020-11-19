module.exports = class Hash {
  /**
   * Generate a checksum (original codee from DT's sources)
   * @param {string} str String to transform
   */
  static checksum(str) {
    let r = 0
    for (let i = 0; i < str.length; i++) {
      r += str.charCodeAt(i) % 16
    }
    return (r % 16).toString(16).toUpperCase()
  }

  /**
   * Generate one random character
   * @returns {string}
   */
  static getRandomChar() {
    let n = Math.ceil(Math.random() * 100)
    if (n <= 40) return String.fromCharCode(Math.floor(Math.random() * 26) + 65) // Majuscule
    if (n <= 80) return String.fromCharCode(Math.floor(Math.random() * 26) + 97) // Minuscule
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48) // Numero
  }

  // Generate string of <length> characters, Example : "O6FBjgAe3KaKyqL2XSu5B"
  /**
   * Generate a string of `length` characters
   * @param {number} length Length of characters to generate
   * @returns {string}
   */
  static generateString(length = 10) {
    let key = ''
    for (let i = 0; i < length; i++) {
      key += Hash.getRandomChar()
    }
    return key + Hash.checksum(key)
  }
}